import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./Gallery3D.scss";

/* =========================================================
   COMPOSANT PHOTO 3D
   Affiche une photo en 3D sur un cercle complet (360°).
   Les photos sont orientées vers le centre du cercle.
========================================================= */
function Photo3D({ photo, index, totalPhotos, onPhotoClick }) {
    const meshRef = useRef();
    const texture = useLoader(THREE.TextureLoader, photo.previewSrc || photo.thumbnailSrc);

    /* =====================================================
       CONFIGURATION DU CERCLE
    ===================================================== */
    const radius = 8; // Rayon du cercle
    const totalAngle = Math.PI * 2; // 360° en radians

    // Angle pour cette photo (répartition uniforme sur 360°)
    const photoAngle = (index / totalPhotos) * totalAngle;

    // Position sur le cercle
    const targetX = Math.sin(photoAngle) * radius;
    const targetY = 0; // Toutes les photos sont à la même hauteur
    const targetZ = Math.cos(photoAngle) * radius;

    // Rotation pour que la photo fasse face au centre
    const targetRotationY = photoAngle + Math.PI / 2;

    /* =====================================================
       TAILLE ET OPACITÉ
       Toutes les photos ont la même taille et opacité
       (car elles sont toutes à la même distance du centre).
    ===================================================== */
    const targetScale = 1.0;
    const targetOpacity = 1.0;

    /* =====================================================
       ANIMATION
    ===================================================== */
    useFrame(() => {
        if (!meshRef.current) return;
        const mesh = meshRef.current;

        // Animation de la position
        mesh.position.x += (targetX - mesh.position.x) * 0.16;
        mesh.position.y += (targetY - mesh.position.y) * 0.16;
        mesh.position.z += (targetZ - mesh.position.z) * 0.16;

        // Animation de la rotation (toujours orientée vers le centre)
        mesh.rotation.y += (targetRotationY - mesh.rotation.y) * 0.16;
        mesh.rotation.x = 0;
        mesh.rotation.z = 0;

        // Animation de l'échelle
        const currentScale = mesh.scale.x;
        const newScale = currentScale + (targetScale - currentScale) * 0.16;
        mesh.scale.set(newScale, newScale, newScale);

        // Animation de l'opacité
        if (mesh.material) {
            mesh.material.opacity += (targetOpacity - mesh.material.opacity) * 0.16;
        }
    });

    /* =====================================================
       RENDU
    ===================================================== */
    return (
        <mesh
            ref={meshRef}
            position={[targetX, targetY, targetZ]}
            rotation={[0, targetRotationY, 0]}
            onClick={(event) => {
                event.stopPropagation();
                onPhotoClick(index);
            }}
        >
            <planeGeometry args={[2.5, 3.5]} />
            <meshBasicMaterial
                map={texture}
                transparent
                opacity={targetOpacity}
                side={THREE.DoubleSide}
                toneMapped={false}
            />
        </mesh>
    );
}

/* =========================================================
   COMPOSANT SCÈNE 3D
   Gère le rendu de toutes les photos dans la scène 3D.
========================================================= */
function GalleryScene({ photos, onPhotoClick }) {
    return (
        <>
            {photos.map((photo, index) => (
                <Photo3D
                    key={photo.id}
                    photo={photo}
                    index={index}
                    totalPhotos={photos.length}
                    onPhotoClick={onPhotoClick}
                />
            ))}
        </>
    );
}

/* =========================================================
   COMPOSANT GALERIE 3D
   Gère la scène 3D avec OrbitControls pour la rotation.
========================================================= */
function Gallery3D({ photos, onPhotoClick }) {
    const [reducedMotion, setReducedMotion] = useState(false);

    /* =====================================================
       ACCESSIBILITÉ
    ===================================================== */
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updatePreference = () => setReducedMotion(mediaQuery.matches);
        updatePreference();
        mediaQuery.addEventListener("change", updatePreference);
        return () => mediaQuery.removeEventListener("change", updatePreference);
    }, []);

    /* =====================================================
       VÉRIFICATION DES DONNÉES
    ===================================================== */
    if (!photos || photos.length === 0) {
        return null;
    }

    /* =====================================================
       INDEX ACTUEL (pour le compteur)
       On utilise l'index de la photo la plus proche du centre (devant la caméra).
    ===================================================== */
    const [currentIndex, setCurrentIndex] = useState(0);

    // Met à jour l'index actuel en fonction de la rotation (optionnel)
    // Note: Avec OrbitControls, on ne gère pas la position manuellement.
    // Si vous voulez afficher l'index de la photo la plus proche, utilisez un useFrame dans GalleryScene.

    /* =====================================================
       RENDU
    ===================================================== */
    return (
        <div className="gallery3d">
            <Canvas
                camera={{
                    position: [0, 0, 15], // Caméra éloignée pour voir tout le cercle
                    fov: 60,
                    near: 0.1,
                    far: 1000,
                }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />

                {/* OrbitControls permet de faire tourner le cercle avec la souris */}
                <OrbitControls
                    enableZoom={true} // Permet de zoomer/dézoomer
                    enablePan={false} // Désactive le déplacement latéral
                    enableRotate={true} // Permet de faire tourner
                    minPolarAngle={Math.PI / 2 - 0.1} // Limite la rotation verticale
                    maxPolarAngle={Math.PI / 2 + 0.1} // Pour garder le cercle horizontal
                    autoRotate={false} // Désactive la rotation automatique (optionnel)
                    autoRotateSpeed={0.5} // Vitesse de rotation automatique si activée
                />

                <GalleryScene
                    photos={photos}
                    onPhotoClick={onPhotoClick}
                />
            </Canvas>

            {/* Bouton Précédent (optionnel) */}
            <button
                type="button"
                className="gallery3d-button gallery3d-prev"
                onClick={() => setCurrentIndex((currentIndex - 1 + photos.length) % photos.length)}
                aria-label="Photo précédente"
            >
                &#10094;
            </button>

            {/* Bouton Suivant (optionnel) */}
            <button
                type="button"
                className="gallery3d-button gallery3d-next"
                onClick={() => setCurrentIndex((currentIndex + 1) % photos.length)}
                aria-label="Photo suivante"
            >
                &#10095;
            </button>

            {/* Compteur */}
            <div className="gallery3d-counter" aria-live="polite">
                {currentIndex + 1} / {photos.length}
            </div>
        </div>
    );
}

export default Gallery3D;