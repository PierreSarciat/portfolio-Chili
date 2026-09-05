import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    Canvas,
    useFrame,
    useLoader,
} from "@react-three/fiber";

import * as THREE from "three";

import "./Gallery3D.scss";


/* =========================================================
   PHOTO 3D
========================================================= */

function Photo3D({
    photo,
    index,
    offset,
    onPhotoClick,
    isDragging,
}) {
    const meshRef = useRef();

    const texture = useLoader(
        THREE.TextureLoader,
        photo.previewSrc || photo.thumbnailSrc
    );


    /* =====================================================
       DISTANCE PAR RAPPORT AU CENTRE
    ===================================================== */

    const distance = Math.abs(offset);


    /* =====================================================
       COURBE 3D
       
       Les photos sont disposées sur un arc circulaire
       autour du spectateur.
    ===================================================== */

    const radius = 7;

    /*
     * Angle de la photo sur l'arc.
     *
     * 0      = centre
     * +      = droite
     * -      = gauche
     */
    const arcAngle = offset * 0.24;


    /*
     * Position horizontale
     */
    const targetX =
        Math.sin(arcAngle) * radius;


    /*
     * Position en profondeur
     *
     * Le centre est le plus proche.
     * Les côtés reculent progressivement.
     */
    const targetZ =
        Math.cos(arcAngle) * radius - radius;


    /*
     * =====================================================
       ROTATION
    ===================================================== */

    /*
     * Chaque photo suit la courbure de l'arc.
     */
    const targetRotationY =
        -arcAngle;


    /* =====================================================
       TAILLE
       
       Centre :
       petite

       Côtés :
       progressivement plus grandes
    ===================================================== */

    const targetScale =
        Math.min(
            1.15,
            0.78 + distance * 0.18
        );


    /* =====================================================
       OPACITÉ
    ===================================================== */

    const targetOpacity =
        Math.max(
            0.35,
            1 - distance * 0.22
        );


    /* =====================================================
       ANIMATION FLUIDE
    ===================================================== */

    useFrame(() => {
        if (!meshRef.current) {
            return;
        }


        /*
         * Position X
         */
        meshRef.current.position.x +=
            (
                targetX -
                meshRef.current.position.x
            ) * 0.18;


        /*
         * Position Z
         */
        meshRef.current.position.z +=
            (
                targetZ -
                meshRef.current.position.z
            ) * 0.18;


        /*
         * Rotation Y
         */
        meshRef.current.rotation.y +=
            (
                targetRotationY -
                meshRef.current.rotation.y
            ) * 0.18;


        /*
         * Échelle
         */
        const currentScale =
            meshRef.current.scale.x;

        const newScale =
            currentScale +
            (
                targetScale -
                currentScale
            ) * 0.18;

        meshRef.current.scale.set(
            newScale,
            newScale,
            newScale
        );


        /*
         * Opacité
         */
        if (meshRef.current.material) {
            meshRef.current.material.opacity +=
                (
                    targetOpacity -
                    meshRef.current.material.opacity
                ) * 0.18;
        }
    });


    /* =====================================================
       MASQUER LES PHOTOS TROP ÉLOIGNÉES
    ===================================================== */

    if (distance > 3) {
        return null;
    }


    /* =====================================================
       RENDU
    ===================================================== */

    return (
        <mesh
            ref={meshRef}

            position={[
                targetX,
                0,
                targetZ,
            ]}

            rotation={[
                0,
                targetRotationY,
                0,
            ]}

            onClick={(event) => {
                event.stopPropagation();

                /*
                 * Seule la photo centrale peut
                 * ouvrir la modale.
                 */
                if (
                    Math.abs(offset) < 0.15 &&
                    !isDragging.current
                ) {
                    onPhotoClick(index);
                }
            }}
        >
            <planeGeometry
                args={[
                    2.2,
                    3,
                ]}
            />

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
   SCÈNE
========================================================= */

function GalleryScene({
    photos,
    position,
    onPhotoClick,
    isDragging,
}) {
    const length = photos.length;


    return (
        <>
            {photos.map((photo, index) => {

                /*
                 * =================================================
                 * POSITION RELATIVE
                 *
                 * Exemple :
                 *
                 * position = 4
                 *
                 * photo 4 →  0
                 * photo 5 → +1
                 * photo 6 → +2
                 * photo 3 → -1
                 * photo 2 → -2
                 * =================================================
                 */

                let offset =
                    index - position;


                /*
                 * =================================================
                 * BOUCLE INFINIE
                 * =================================================
                 *
                 * On recherche toujours le chemin le plus court
                 * entre la photo et la position centrale.
                 */

                if (
                    offset >
                    length / 2
                ) {
                    offset -= length;
                }


                if (
                    offset <
                    -length / 2
                ) {
                    offset += length;
                }


                return (
                    <Photo3D
                        key={photo.id}

                        photo={photo}

                        /*
                         * Index réel.
                         *
                         * Important :
                         * on ne lui transmet plus une position
                         * potentiellement décimale.
                         */
                        index={index}

                        /*
                         * Offset utilisé uniquement
                         * pour le positionnement 3D.
                         */
                        offset={offset}

                        onPhotoClick={
                            onPhotoClick
                        }

                        isDragging={
                            isDragging
                        }
                    />
                );
            })}
        </>
    );
}


/* =========================================================
   GALERIE 3D
========================================================= */

function Gallery3D({
    photos,
    onPhotoClick,
}) {
    const [position, setPosition] =
        useState(0);


    /*
     * =====================================================
     * POSITION RÉELLE
     *
     * Cette valeur peut être décimale et dépasser
     * le nombre de photos.
     *
     * Exemple :
     *
     * 0
     * 0.25
     * 0.8
     * 1.4
     * 2
     * 2.7
     *
     * Cela permet un déplacement réellement continu.
     * =====================================================
     */

    const positionRef =
        useRef(0);


    /*
     * =====================================================
     * VITESSE
     * =====================================================
     */

    const velocityRef =
        useRef(0);


    /*
     * =====================================================
     * DRAG
     * =====================================================
     */

    const isDragging =
        useRef(false);


    /*
     * =====================================================
     * POSITION X DU POINTER
     * =====================================================
     */

    const lastPointerX =
        useRef(0);


    /*
     * =====================================================
     * TEMPS
     * =====================================================
     */

    const lastTime =
        useRef(0);


    /*
     * =====================================================
     * DISTANCE DE DRAG
     * =====================================================
     */

    const dragDistance =
        useRef(0);


    /*
     * =====================================================
     * REQUEST ANIMATION FRAME
     * =====================================================
     */

    const animationFrame =
        useRef(null);


    /*
     * =====================================================
     * ACCESSIBILITÉ
     * =====================================================
     */

    const [reducedMotion, setReducedMotion] =
        useState(false);


    /* =====================================================
       PREFERS REDUCED MOTION
    ===================================================== */

    useEffect(() => {
        const mediaQuery =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );


        const updatePreference = () => {
            setReducedMotion(
                mediaQuery.matches
            );
        };


        updatePreference();


        mediaQuery.addEventListener(
            "change",
            updatePreference
        );


        return () => {
            mediaQuery.removeEventListener(
                "change",
                updatePreference
            );
        };
    }, []);


    /*
     * =====================================================
     * AUCUNE PHOTO
     * =====================================================
     */

    if (
        !photos ||
        photos.length === 0
    ) {
        return null;
    }


    /* =====================================================
       NORMALISATION
    ===================================================== */

    const normalizePosition = (
        value
    ) => {
        const length =
            photos.length;


        let result =
            value % length;


        if (result < 0) {
            result += length;
        }


        return result;
    };


    /* =====================================================
       ANNULATION D'UNE ANIMATION
    ===================================================== */

    const cancelAnimation = () => {
        if (
            animationFrame.current
        ) {
            cancelAnimationFrame(
                animationFrame.current
            );

            animationFrame.current =
                null;
        }
    };


    /* =====================================================
       SNAP MAGNÉTIQUE
    ===================================================== */

    const snapToClosest = () => {
        const length =
            photos.length;


        /*
         * Photo entière la plus proche.
         */
        const target =
            Math.round(
                positionRef.current
            );


        /*
         * Différence actuelle.
         */
        let difference =
            target -
            positionRef.current;


        /*
         * Boucle infinie :
         * on choisit toujours le chemin
         * le plus court.
         */

        if (
            difference >
            length / 2
        ) {
            difference -= length;
        }


        if (
            difference <
            -length / 2
        ) {
            difference += length;
        }


        const finalPosition =
            positionRef.current +
            difference;


        /*
         * Reduced motion :
         * déplacement immédiat.
         */

        if (reducedMotion) {
            positionRef.current =
                finalPosition;

            setPosition(
                normalizePosition(
                    finalPosition
                )
            );

            return;
        }


        /*
         * =================================================
         * ANIMATION MAGNÉTIQUE
         * =================================================
         */

        const start =
            positionRef.current;

        const startTime =
            performance.now();

        const duration =
            350;


        const animateSnap = (
            currentTime
        ) => {
            const elapsed =
                currentTime -
                startTime;


            const progress =
                Math.min(
                    elapsed /
                    duration,
                    1
                );


            /*
             * Ease-out
             */
            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    4
                );


            positionRef.current =
                start +
                (
                    finalPosition -
                    start
                ) * eased;


            setPosition(
                normalizePosition(
                    positionRef.current
                )
            );


            if (
                progress < 1
            ) {
                animationFrame.current =
                    requestAnimationFrame(
                        animateSnap
                    );
            } else {
                animationFrame.current =
                    null;
            }
        };


        animationFrame.current =
            requestAnimationFrame(
                animateSnap
            );
    };


    /* =====================================================
       INERTIE
    ===================================================== */

    const startInertia = () => {
        if (reducedMotion) {
            velocityRef.current =
                0;

            snapToClosest();

            return;
        }


        /*
         * Friction.
         */
        const friction =
            0.94;


        /*
         * Vitesse minimale.
         */
        const minimumVelocity =
            0.001;


        const animate = () => {

            /*
             * Déplacement
             */
            positionRef.current +=
                velocityRef.current;


            /*
             * Friction
             */
            velocityRef.current *=
                friction;


            /*
             * Mise à jour visuelle.
             */
            setPosition(
                normalizePosition(
                    positionRef.current
                )
            );


            /*
             * Tant qu'il y a suffisamment
             * de vitesse, on continue.
             */
            if (
                Math.abs(
                    velocityRef.current
                ) >
                minimumVelocity
            ) {
                animationFrame.current =
                    requestAnimationFrame(
                        animate
                    );
            } else {
                velocityRef.current =
                    0;

                animationFrame.current =
                    null;

                snapToClosest();
            }
        };


        animationFrame.current =
            requestAnimationFrame(
                animate
            );
    };


    /* =====================================================
       POINTER DOWN
    ===================================================== */

    const handlePointerDown = (
        event
    ) => {
        cancelAnimation();


        isDragging.current =
            true;


        lastPointerX.current =
            event.clientX;


        lastTime.current =
            performance.now();


        velocityRef.current =
            0;


        dragDistance.current =
            0;


        event.currentTarget.setPointerCapture(
            event.pointerId
        );
    };


    /* =====================================================
       POINTER MOVE
    ===================================================== */

    const handlePointerMove = (
        event
    ) => {
        if (
            !isDragging.current
        ) {
            return;
        }


        const now =
            performance.now();


        const deltaX =
            event.clientX -
            lastPointerX.current;


        const deltaTime =
            Math.max(
                now -
                lastTime.current,
                1
            );


        /*
         * Distance totale parcourue.
         */
        dragDistance.current +=
            Math.abs(deltaX);


        /*
         * Conversion pixels → photos.
         *
         * 260 px ≈ 1 photo.
         */
        const movement =
            deltaX / 260;


        /*
         * Drag continu.
         */
        positionRef.current -=
            movement;


        /*
         * Vitesse réelle.
         */
        velocityRef.current =
            -(deltaX / 260) /
            deltaTime *
            16;


        /*
         * Limitation de vitesse.
         */
        velocityRef.current =
            Math.max(
                -0.35,
                Math.min(
                    0.35,
                    velocityRef.current
                )
            );


        /*
         * Mise à jour.
         */
        setPosition(
            normalizePosition(
                positionRef.current
            )
        );


        lastPointerX.current =
            event.clientX;


        lastTime.current =
            now;
    };


    /* =====================================================
       POINTER UP
    ===================================================== */

    const handlePointerUp = (
        event
    ) => {
        if (
            !isDragging.current
        ) {
            return;
        }


        isDragging.current =
            false;


        try {
            event.currentTarget.releasePointerCapture(
                event.pointerId
            );
        } catch {
            // Rien à faire
        }


        /*
         * Petit déplacement :
         * on revient simplement à la photo
         * la plus proche.
         */
        if (
            dragDistance.current <
            5
        ) {
            velocityRef.current =
                0;

            snapToClosest();

            return;
        }


        /*
         * Sinon :
         * inertie.
         */
        startInertia();
    };


    /* =====================================================
       POINTER CANCEL
    ===================================================== */

    const handlePointerCancel = () => {
        isDragging.current =
            false;

        velocityRef.current =
            0;

        snapToClosest();
    };


    /* =====================================================
       PHOTO SUIVANTE
    ===================================================== */

    const goToNext = () => {
        cancelAnimation();


        positionRef.current +=
            1;


        velocityRef.current =
            0;


        snapToClosest();
    };


    /* =====================================================
       PHOTO PRÉCÉDENTE
    ===================================================== */

    const goToPrevious = () => {
        cancelAnimation();


        positionRef.current -=
            1;


        velocityRef.current =
            0;


        snapToClosest();
    };


    /* =====================================================
       INDEX ACTUEL
    ===================================================== */

    const currentIndex =
        Math.round(
            normalizePosition(
                position
            )
        );


    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <div
            className="gallery3d"

            onPointerDown={
                handlePointerDown
            }

            onPointerMove={
                handlePointerMove
            }

            onPointerUp={
                handlePointerUp
            }

            onPointerCancel={
                handlePointerCancel
            }
        >

            <Canvas
                camera={{
                    position: [
                        0,
                        0,
                        8,
                    ],
                    fov: 45,
                }}

                dpr={[
                    1,
                    2,
                ]}

                gl={{
                    antialias: true,
                }}
            >

                <GalleryScene
                    photos={photos}

                    position={
                        position
                    }

                    onPhotoClick={
                        onPhotoClick
                    }

                    isDragging={
                        isDragging
                    }
                />

            </Canvas>


            {/* =================================================
                BOUTON PRÉCÉDENT
            ================================================= */}

            <button
                type="button"

                className="
                    gallery3d-button
                    gallery3d-prev
                "

                onClick={
                    goToPrevious
                }

                aria-label="Photo précédente"
            >
                &#10094;
            </button>


            {/* =================================================
                BOUTON SUIVANT
            ================================================= */}

            <button
                type="button"

                className="
                    gallery3d-button
                    gallery3d-next
                "

                onClick={
                    goToNext
                }

                aria-label="Photo suivante"
            >
                &#10095;
            </button>


            {/* =================================================
                COMPTEUR
            ================================================= */}

            <div
                className="gallery3d-counter"
            >
                {currentIndex + 1}
                {" / "}
                {photos.length}
            </div>

        </div>
    );
}


export default Gallery3D;