import { SyntheticEvent, useState } from "react";
import axios from "axios";

import { UserErrors } from "../errors";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (event: SyntheticEvent) => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:3001/user/register", {
                username,
                password,
            });
            alert("Registration compleated! Now you can login.");
        } catch (error) {
            if (error?.response?.data?.type === UserErrors.USERNAME_EXISTS) {
                alert("ERROR: Username already exists.");
            } else {
                alert("ERROR: Something went wrong.");
            }
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={submitHandler}>
                <h2>Register</h2>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};
