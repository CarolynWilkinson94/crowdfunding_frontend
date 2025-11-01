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
                <div className="left-menu">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                </div>
                <div className="nav-logo">
                    <img src="https://i.imgur.com/KGwzgQj.png" alt="Tunes for Change logo"/>
                </div>
                <div className="right-menu">
                    <Link to="create">Create Fundraiser</Link>
                    {auth.token ? (
                        <Link to="/" onClick={handleLogout}>
                            Logout
                        </Link>
                        
                    ) : (
                    <Link to="/login">Log In</Link>
                    
                    )}
                </div>
                
            </nav>
            
        </div>
    );
}

export default NavBar;