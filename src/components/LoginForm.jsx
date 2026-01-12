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
        <div className="login-form-container">
            <div className="login-header">
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">Sign in to your account</p>
            </div>
            <form className="login-form">
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Username</label>
                    <input 
                        className="form-input"
                        type="text" 
                        id="username" 
                        placeholder="Enter username"
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input 
                        className="form-input"
                        type="password" 
                        id="password" 
                        placeholder="Enter password"
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>
                <button className="login-button" type="submit" onClick={handleSubmit} disabled={loading}>
                    {loading ? (
                        <>
                            <span className="loading-spinner"></span>
                            Logging in...
                        </>
                    ) : (
                        "Login"
                    )}
                </button>
            </form>
            <div className="login-footer">
                <p>Don't have an account?</p>
                <button className="signup-button" type="button" onClick={() => navigate("/signup")} disabled={loading}>
                    Sign Up
                </button>
            </div>
        </div>
    );
}

export default LoginForm; 