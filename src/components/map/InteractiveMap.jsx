import React from 'react';
import './InteractiveMap.scss';
import { RegionLabel } from '@components/RegionLabel/RegionLabel';
import chileMap from '@assets/images/chile-map/chile-map.svg';
import roseDesVents from '@assets/images/rose-des-vents/rose-des-vents.png';

export function InteractiveMap({ onRegionHover }) {
    const regions = [
        {
            id: 'chiloe',
            name: 'Chiloé',
            x: 69,
            y: 65,
            lineLength: 135,
            description: "Chiloé, dans les îles éparses du Pacifique, ancré au sud-ouest du Chili, est un monde à part. Ici, les fjords serpentent entre des collines verdoyantes. L’archipel, bercé par l’isolement et le mystère, préserve une culture unique, où les églises en bois coloré, les maisons sur pilotis et les récits du *Caleuche* tissent une toile envoûtante entre réalité et rêve."
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
                        src={roseDesVents}
                        alt="Rose des vents"
                        className="rose-des-vents"
                    />

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
                                onHover={() => onRegionHover(region)}
                                onLeave={() => onRegionHover(null)}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}