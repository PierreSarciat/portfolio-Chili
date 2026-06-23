import { InteractiveMap } from '@/components/map/InteractiveMap';

function Home() {
    return (
        <div className="global">
            <section>
                <h1>CARNETS DU CHILI</h1>
                <p>
                    Une exploration photographique des confins de la Terre,
                    du désert le plus aride aux glaciers de Patagonie.
                </p>
            </section>

            <section>
                <div>Carte du Chili</div>
                <InteractiveMap />
            </section>

            <section>
                <p>Survolez une région pour afficher sa description.</p>
            </section>
        </div>
    );
}

export default Home;