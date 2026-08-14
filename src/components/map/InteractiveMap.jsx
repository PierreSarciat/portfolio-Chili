import React from 'react';
import './InteractiveMap.scss';
import { RegionLabel } from '@components/RegionLabel/RegionLabel';
import chileMap from '@assets/images/chile-map/chile-map.svg';

export function InteractiveMap() {
    const regions = [
        {
            id: 'chiloe',
            name: 'Chiloé',
            x: 69,
            y: 65,
            lineLength: 135,
        },
        {
            id: 'patagonie',
            name: 'Patagonie',
            x: 72,
            y: 75,
            lineLength: 120,
        },
        {
            id: 'puertowilliams',
            name: 'Puerto Williams',
            x: 77,
            y: 96,
            lineLength: 60,
        },
        {
            id: 'torresdelpaine',
            name: 'Torres del Paine',
            x: 77,
            y: 86,
            lineLength: 117,
        },
    ];

    return (
        <div className="interactive-map-container">
            <div className="interactive-map-outer-border">
                <div className="interactive-map-inner-border">

                    <img
                        src={chileMap}
                        alt="Carte du Chili"
                        className="chile-map-image"
                    />

                    <div className="regions-overlay">
                        {regions.map((region) => (
                            <RegionLabel
                                key={region.id}
                                id={region.id}
                                name={region.name}
                                x={region.x}
                                y={region.y}
                                lineLength={region.lineLength}
                                lineColor="#B89A73"
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}