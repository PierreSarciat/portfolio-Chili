import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import CompassRose from "@assets/icons/rose-des-vents.png";
import BorderWithDot from "@components/BorderWithDot/BorderWithDot";

// Composant ActiveLink corrigé
const ActiveLink = ({ to, children }) => (
    <NavLink to={to} className={({ isActive }) => (isActive ? "active" : "")}>
        {({ isActive }) => (
            isActive ? (
                <BorderWithDot>
                    {children}
                </BorderWithDot>
            ) : (
                children
            )
        )}
    </NavLink>
);

export default function Navbar() {
    return (
        <header className="navbar-container">
            <div className="incipit">
                <div className="logo-container">
                    <img src={CompassRose} alt="Rose des Vents" className="logo" />
                </div>
                <div className="logo-texte">
                    <h1>CHILI</h1>
                    <p>Terres de contrastes</p>
                </div>
            </div>

            <nav className="navbar">
                <ul className="navbar-links">
                    <li><ActiveLink to="/">ACCUEIL</ActiveLink></li>
                    <li><ActiveLink to="/galerie">GALERIE</ActiveLink></li>
                    <li><ActiveLink to="/region/chiloe">CHILOE</ActiveLink></li>
                    <li><ActiveLink to="/region/patagonie">PATAGONIE</ActiveLink></li>
                    <li><ActiveLink to="/region/puertowilliams">PUERTO WILLIAMS</ActiveLink></li>
                    <li><ActiveLink to="/region/torresdelpaine">TORRES DEL PAINE</ActiveLink></li>
                </ul>
            </nav>
        </header>
    );
}