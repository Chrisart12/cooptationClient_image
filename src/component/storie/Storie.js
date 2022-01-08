import React from 'react';
import ReactDom from "react-dom";
import {Link } from 'react-router-dom';
import axios from 'axios';
import './Storie.css';
import { read } from 'fs';
import  { Redirect } from 'react-router-dom';
import config from '../../configuration/config';
//import API_URL from '../../configuration/config';
//import RecadrageImage from './RecadrageImage'
// import logo from '../../images/logo.jpg';


class Storie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nbr_lettre: 300,
            storie: '',
            bg_position_x: '',
            bg_position_y: '',
            validate: false,
        }
    }
    
    changeHandler = (e) => {
        if((this.state.storie).length <  (this.state.nbr_lettre)) {
            this.setState({ 
                 storie: e.target.value,
                 bg_position_x: sessionStorage.getItem('bg_position_x'),
                 bg_position_y: sessionStorage.getItem('bg_position_y')
            })
        } 
}
 
//Envoi du formulaire storie
submitHandler = e => {
    e.preventDefault()
    sessionStorage.setItem('storie', (this.state.storie))

    this.setState({
        redirect: true
    })

    axios.post(config.API_URL + 'api/updateStories/' + JSON.parse(sessionStorage.getItem('data')).id, this.state)
    .then(response => {
      console.log(response)
     
    })
    .catch(error => {
      console.log(error)
    })
  }
    
 render () {
    let image =  sessionStorage.getItem('recadrageimage_image')
    let {storie, nbr_lettre} = this.state
    // Décompte du nombre de lettres restants à tapper
    nbr_lettre = nbr_lettre - storie.length

    // Changement de couleur de text-validate vers la fin
    let textValidate
    if(nbr_lettre < 30 && nbr_lettre > 10) {
        textValidate = {
            color: "#fbc02d"
        }
    } else if(nbr_lettre <= 10){
        textValidate = {
            color: "#d32f2f"
        }
    }

    //Rediriger vers la validation
    if(this.state.redirect){
        return <Redirect to={'/validatestorie'} />
      }

    // On récupère les positons de la photo
    let {bg_position_x, bg_position_y } = this.state
    
    return (
        <div className="content">
            <div className="story--cadreImg"> 
                <img className="story--img" src={image} />
            </div>
            <p className="text-validate" style={textValidate}>( {nbr_lettre} caractères restants )</p>
            <form >
               <textarea autoFocus className="story--text" name="storie" placeholder="Rédiger votre story ici" value ={storie}
               onChange={this.changeHandler}></textarea>
               <input type="hidden" name="bg_position_x" value={bg_position_x}/>
               <input type="hidden" name="bg_position_y" value={bg_position_y}/>
                <div className="bouton-img">
                    <button className="bouton-img__validate" value="GALERIE" onClick={this.submitHandler}>SOUMETTRE
                        <i className="fas fa-check"></i>
                    </button>
                </div>
            </form>
        </div>
    )
    
     }    

}

export default Storie;
