import React from 'react';
import ReactDom from "react-dom";
import {Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../configuration/config';
//import API_URL from '../../configuration/config';
// import './App.css';


class FormCoopter extends React.Component {
  constructor(props){
       super(props);

       this.state = {
         firstname: '',
         lastname: '',
         offre_id: this.props.match.params.id 
       }
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    axios.post( config.API_URL + 'api/storeCandidat', this.state)
    .then(response => {
      // this.setState({
      //   firstname: '',
      //   lastname: '',
      //   offre_id:''
      // })
    })
    .catch(error => {
      console.log(error)
    })
  }
 

  render() {

    const { firsname, lastname, offre_id} = this.state;
    //console.log(this.props.match.params.id);
    return (
      <div className="content">
         <div className="coopterBouton">
            <Link to={'/offres/' + this.props.match.params.id}>
                <button className="voir"><i className="fas fa-chevron-left"></i> RETOUR</button>
            </Link>
         </div>
         <div className="texte">
         <p>Vous êtes sur le point de proposer un candidat pour le poste de :</p>
            <p>Veuillez renseigner les coordonnées du postulant et cliquer sur envoyer.</p>
         </div>
         <div className="formulaire">
            <form onSubmit={this.submitHandler} className="col-xs-offset-1 col-xs-10 col-xs-offset-1">
                  <div className="form-group">
                      <input type="hidden" name="offre_id" value={offre_id} />
                  </div>
                  <div className="form-group">
                      <input type="text" className="form-control" name="firstname" 
                      onChange={this.changeHandler} placeholder="Nom*" />
                  </div>
                  <div className="form-group">
                      <input type="text" className="form-control" name="lastname" value ={firsname}
                       onChange={this.changeHandler} placeholder="Prénom*" />
                  </div>
                  <div className="form-group">
                      <input type="text" className="form-control" name="reference" value="Référence" readOnly/>
                  </div>
                  <button type="submit" className="btn btn-block butonEnvFormCoopter">ENVOYER</button>
             </form>
         </div>
      </div>
    );
        
  }  
}

export default FormCoopter;