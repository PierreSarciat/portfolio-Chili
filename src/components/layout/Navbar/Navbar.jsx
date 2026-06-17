import { NavLink } from "react-router-dom";
import "./Navbar.scss"

export default function Navbar() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <NavLink >
                            TERRA AUSTRALIS
                        </NavLink>
                    </li>
                    <li>
                        <NavLink>
                            ACCUEIL
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/region">
                            PATAGONIE
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/region">
                            ATACAMA
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/region">
                            ARAUCANIE
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div >
    );
};