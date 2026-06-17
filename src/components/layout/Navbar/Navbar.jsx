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
                            Chiloe
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/region">
                            Patagonie
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/region">
                            Puerto Williams
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/region">
                            Torres del Paine
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div >
    );
};