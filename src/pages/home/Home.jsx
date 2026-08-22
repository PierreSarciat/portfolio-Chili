import { InteractiveMap } from '@/components/map/InteractiveMap';
import BorderWithDot from "@components/BorderWithDot/BorderWithDot";
import Carte from "@assets/icons/carte/carte.svg";
import "./Home.scss"

function Home() {

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

                <InteractiveMap />
            </section>

            <section className='description'>
                <div className="logo-carte">
                    <img
                        src={Carte}
                        alt="icône carte"
                        className=""
                    />
                </div>
                <p>Survolez un point sur la carte pour afficher sa description.</p>
            </section>
        </div>
    );
}

export default Home;