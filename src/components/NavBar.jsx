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
                    <img src="https://private-user-images.githubusercontent.com/212821091/507707546-35c6da91-22fe-4dae-bd68-ee552164b1be.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjE4MzY4NzQsIm5iZiI6MTc2MTgzNjU3NCwicGF0aCI6Ii8yMTI4MjEwOTEvNTA3NzA3NTQ2LTM1YzZkYTkxLTIyZmUtNGRhZS1iZDY4LWVlNTUyMTY0YjFiZS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUxMDMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTAzMFQxNTAyNTRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00MTE1ZTkzZDYwYTk4NWQ2YWUyYjY4MTBhNmFkYzYxZjMzMzg3ZTM0ZjQwNzI5Y2VmOGUyYTM4YmU2ZmM4ZGRlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.qw_GWmd4jur2JNkCrYyDGaBBzMKLs7THQVTmV8NATWE" alt="Tunes for Change logo"/>
                </div>
            </nav>
            
        </div>
    );
}

export default NavBar;