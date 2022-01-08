import React from 'react';
import './App.css';
import logo from './images/logo.jpg';
import Cgu from './component/home/Cgu';
import Login from './component/login/Login';
import Menu from './component/home/Menu';
import Galerie from './component/galerie/Galerie';
import Profil from './component/profil/Profil';
import userProfil from './component/profil/userProfil';
import AllProfilLike from './component/profil/AllProfilLike';
import Offres from './component/offre/Offres';
import Offre from './component/offre/Offre';
import Photo from './component/camera/Photo';
import Storie from './component/storie/Storie';
import ValidateStorie from './component/storie/ValidateStorie';
import FormCoopter from  './component/cooptation/FormCoopter';
import { BrowserRouter, Switch, Route, HashRouter  as Router} from 'react-router-dom';
import {Link } from 'react-router-dom';
import ReactDom from "react-dom";
import RecadrageImage from './component/camera/RecadrageImage';
import  { Redirect } from 'react-router-dom';

// import { NavLink } from 'react-router-dom';




class App extends React.Component {
  constructor(props) {
    super(props)
   
    this.state = {
      isconnect: false,
      isactive: false,
      menu: true
    } 
   }
   
   // Permet de mettre la connection à true
   isconnectHandler = () => {
    this.setState({
      isconnect: true
    })
   }

  // Permet de mettre la connection à false
    isdeconnectHandler = () => {
      this.setState({
        isconnect: false
      })
     }

     isActiveHandler = () => {
      this.setState({
        isactive: true
      })
     }
  // Permet de changer le menu hamburger
     removehamburgerMenu = () => {
      this.setState({
        menu: false
      })
     }

  //Permet d'aller en arrière
  goBack = () => {
    window.history.go(-1);
    this.setState({
      menu: true
    })
  }
  
  render () {
    localStorage.clear()
    let{menu, isactive} = this.state
    let menuIcon
    let footer; 
    let activeStory;

    //Gérer l'ouverture et la fermeture de menu
    if(menu){
      menuIcon = <Link to='/menu'>
                    <i className="fas fa-bars" onClick={this.removehamburgerMenu}></i>
                 </Link>
    } else {
      menuIcon = <i className="fas fa-times" onClick={this.goBack}></i>
               
    }
  
   if( isactive || localStorage.getItem('isActive') == 1) {
    activeStory = <Link to='/profil'>
                    <i className="fas fa-user-circle"></i>
                  </Link>
   } else {
    activeStory = <Link to='/photo'>
                    <i className="fas fa-camera"></i>
                  </Link> 
   }

   if(this.state.isconnect == true || sessionStorage.getItem('data')) {
    footer = <div className="footer-fixe">
              <div className="button_footer">
                <Link to='/galerie'>
                  <i className="fas fa-home"></i>
                </Link>
              </div>
              <div className="button_footer">
              {activeStory}
                
              </div>
              <div className="button_footer">
                <Link to="/allprofillike"  className="activeLink">
                  <i className="fas fa-heart"></i>
                </Link>
              </div>
            </div> 
   } else if(this.state.isconnect == false) {
     footer = ""
   }

  
      
  return (
    <div className="app">
    <Router>
    
        <div className="App">
          <div className="header-fixe">
            <div className="barre">
              <Link to='/'>
                <img src={ logo } className="logo" alt="logo" />
              </Link>
            </div>
            <div>
              {menuIcon}
            </div> 
          </div>
        
          <Switch>
            <Route path="/" exact component={ () => <Login isconnectHandler={this.isconnectHandler} />}/>
            <Route path="/cgu" render={()=> (sessionStorage.getItem('data') ? (<Cgu />) : (<Redirect to='/' />) )}/>
            <Route path="/menu" component={ () => <Menu isdeconnectHandler={this.isdeconnectHandler} /> }/>
            <Route path="/galerie" exact component={ Galerie }/>
            <Route path="/galerie/:id" component={ Profil }/>
            <Route path="/photo" component={ Photo }/>
            <Route path="/offres" exact component={ Offres }/> 
            <Route path="/offres/:id" component={ Offre }/> 
            <Route path="/formcoopter/:id" component={ FormCoopter }/>
            <Route path="/recadrageimage" render={()=> (sessionStorage.getItem('data') ? (<RecadrageImage />) : (<Redirect to='/' />) )}/>
            <Route path="/storie" component={ Storie }/>
            <Route path="/validatestorie" component={ () =>< ValidateStorie isActiveHandler={this.isActiveHandler}/>}/>
            <Route path="/allprofillike" component={ AllProfilLike }/>
            <Route path="/userProfil/:id" component={ userProfil }/>
           
            <Route render={()=> <div className="not-found">
                                  <p>404</p>
                                  <p>La page demandée n'existe pas</p>
                                </div>} />
          </Switch>
        
          {footer}
        </div>
       
      </Router>
       
    </div>
    )
  }
}

export default App;
