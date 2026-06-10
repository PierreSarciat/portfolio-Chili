import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';

import './Layout.scss';

export default function Layout() {
    return (
        <div >
            <Navbar />
            <main >
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}