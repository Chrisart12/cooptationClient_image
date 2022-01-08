import React from 'react';
import ReactDom from "react-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
import config from '../../configuration/config';
//import API_URL from '../../configuration/config';


class Offre extends React.Component {
 constructor(props){
      super(props);
 this.state = {
    offre: [],
    // redirect: false
  } 
  
 }
  
  componentDidMount() {
    // axios.get(API_URL + 'api/offres/' + this.props.match.params.id)
    // .then(response => {
    //   console.log('offre', response)
    //     this.setState({
    //        offre: response.data.data
    //     })
    // })

    //------------------------------
    axios({
      method: 'get',
      url:  config.API_URL  + 'api/offres/' + this.props.match.params.id,

      headers: { 
        "Content-Type": "application/json",
        "Accept":"application/json",
        "authorization": "Bearer " +  sessionStorage.getItem('token')
      }

    }).then(response => {
        this.setState({
            offre: response.data.data
        }) 
      })
    //---------------------------
  }

  // componentWillMount() {
  //   if(sessionStorage.getItem('data')) {
  //   } else {
  //     this.setState({redirect: true});
  //   }
  // }

 render () {
  
  // if(this.state.redirect){
  //   return <Redirect to={'/login'} />
  // }

   const { offre } = this.state;
  return  sessionStorage.getItem('data') ? (
    <div className="content">
        <div className="coopterBouton">
          <Link to='/offres'>
            <button className="voir"><i className="fas fa-chevron-left"></i> RETOUR</button>
          </Link>
          <Link to={'/formcoopter/' + offre.id}>
            <button className="voir">COOPTER</button>
          </Link>
        </div>

        <h3 className="titre-offres text-center">{offre.poste}</h3>
        <div className="offre">
          <p>{offre.lieu}</p>
          <p>{offre.reference}</p>
          <p>{offre.description}</p>
        </div>
      
    </div>
  ) : <Redirect to={'/'} />;


   }

}

export default Offre;
