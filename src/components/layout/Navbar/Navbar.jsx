import { NavLink } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar() {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">
                        TERRA AUSTRALIS
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/">
                        ACCUEIL
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/region/chiloe">
                        Chiloé
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/region/patagonie">
                        Patagonie
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/region/puertowilliams">
                        Puerto Williams
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/region/torresdelpaine">
                        Torres del Paine
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}