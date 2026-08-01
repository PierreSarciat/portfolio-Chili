import React from 'react';
import { NavLink } from 'react-router-dom';
import './InteractiveMap.scss';
import chileMap from '@assets/images/chile-map/chile-map.svg';

export function InteractiveMap() {
    /* const backgroundImageUrl = 'https://images.unsplash.com/photo-1713862032419-95a24b005dbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZSUyMHZpbnRhZ2UlMjBtYXB8ZW58MXx8fHwxNzgwNDMxMTUzfDA&ixlib=rb-4.1.0&q=80&w=1080';*/

    const regions = [
        { id: 'chiloe', name: 'Chiloé', x: '80%', y: '58%' },
        { id: 'patagonie', name: 'Patagonie', x: '85%', y: '90%' },
        { id: 'puertowilliams', name: 'Puerto Williams', x: '80%', y: '96%' },
        { id: 'torresdelpaine', name: 'Torres del Paine', x: '77%', y: '85%' },
    ];

    return (
        <div className="interactive-map-outer-border">
            <div className="interactive-map-inner-border">
                <div className="interactive-map-container">
                    {/* Image de fond avec filtres pastels */}
                    <img
                        src={chileMap}
                        alt="Carte du Chili"
                        className="chile-map-image"
                    />
                    {/* Régions cliquables */}
                    <div className="regions-overlay">
                        {regions.map((region) => (
                            <NavLink
                                key={region.id}
                                to={`/region/${region.id}`}
                                className="region-label-container"
                                style={{
                                    position: 'absolute',
                                    left: region.x,
                                    top: region.y,
                                    transform: 'translate(-50%, -50%)',
                                }}
                            >
                                <span className="region-label">{region.name}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}