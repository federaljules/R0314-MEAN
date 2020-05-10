import React from 'react'
import './css/style.css'
import {Link} from 'react-router-dom'


function Navigation(){
    return(
        <nav>
                                {/*Navigaatio Linkit oikeisiin reitteihin*/}
            <ul>
                <li><Link to="/">Etusivu</Link></li>
                <li><Link to="/muokkaa">Muokkaa APIa</Link></li>



            </ul>
            
        </nav>
    )
}

export default Navigation;