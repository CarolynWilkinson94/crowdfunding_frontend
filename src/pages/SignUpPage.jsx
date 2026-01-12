import { useState } from "react";
import postUser from "../api/post-user";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.css";

function SignUpPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState ({
        username: "",
        // firstName: "",
        // lastName: "",
        email: "",
        password: "",
        // confirmPassword: "",

    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function onChange(e) {
        setForm(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    function validate() {
        if (!form.username.trim()) return "Please enter a username.";
        if (!form.email.match(/^\S+@\S+\.\S+$/)) return "Please enter a valid email.";
        if (form.password.length < 8) return "Password must be at least 8 characters.";
        // if (form.password !== form.confirmPassword) return "Passwords do not match.";
        return null;
    }

    async function onSubmit(e) {
        e.preventDefault();
        setError(null);
        const clientError = validate();
        if (clientError) {
            setError(clientError);
            return;
        }
        setLoading(true);
        try{
            const data = await postUser(
                form.username,
                form.password,
                form.email,
            );
            navigate("/");
        } catch (err) {
            setError(err.info?.message ?? err.message ?? "Signup failed");

        } finally {
            setLoading(false);
        }
    }

    return(
        <div className="signup-page-container">
            <div className="signup-header">
                <h1 className="signup-title">Create an Account</h1>
                <p className="signup-subtitle">Join our community today</p>
            </div>

            <form className="signup-form" id="signup-form" onSubmit={onSubmit}>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Username <span className="required">*</span></label>
                    <input className="form-input" id="username" name="username" type="text" required value={form.username} onChange={onChange}/>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email <span className="required">*</span></label>
                    <input className="form-input" id="email" name="email" type="email" required value={form.email} onChange={onChange}/>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password <span className="required">*</span></label>
                    <input className="form-input" id="password" name="password" type="password" required minLength="8" value={form.password} onChange={onChange}/>
                </div>

                {error && (
                    <div className="error-message" id="signup-error" role="alert" aria-live="polite">
                        {String(error)}
                    </div>
                )}

                <button className="signup-button" type="submit" disabled={loading}>
                    {loading ? "Creating account..." : "Create account"}
                </button>
            </form>

            <div className="signup-footer">
                <p>Already have an account? <a href="/login">Sign in</a></p>
            </div>
        </div>
    )
   
}

export default SignUpPage;