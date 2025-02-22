import { Axios } from "@/lib/axios";
import { LocalUser } from "@/types";

export default async function getUser() {
    // demo only -- not tested
    try {
        const req = await Axios.get(`/api/v1/user`);

        if (req.status !== 200) {
            throw new Error("Failed to enter challenge");
        }

        return req.data as LocalUser | null;
    } catch (e: any) {
        throw new Error(e.message);
    }
}