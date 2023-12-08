import { Login } from "../../components/login";
import { Register } from "../../components/register";

export const AuthView = () => {
    return (
        <div className="auth">
            <Register />
            <Login />
        </div>
    );
};
