import React from 'react';
import { NavLink } from 'react-router-dom';

export function InteractiveMap() {
    // URL de l'image de fond
    const backgroundImageUrl = 'https://images.unsplash.com/photo-1713862032419-95a24b005dbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZSUyMHZpbnRhZ2UlMjBtYXB8ZW58MXx8fHwxNzgwNDMxMTUzfDA&ixlib=rb-4.1.0&q=80&w=1080';

    // Coordonnées ajustées pour placer les noms des régions sur l'image
    const regions = [
        { id: 'chiloe', name: 'Chiloé', x: '25%', y: '15%' },
        { id: 'patagonie', name: 'Patagonie', x: '50%', y: '45%' },
        { id: 'puertowilliams', name: 'Puerto Williams', x: '70%', y: '80%' },
        { id: 'torresdelpaine', name: 'Torres del Paine', x: '50%', y: '75%' },
    ];

    return (
        <div
            style={{
                position: 'relative',
                width: '100%',
                height: '600px',
                backgroundImage: `url(${backgroundImageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                overflow: 'hidden',
            }}
        >
            {/* Noms des régions cliquables */}
            {regions.map((region) => (
                <NavLink
                    key={region.id}
                    to={`/region/${region.id}`}
                    style={{
                        position: 'absolute',
                        left: region.x,
                        top: region.y,
                        transform: 'translate(-50%, -50%)',
                        cursor: 'pointer',
                        textDecoration: 'none',
                    }}
                >
                    <span
                        style={{
                            color: 'black',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '14px',
                            fontWeight: 'bold',
                        }}
                    >
                        {region.name}
                    </span>
                </NavLink>
            ))}
        </div>
    );
}