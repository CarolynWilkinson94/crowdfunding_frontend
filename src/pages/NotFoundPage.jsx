import { Link } from "react-router-dom";
import "./ErrorPage.css";

function NotFoundPage() {
    return (
        <div className="error-container">
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page your're looking for can't be found.</p>
            <div className="error-actions">
                <Link to="/" className="home-link">Return to Home</Link>
            </div>
        </div>
    );
}

export default NotFoundPage;