import { Link, Outlet} from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import { useState } from "react";
import "./NavBar.css";

function NavBar() {
    const {auth, setAuth} = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div>
            <nav style={{background: '#33658a', height: '140px'}}>
                <div className="nav-content">
                    <div className="nav-logo">
                        <Link to="/" className="logo-link">
                            <img 
                                src="/img/tfc_logo.svg"
                                alt="Tunes for Change" 
                                className="logo-image"
                                style={{background: 'transparent'}}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "/img/placeholder.png";
                                }}
                            />
                        </Link>
                    </div>
                    
                    <button 
                        className="hamburger-button" 
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    
                    <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`} style={{right: '20px'}}>
                        <button 
                            className="close-button" 
                            onClick={closeMenu}
                            aria-label="Close menu"
                        >
                            ×
                        </button>
                        <Link to="/" onClick={closeMenu}>Home</Link>
                        <Link to="/about" onClick={closeMenu}>About</Link>
                        <Link to="create" onClick={closeMenu}>Create Fundraiser</Link>
                        {auth.token ? (
                            <Link to="/" onClick={handleLogout}>
                                Logout
                            </Link>
                        ) : (
                            <Link to="/login" onClick={closeMenu}>Log In</Link>
                        )}
                    </div>
                    {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
                </div>
            </nav>
            
        </div>
    );
}

export default NavBar;