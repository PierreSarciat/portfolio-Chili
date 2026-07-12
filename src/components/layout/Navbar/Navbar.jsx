import { NavLink, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import "./Navbar.scss";

import CompassRose from "@assets/icons/rose-des-vents.png";

export default function Navbar() {
    const navRef = useRef(null);
    const borderRef = useRef(null);

    const location = useLocation();

    const moveBorder = (element) => {
        if (!element || !borderRef.current || !navRef.current) return;

        const navRect = navRef.current.getBoundingClientRect();
        const linkRect = element.getBoundingClientRect();

        borderRef.current.style.left = `${linkRect.left - navRect.left}px`;
        borderRef.current.style.width = `${linkRect.width}px`;
    };

    useEffect(() => {
        const activeLink = navRef.current?.querySelector("a.active");

        if (activeLink) {
            moveBorder(activeLink);
        }
    }, [location.pathname]);

    return (
        <header className="navbar-container">

            <div className="incipit">

                <div className="logo-container">
                    <img
                        src={CompassRose}
                        alt="Rose des vents"
                        className="logo"
                    />
                </div>

                <div className="logo-texte">
                    <h1>CHILI</h1>
                    <p>Terres de contrastes</p>
                </div>

            </div>

            <nav
                className="navbar"
                ref={navRef}
            >

                <ul className="navbar-links">

                    <li>
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            ACCUEIL
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/galerie"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            GALERIE
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/region/chiloe"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            CHILOÉ
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/region/patagonie"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            PATAGONIE
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/region/puertowilliams"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            PUERTO WILLIAMS
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/region/torresdelpaine"
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            TORRES DEL PAINE
                        </NavLink>
                    </li>

                </ul>

                <div
                    ref={borderRef}
                    className="navbar-border"
                />

            </nav>

        </header>
    );
}