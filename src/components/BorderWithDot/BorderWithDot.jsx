import React from "react";
import "./BorderWithDot.scss";

const BorderWithDot = ({
    color = "#3A312C",       // Couleur de la bordure (sépia par défaut)
    dotColor = "#B89A73",   // Couleur du point (sépia clair par défaut)
    dotSize = "8px",        // Taille du point
    borderWidth = "1px",    // Épaisseur de la bordure
    className = "",         // Classe CSS supplémentaire
    children,              // Contenu à afficher au-dessus de la bordure
}) => {
    return (
        <div className={`border-with-dot ${className}`}>
            {children}
            <div
                className="border-with-dot__border"
                style={{
                    "--border-color": color,
                    "--border-width": borderWidth,
                }}
            />
            <div
                className="border-with-dot__dot"
                style={{
                    "--dot-color": dotColor,
                    "--dot-size": dotSize,
                }}
            />
        </div>
    );
};

export default BorderWithDot;