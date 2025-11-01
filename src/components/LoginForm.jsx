import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js";
import "./LoginForm.css";

function LoginForm() {
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) {
            setError("");
            setLoading(true);
            try {
                const response = await postLogin(
                    credentials.username,
                    credentials.password
                );

                setAuth({
                    token: response.token,
                    userId:response.userId
                });

                navigate('/');
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
          
        }
    };
    

   return (
        <form>
            {error && <div style={{ color: "red" }}>{error}</div>}
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Enter username"
                    onChange={handleChange}
                    disabled={loading}
                />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Password"
                    onChange={handleChange}
                    disabled={loading}
                />
            </div>
            <button type="submit" onClick={handleSubmit} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            <p>Don't have an account? Sign up here.</p>
            <button type="button" onClick={() => navigate("/signup")} disabled={loading}>
                Sign Up
            </button>
        </form>
    );
}

export default LoginForm; 