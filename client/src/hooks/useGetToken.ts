import { useCookies } from "react-cookie";

export const useGetToken = () => {
    const [cookie, _] = useCookies(["access_token"]);
    return { headers: { authrization: cookie.access_token } };
};
