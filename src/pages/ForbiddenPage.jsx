import { Link } from "react-router-dom";
import "./ErrorPage.css";

function ForbiddenPage() {
    return (
        <div className="error-container">
            <h1>403 - Access Denied</h1>
            <p>Sorry, you don't have permission to access this page.</p>
            <div className="error-actions">
                <Link to="/" className="home-link">Return to Home</Link>
            </div>
        </div>
    );
}

export default ForbiddenPage;