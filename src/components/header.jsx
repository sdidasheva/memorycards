import react from 'react';
import './styles/header.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Routes
} from "react-router-dom";
import Table from '../pages/Table/table';
import Error from '../pages/Error/error';
import Cards from '../pages/Cards/cards';

function Header() {

    return (
        <Router>
            <div className='header' >
                <Link to="/"><FontAwesomeIcon icon={faLanguage} className='icon_logo' /></Link>
                <nav>
                    <ul>
                        <li ><Link className='menu home-menu' to="/">Home</Link></li>
                        <li> <Link className='menu game-menu' to="/game">Game</Link></li>
                    </ul>
                </nav>
            </div >
            <Routes>
                <Route exact path="/game" element={<Cards />} />
                <Route exact path="/" element={<Table />} />
                <Route element={<Error />} />
            </Routes>

        </Router>
    )
}

export default Header;