import React from 'react';
import { NavLink } from 'react-router-dom';
import './InteractiveMap.scss';
import { RegionLabel } from '@components/RegionLabel/RegionLabel';
import chileMap from '@assets/images/chile-map/chile-map.svg';

export function InteractiveMap() {
    /* const backgroundImageUrl = 'https://images.unsplash.com/photo-1713862032419-95a24b005dbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZSUyMHZpbnRhZ2UlMjBtYXB8ZW58MXx8fHwxNzgwNDMxMTUzfDA&ixlib=rb-4.1.0&q=80&w=1080';*/

    const regions = [
        { id: 'chiloe', name: 'Chiloé', x: '80%', y: '58%', lineDirection: 'left' },
        { id: 'patagonie', name: 'Patagonie', x: '85%', y: '90%', lineDirection: 'left' },
        { id: 'puertowilliams', name: 'Puerto Williams', x: '80%', y: '96%', lineDirection: 'left' },
        { id: 'torresdelpaine', name: 'Torres del Paine', x: '77%', y: '85%', lineDirection: 'left' },
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



                    {/* Régions cliquables avec traits */}
                    <div className="regions-overlay">
                        {regions.map((region) => (
                            <RegionLabel
                                key={region.id}
                                id={region.id}
                                name={region.name}
                                x={region.x}
                                y={region.y}
                                lineDirection={region.lineDirection}
                                lineLength={15}
                                lineColor="#B89A73"
                            />
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}