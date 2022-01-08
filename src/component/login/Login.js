import React from 'react';
import ReactDom from "react-dom";
import {PostData} from '../services/PostData';
import logo_1 from '../../images/logo_1.png';
import './Login.css';
import axios from 'axios';
import  { Redirect } from 'react-router-dom';
import ChampNonRemplis from '../flash/ChampNonRemplis';
import Galerie from '../galerie/Galerie';
import config from '../../configuration/config';


class Login  extends React.Component {
 
 constructor(props){
      super(props)
     this.state = {
        lastname:'',
        firstname: '',
        id:        '',
        email:'',
        password:'',
        redirect: false,
      }  
 }  
  
      changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
      }


      submitHandler = (e)=>{
        e.preventDefault()
        
       
        // Send a POST request
        if(this.state.email && this.state.password) {

          axios({
            method: 'post',
            url: config.API_URL + 'oauth/token',
            data: {
              "grant_type": config.GRANT_TYPE,
              "client_id": config.CLIENT_ID,
              "client_secret":  config.CLIENT_SECRET,
              "username": this.state.email,
              "password": this.state.password
            },
            headers: { 
              "Content-Type": "application/json",
              "Accept":"application/json",
            }
          }).then(response => {
            //On stocke le token en session
            sessionStorage.setItem("token", response.data.access_token)
            axios({
              method: 'get',
              url: config.API_URL + 'api/user',
        
              headers: { 
                "Content-Type": "application/json",
                "Accept":"application/json",
                "authorization": "Bearer " + response.data.access_token
              }
            }).then(response => {
              
              this.setState({
                lastname: response.data.lastname,
                firstname: response.data.firstname,
                id:        response.data.id,
              })
            
              // On vérifie si l'utilisateur a déjà validé sa storie ou pas
                //   axios({
                //     method:'get',
                //     url: 'http://localhost/cooptationAPI/public/api/storiesIsActive/' + this.state.id,
                //   }).then(response => {
                //     //On crée une sessionStorage pour savoir si l'utilisateur à déjà activé ou pas sa storie
                //     sessionStorage.setItem('isActive', response.data.is_active)
                // })
                ///-------------------------------------------
                //On crée une sessionStorage pour l'utilisation
                sessionStorage.setItem('data', JSON.stringify(response.data))
                this.setState({
                  redirect: true,
                })

                //On fait appel à la fonction isconnectHandler pour 
                //changer l'état isconnect à true 
                this.props.isconnectHandler()
              })
            
          }).catch(function (error) {
            console.log("Post Error : " + error);
          });
        }
          
      }
        
     
 render () {
 
  const { lastname, firstname, id} = this.state
    if(this.state.redirect){
      return <Redirect to={'/galerie'} />
    }

    if(sessionStorage.getItem('data')){
      return <Redirect to={'/galerie'} />
    }
    
  return (
    
    <div className="login-page">
    
      <div className="text-center">
        <img src={ logo_1 } className="logo" alt="logo" />
      </div>
      <div className="login">
        <form onSubmit={this.submitHandler} className="col-xs-offset-1 col-xs-10 col-xs-offset-1">
              <div className="form-group">
                  <input type="email" className="form-control" name="email"
                  onChange={this.changeHandler} placeholder="Email*" />
              </div>
              <div className="form-group">
                  <input type="password" className="form-control" name="password"
                  onChange={this.changeHandler} placeholder="Mot de passe*" />
              </div>
              <button type="submit"  className="btn btn-block loginSubmitButton">ENVOYER</button>
        </form>
      </div>
   
    </div>
  )
  }

}

export default Login;
