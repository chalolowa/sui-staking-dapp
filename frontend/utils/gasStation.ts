import axios from "axios";

const SHINAMI_KEY = process.env.NEXT_PUBLIC_SHINAMI_KEY;

export const ShinamiGasStation = {

    async getGasPrice(): Promise<number> {

        const response = await axios.get(`https://api.shinami.com/node/v1${SHINAMI_KEY}`);

        return response.data.gasPrice;

    },

    requestGas: async (address: string) => {
        try {
            const response = await axios.post(
                "https://api.shinami.com/node/v1",
                { address },
                {
                    headers: {
                        Authorization: `Bearer ${SHINAMI_KEY}`
                    }
                }
            )
            return response.data;
        } catch (error) {
            console.error("Error requesting gas:", error);
        }
    }

}