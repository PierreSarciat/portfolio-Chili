import { useState } from 'react';
import { InteractiveMap } from '@/components/map/InteractiveMap';
import BorderWithDot from "@components/BorderWithDot/BorderWithDot";
import Carte from "@assets/icons/carte/carte.svg";
import { NavLink } from 'react-router-dom';


import "./Home.scss"

function Home() {

    const [activeRegion, setActiveRegion] = useState(null);

    return (
        <div className="global">
            <section className='presentation'>


                <h1>CARNETS DU CHILI</h1>

                <BorderWithDot variant="title"></BorderWithDot>
                <p>
                    Sur plus de 4 300 kilomètres, le Chili déploie une symphonie de paysages à couper le souffle : déserts arides, fjords mystérieux, volcans majestueux et steppes infinies du Sud.
                </p>


                <p>
                    Du désert d'Atacama, l'un des plus secs au monde, à la Terre de Feu, en passant par la cordillère des Andes et l'île enchantée de Chiloé, ce pays austral incarne l'eau, le feu et la glace dans une harmonie parfaite.
                </p>


                <p>
                    Sa géographie, d'une singularité envoûtante, semble tout droit sortie de l'imagination d'un artiste qui aurait cédé aux élans les plus fous de sa créativité.

                </p>
                <BorderWithDot variant="home"></BorderWithDot>
            </section>

            <section>

                <InteractiveMap
                    onRegionHover={setActiveRegion}
                />
            </section>

            <section className={`description ${activeRegion ? 'is-active' : ''}`}>
                <div className="logo-carte">
                    {!activeRegion && (
                        <img
                            src={Carte}
                            alt="Icône carte"
                        />
                    )}
                </div>


                {activeRegion ? (
                    <>

                        <h2>{activeRegion.title}</h2>
                        <BorderWithDot variant="home"></BorderWithDot>

                        <div className="region-photos">
                            {activeRegion?.photo_home?.previewSrc && (
                                <img
                                    src={activeRegion.photo_home.previewSrc}
                                    alt={activeRegion.photo_home.alt || ''}
                                    className="photo-preview"
                                />
                            )}
                        </div>
                        <p>
                            {activeRegion.description}
                        </p>
                        <NavLink
                            to={`/region/${activeRegion.id}`}
                            className="explore-region-link"
                        >
                            <h3>Explorer la région</h3>
                        </NavLink>
                    </>
                ) : (
                    <p>
                        Survolez un point sur la carte pour afficher sa description.
                    </p>
                )}

            </section>
        </div>
    );
}

export default Home;