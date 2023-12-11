import { Login } from "../../components/login";
import { Register } from "../../components/register";
import "./styles.css";

export const AuthView = () => {
    return (
        <div className="auth">
            <Register />
            <Login />
        </div>
    );
};
