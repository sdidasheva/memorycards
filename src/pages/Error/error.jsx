import react from 'react';
import './error.scss';
import error from './404error.jpg';
// import {
//     Link
// } from "react-router-dom";

function Error() {
    return (<div className='error'>
        <h1>404 Page Not Found</h1>
        <img className='image' src={error} alt='404error' />
        <h2>Can you find the page?</h2>
        {/* <h3>You found <Link to='/' className='link'> home page </Link> and <Link to='/game' className='link'> game page </Link></h3> */}
        <h3>You found home page and game page</h3>
    </div >
    )
}

export default Error;