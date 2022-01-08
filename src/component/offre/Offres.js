import React from 'react';
import ReactDom from "react-dom";
import {Link } from 'react-router-dom';
import axios from 'axios';
import './OffreStyle.css';
import Login from '../login/Login';
import  { Redirect } from 'react-router-dom';
import config from '../../configuration/config';
//import API_URL from '../../configuration/config';


class Offres extends React.Component {
  constructor(props){
    super(props);

  this.state = {
    offres: [],
    query: "",
    search: true,
  }
}


  componentDidMount() {
  // if(this.state.search) {
  //   axios.get(API_URL + 'api/offres')
  //   .then(res => {
  //   console.log("la res",res);
  //       this.setState({
  //         offres: res.data.data.slice(0,10)
  //       })
  //   })
  // }
  //------------------------------
  axios({
    method: 'get',
    url:  config.API_URL  + 'api/offres',

    headers: { 
      "Content-Type": "application/json",
      "Accept":"application/json",
      "authorization": "Bearer " +  sessionStorage.getItem('token')
    }

  }).then(response => {
      this.setState({
          offres: response.data.data
      }) 
  })
//------------------------------
}

  //Rechercher une offre donnée
  changeHandler = (e) => {
    this.setState({ 
      query: e.target.value 
    })
  }
 
  //On envoie la recherche
  submitHandler = e => {
    console.log(this.state.query)
    e.preventDefault()
    axios.get( config.API_URL + 'api/search/'+ this.state.query)
    .then(response => {
      console.log('la reponse', response)
          this.setState({
            offres: response.data.data.slice(0,10)
        })
    })
    .catch(error => {
      console.log(error)
    })
  }
 
  // componentDidMount() {
  //   axios.get('http://localhost:8000/api/offres', {
    
  //   })
  //   .then(response => {
  //    console.log(response);
  //       this.setState({
  //          offres: response.data.data.slice(0,10)
  //       })
  //   })
  //   .catch(error => {
  //     console.log("request failed : ", error)
  //   })
  // }

 render () {
 
  let { offres, query } = this.state;
  return sessionStorage.getItem('data') ? (
    <div className="content">
      <div className="form-fixed-back">
        <div className="form-fixed">
          <form onSubmit={this.submitHandler} className="form-inline">
            <div className="form-group form-search">
              <div className="input-flex">
                <input type="search" className="form-control" name="query" value={query}  onChange={this.changeHandler} placeholder="Rechercher une offre"/>
              </div>
              <div className="buton-flex">
                <button type="submit" className="btn btn-default"><i className='fas fa-search'></i></button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="offres">
          <h3 className="titre-offres text-center">Les offres d'emploi sur Mastory</h3>
          <div className="offre">
            {offres.map(offre => 
              <div key={offre.id}>
                  <p>{offre.lieu}</p>
                  <p>{offre.reference}</p>
                  <Link to={'/offres/' + offre.id }>
                    <h4>{offre.poste}</h4>
                    <p>{offre.description}</p>
                  </Link>   
              </div>
              )
              }
          </div>
        </div>
    </div>
  ) : <Redirect to={'/'} />;

   }

}

export default Offres;
