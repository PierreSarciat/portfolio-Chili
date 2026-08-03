// src/components/RegionLabel/RegionLabel.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './RegionLabel.scss';

export function RegionLabel({
    id,
    name,
    x,
    y,
    lineDirection = 'left',    // Direction de la ligne : 'up', 'down', 'left', 'right'
    lineLength = 15,         // Longueur de la ligne en pixels
    lineColor = '#B89A73',   // Couleur de la ligne (par défaut : brun sépia)
}) {
    // Convertir les pourcentages en valeurs numériques si nécessaire
    const xPos = typeof x === 'string' ? parseFloat(x) : x;
    const yPos = typeof y === 'string' ? parseFloat(y) : y;

    return (
        <div
            className="region-label-container"
            style={{
                position: 'absolute',
                left: `${xPos}%`,
                top: `${yPos}%`,
                transform: 'translate(-50%, -50%)',
            }}
        >
            {/* Ligne de connexion */}
            <div
                className={`region-line region-line--${lineDirection}`}
                style={{
                    '--line-length': `${lineLength}px`,
                    '--line-color': lineColor,
                }}
            />

            {/* Label cliquable */}
            <NavLink to={`/region/${id}`} className="region-label-link">
                <span className="region-label">{name}</span>
            </NavLink>
        </div>
    );
}