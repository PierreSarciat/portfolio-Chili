import React from 'react';
import { NavLink } from 'react-router-dom';
import './InteractiveMap.scss';

export function InteractiveMap() {
    const backgroundImageUrl = 'https://images.unsplash.com/photo-1713862032419-95a24b005dbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZSUyMHZpbnRhZ2UlMjBtYXB8ZW58MXx8fHwxNzgwNDMxMTUzfDA&ixlib=rb-4.1.0&q=80&w=1080';

    const regions = [
        { id: 'chiloe', name: 'Chiloé', x: '25%', y: '15%' },
        { id: 'patagonie', name: 'Patagonie', x: '50%', y: '45%' },
        { id: 'puertowilliams', name: 'Puerto Williams', x: '70%', y: '80%' },
        { id: 'torresdelpaine', name: 'Torres del Paine', x: '50%', y: '75%' },
    ];

    return (
        <div className="interactive-map-outer-border">
            <div className="interactive-map-inner-border">
                <div
                    className="interactive-map-container"
                    style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                >
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
    );
}