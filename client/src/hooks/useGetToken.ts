import { useCookies } from "react-cookie";

export const useGetToken = () => {
    const [cookie, _] = useCookies(["access_token"]);
    return { headers: { authorization: cookie.access_token } };
};
