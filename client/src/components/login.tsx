import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

import { UserErrors } from "../models/errors";

export const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [_, setCookies] = useCookies(["access_token"]);

    const navigate = useNavigate();

    const submitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        try {
            const result = await axios.post(
                "http://localhost:3001/user/login",
                {
                    username,
                    password,
                }
            );
            setCookies("access_token", result.data.token);
            localStorage.setItem("userID", result.data.userID);

            navigate("/");
        } catch (error) {
            let errorMessage: string = "";

            switch (error?.response?.data?.type) {
                case UserErrors.NO_USER_FOUND:
                    errorMessage = "User does not exist.";
                    break;
                case UserErrors.WRONG_CREDENTIALS:
                    errorMessage = "Wrong username or password.";
                    break;
                case UserErrors.USERNAME_EXISTS:
                    errorMessage = "User already exist.";
                    break;
                default:
                    errorMessage = "Something went wrong.";
            }
            alert(`ERROR: ${errorMessage}`);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={submitHandler}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="submit-btn" type="submit">
                    Login
                </button>
            </form>
        </div>
    );
};
