import React from 'react';
import ReactDom from "react-dom";
import {Link } from 'react-router-dom';
import axios from 'axios';
import './ValidateStorie.css';
import  { Redirect } from 'react-router-dom';
import config from '../../configuration/config';
//import API_URL from '../../configuration/config';



class ValidateStorie extends React.Component {

    constructor() {
        super();
        this.state = {
            storie: sessionStorage.getItem('storie'),
            bg_position_x: sessionStorage.getItem('bg_position_x'),
            bg_position_y: sessionStorage.getItem('bg_position_y'),
            validateStorie: false
        }
    }


    changeHandler = (e) => {
            // this.setState({ 
            //     // storie: e.target.value,
            //      bg_position_x: sessionStorage.getItem('bg_position_x'),
            //      bg_position_y: sessionStorage.getItem('bg_position_y')
            // })      
}


//Envoi du formulaire storie
submitHandler = e => {
    e.preventDefault()

    axios.post(config.API_URL + 'api/validateStories/' + JSON.parse(sessionStorage.getItem('data')).id, this.state)
    .then(response => {
      this.setState({
        validateStorie: true
      }) 
      //Création d'un localStorage pour l'utilisateur qui a validé sa storie
      localStorage.setItem('isActive', response.data.is_active)

      //On fait appel à la fonction isActiveHandler pour 
      //changer l'état isconnect à true 
      this.props.isActiveHandler()
    })
    .catch(error => {
      console.log(error)
    })
  }

 render () {
      let image = sessionStorage.getItem('recadrageimage_image')
      let firstname = JSON.parse(sessionStorage.getItem('data')).firstname
      let lastname = JSON.parse(sessionStorage.getItem('data')).lastname
      
      let { storie, bg_position_x, bg_position_y, validateStorie} = this.state;
     if(validateStorie){
      return <Redirect to={'/userProfil/' + JSON.parse(sessionStorage.getItem('data')).id } />
     }
  
  return (
    <div className="content">
      <div className="container">
        <div className="validate-cont">
                <div className="nom text-center">
                  <span className="firstname">{firstname}</span> 
                  <span className="lastname">{lastname}</span>
                </div>
              <div className="validate-section text-center" >     
                <div className="cadre">
                <img className="image" src={image} />
                  
                  <div><i className="far fa-heart coeur"></i></div>
                  <div className="story">
                    <p className="validate--text">{storie}</p> 
                  </div>
                </div>
              </div>
              <div className="validateStorie-form">
                <form onSubmit={this.submitHandler}>
                <textarea style={{display: "none"}} name="storie" value ={storie} onChange={this.changeHandler}></textarea>
                <input type="hidden" name="bg_position_y" value={bg_position_y}/>
                <div className="bouton-img">
                
                  <button className="bouton-img__validate" value="GALERIE" onClick={this.submitHandler}>
                  
                      VALIDER
                      <i className="fas fa-check"></i>
          
                  </button>
                     
                </div>
                </form>
              </div>
        </div>
      </div>
    </div>
  )

  }

}

export default  ValidateStorie;
