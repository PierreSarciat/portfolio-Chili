import { InteractiveMap } from '@/components/map/InteractiveMap';
import BorderWithDot from "@components/BorderWithDot/BorderWithDot";
import "./Home.scss"

function Home() {
    return (
        <div className="global">
            <section>


                <h1>CARNETS DU CHILI</h1>
                <p>
                    Terres de contrastes
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipiscing elit. Adipiscing elit quisque faucibus ex sapien vitae pellentesque. Vitae pellentesque sem placerat in id cursus mi. Cursus mi pretium tellus duis convallis tempus leo. Tempus leo eu aenean sed diam urna tempor. Urna tempor pulvinar vivamus fringilla lacus nec metus.
                </p>
                <p>Explorez le Chili</p>
                <BorderWithDot></BorderWithDot>
            </section>

            <section>

                <InteractiveMap />
            </section>

            <section>
                <p>Survolez une région pour afficher sa description.</p>
            </section>
        </div>
    );
}

export default Home;