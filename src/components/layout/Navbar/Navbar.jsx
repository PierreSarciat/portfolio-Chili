import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import CompassRose from "@assets/icons/rose-des-vents.png";

export default function Navbar() {
    return (
        <header className="navbar-container">
            {/* Section Incipit : Logo + Titre */}
            <div className="incipit">
                <div className="logo-container">
                    <img src={CompassRose} alt="Rose des Vents" className="logo" />
                </div>
                <div className="logo-texte">
                    <h1>CHILI</h1>
                    <p>Terres de contrastes</p>
                </div>
            </div>

            {/* Barre de navigation */}
            <nav className="navbar">
                <ul className="navbar-links">
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            ACCUEIL
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to=""
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            GALERIE
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/region/chiloe"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            CHILOE
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/region/patagonie"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            PATAGONIE
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/region/puertowilliams"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            PUERTO WILLIAMS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/region/torresdelpaine"
                            className={({ isActive }) => (isActive ? "active" : "")}
                        >
                            TORRES DEL PAINE
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}