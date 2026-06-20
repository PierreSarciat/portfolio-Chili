import React from 'react';
import { useParams } from "react-router-dom";
import { regions } from "../../data/regions"; // Import du tableau de toutes les régions



function Region() {

    // 1. Récupère le paramètre `regionId` de l'URL (ex: "/region/chiloe" → regionId = "chiloe")
    const { regionId } = useParams();

    // 2. Trouve la région correspondante dans le tableau `regions`
    const region = regions.find((r) => r.id === regionId);

    // 4. Destructuration des données de la région pour un code plus lisible
    const {
        name,
        subtitle,
        description,
        photos = [],
        meta = {},
    } = region;

    return (
        <div>
            <h1>{name}</h1>
            <h2>{subtitle}</h2>
            <p>{description}</p>
        </div>
    );
}

export default Region;