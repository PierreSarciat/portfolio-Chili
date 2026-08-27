import React from 'react';
import { NavLink } from 'react-router-dom';
import './RegionLabel.scss';

export function RegionLabel({
    id,
    name,
    x,
    y,
    lineDirection = 'left',
    lineLength = 15,
    lineColor = '#B89A73',
    onHover,
    onLeave,
}) {
    return (
        <div
            className="region-label-container"
            style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: 'translate(-50%, -50%)',

            }}
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <div
                className={`region-line region-line--${lineDirection}`}
                style={{
                    '--line-length': `${lineLength}px`,
                    '--line-color': lineColor,
                }}
            />

            <NavLink
                to={`/region/${id}`}
                className="region-label-link"
            >
                <span className="region-label">
                    {name}
                </span>
            </NavLink>
        </div>
    );
}