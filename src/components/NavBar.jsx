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
                
                <Link to="/about">About</Link>
                <Link to="create">Create Fundraiser</Link>
                {auth.token ? (
                    <Link to="/" onClick={handleLogout}>
                        Logout
                    </Link>
                    
                ) : (
                <Link to="/login">Log In</Link>
                
                )}
                <div className="nav-logo">
                    <img src="public/img/tfc_logo.png" alt="Tunes for Change logo"/>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default NavBar;