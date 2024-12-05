import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
import { SUI_CLIENT } from "./suiClient";
import { genAddressSeed, generateNonce, generateRandomness, getExtendedEphemeralPublicKey, getZkLoginSignature, jwtToAddress } from "@mysten/sui/zklogin";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { Transaction } from "@mysten/sui/transactions";

interface customJwtPayload extends JwtPayload {
    email?: string
}

export class AuthService {
    static async loginWithProvider(provider: "google" | "microsoft") {
        const clientId = provider === "google" ? process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID : process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID;
        const providerUrl = provider === "google" ? process.env.NEXT_PUBLIC_GOOGLE_PROVIDER_URL : process.env.NEXT_PUBLIC_MICROSOFT_PROVIDER_URL;

        const { epoch } = await SUI_CLIENT.getLatestSuiSystemState();
        const maxEpoch = Number(epoch) + 2;

        const ephemeralKeypair = new Ed25519Keypair();
        const randomness = generateRandomness();
        const NONCE = generateNonce(ephemeralKeypair.getPublicKey(), maxEpoch, randomness);

        const jwtData = {
            maxEpoch: maxEpoch,
            randomness: randomness,
            ephemeralKeypair,
            nonce: NONCE,
        };

        sessionStorage.setItem("jwt_data", JSON.stringify(jwtData));

        const params = new URLSearchParams({
            client_id: clientId!,
            nonce: NONCE,
            response_type: "id_token",
            redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URL!,
            scope: "openid email",
        });

        try {
            const { data } = await axios.get(providerUrl!);
            const authUrl = `${data.authorization_endpoint}?${params.toString()}`;
            window.location.href = authUrl;
        } catch (error) {
            console.error(`Error initiating ${provider} login`, error);
        }
    }

    static async handleCallback(encodedJwt: string) {
        const decodedJwt = jwtDecode<customJwtPayload>(encodedJwt);

        if (!decodedJwt.email) {
            throw new Error("Email not found in JwtPayload!");
        };
        const userSalt = this.hashcode(decodedJwt.email);

        const { randomness, maxEpoch, ephemeralKeypair } = JSON.parse(sessionStorage.getItem("jwt_data")!);

        const zkloginUserAddress = jwtToAddress(encodedJwt, userSalt);

        const extendedEphemeralPublicKey = getExtendedEphemeralPublicKey(ephemeralKeypair.getPublicKey());

        const zkpRequestPayload = {
            jwt: encodedJwt,
            extendedEphemeralPublicKey,
            maxEpoch,
            salt: userSalt,
            jwtRandomness: randomness,
            keyCLaimName: "sub",
        };

        try {
            const proofResponse = await axios.post(process.env.NEXT_PUBLIC_PROVER_URL!, zkpRequestPayload, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            const partialZkloginSignature = proofResponse.data;

            const addressSeed = genAddressSeed(BigInt(userSalt), "sub", decodedJwt.sub!, decodedJwt.aud?.toString()!).toString();

            const txb = new Transaction();
            txb.setSender(zkloginUserAddress);

            const { bytes, signature: userSignature } = await txb.sign({
                client: SUI_CLIENT,
                signer: ephemeralKeypair
            });

            const zkloginSignature = getZkLoginSignature({
                inputs: {
                    ...partialZkloginSignature,
                    addressSeed
                },
                maxEpoch,
                userSignature
            });

            const result = await SUI_CLIENT.executeTransactionBlock({
                transactionBlock: bytes,
                signature: zkloginSignature
            });

            console.log("Transaction result:", result);
        } catch (error) {
            console.error("Error during zkp verification:", error);
        }
    }

    private static hashcode(s: string) {
        let h = 0, l = s.length, i = 0;
        if (l > 0) {
            while (i < l) {
                h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
            }
        }
        return h.toString();
    }
}