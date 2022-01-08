import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Link } from 'react-router-dom';
import Offres from '../offre/Offres';
import Galerie from '../galerie/Galerie';
import Cgu from './Cgu';
import MenuStyle from './MenuStyle.css';
import  { Redirect } from 'react-router-dom';


function Menu(props) {
  const destroySession = () => {
    //On remet isconnect à false
    props.isdeconnectHandler()
    //On détruit la session
    sessionStorage.clear();
  }

  return sessionStorage.getItem('data') ? (
    <div className="content"> 
      <div className="menu">
        <ul className="nav-links">
          <Link to='/galerie'>
            <li className="liMenuElt">GALERIE</li>
          </Link>
          <Link to='/cgu'>
            <li className="liMenuElt">CGU</li>
          </Link>
          <Link to='/offres'>
            <li className="liMenuElt">OFFRES</li>
          </Link>
          <Link to='/'>
            <button className="se_deconnecter" onClick={destroySession}>Se deconnecter</button>
          </Link>
        </ul>
      </div>
    </div>
  ) : <Redirect to={'/'} />;
}

export default Menu;
