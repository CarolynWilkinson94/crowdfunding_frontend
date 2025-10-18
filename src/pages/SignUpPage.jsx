import { useState } from "react";
import postUser from "../api/post-user";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState ({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",

    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function onChange(e) {
        setForm(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    function validate() {
        if (!form.username.trim()) return "Please enter a username.";
        if (!form.email.match(/^\S+@\S+\.S+$/)) return "Please enter a valid email.";
        if (form.password.length < 8) return "Password must be at least 8 characters.";
        if (form.password !== form.confirmPassword) return "Passwords do not match.";
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
            const data = await postUser({
                username: form.username,
                email: form.email,
                password: form.password
            });
            navigate("/");
        } catch (err) {
            setError(err.info?.message ?? err.message ?? "Signup failed");

        } finally {
            setLoading(false);
        }
    }

    return(
        <div>
            <h1>Create an Account</h1>

            <form id="signup-form" onSubmit={onSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input id="username" name="username" type="text" required value={form.username} onChange={onChange}/>
                </div>

                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" name="firstName" type="text" required value={form.firstName} onChange={onChange}/>
                </div>

                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" name="lastName" type="text" required value={form.lastName} onChange={onChange} />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={onChange}/>
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" required minLength="8" value={form.password} onChange={onChange}/>
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" required minLength="8" value={form.confirmPassword} onChange={onChange}/>

                </div>

                {error && (
                    <div id="signup-error" role="alert" aria-live="polite" style={{ color: "crimson" }}>
                        {String(error)}
                    </div>
                )}

                <div>
                    <button type="submit">Create account</button>
                </div>
            </form>
        </div>
    )
   
}

export default SignUpPage;