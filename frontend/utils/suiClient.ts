import { SuiClient } from "@mysten/sui/client";

const NODE_URL = process.env.NEXT_PUBLIC_SUI_NETWORK;
const PACKAGE_ID = process.env.NEXT_PUBLIC_PACKAGE_ID;

export const SUI_CLIENT = new SuiClient({ url: NODE_URL! });