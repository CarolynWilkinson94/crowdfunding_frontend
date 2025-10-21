import { Link, Outlet} from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import "./NavBar.css";

function NavBar() {
    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
    };

    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="create">Create Fundraiser</Link>
                {auth.token ? (
                    <Link to="/" onClick={handleLogout}>
                        Logout
                    </Link>
                ) : (
                <Link to="/login">Log In</Link>
                
                )}
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;