import React from 'react';
import ReactDom from "react-dom";
import {Link } from 'react-router-dom';
import axios from 'axios';
import './Profil.css';
import config from '../../configuration/config';



class userProfil extends React.Component {

  state = {
    storie: [],
    like: true,
    user_id: JSON.parse(sessionStorage.getItem('data')).id,
    story_id: this.props.match.params.id
  }

  componentDidMount() {
    axios.get(config.API_URL + 'api/userProfil/' + JSON.parse(sessionStorage.getItem('data')).id)
    .then(res => {
      console.log("L'utilisateur", res)
        this.setState({
          storie: res.data[0]
        }) 
    })
  }

  submitHandlerLike = e => {
    e.preventDefault()
    axios.post(config.API_URL + 'api/storeLike', this.state)
    .then(response => {

      // On crée un localsorage pour stocker l'id du like
      localStorage.setItem('like', response.data.id)
      
      // On change le state du like
      this.setState({
        like: false
      })
     
    })
    .catch(error => {
      console.log(error)
    })
  }

  submitHandlerdisLike = e => {
    e.preventDefault()
    axios.delete(config.API_URL + 'api/deleteLike/' + localStorage.getItem('like'))
    .then(response => {
      //
      localStorage.removeItem('like')
       // On change le state du like
      this.setState({
        like:true
      })
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
  }



  likeHandler = () => {
    this.setState({
      like: false
    })
  }

  disLikeHandler = () => {
    this.setState({
      like:true
    })
  }
  
 render () {
   const { user_id, storie, like} = this.state;

   let likeForm
   let disLikeForm
   if(like){
    likeForm = <form onSubmit={this.submitHandlerLike}>
                  <input type="hidden" name="offre_id" value={user_id} />
                  <input type="hidden" name="firstname"  />
                  <button type="submit" className="like-buton"><i className="far fa-heart coeur"></i></button>
               </form>  
   } else {
    disLikeForm = <form onSubmit={this.submitHandlerdisLike}>
                    <input type="hidden" name="offre_id" value={user_id} />
                    <input type="hidden" name="firstname"  />
                    <button type="submit" className="like-buton"><i className="fas fa-heart coeur"></i></button>
                  </form>
   }
  return (
    <div>
    <div className="container">
    <div className="cont">
    <div className="nom text-center">
    <span className="firstname">{storie.firstname}</span> 
    <span className="lastname">{storie.lastname}</span>
    </div>
  <div key={storie.id} className="section text-center" >
            
            <div className="cadre">
            <img className="image"  
            src={`${ config.API_URL }resources/pictures/${storie.picture_path}`} />

                {/*<div className="image" style={{backgroundImage: 
                  `url(${ config.API_URL }resources/pictures/${storie.picture_path})`,
                  backgroundPositionY: `${storie.bg_position_y}`, 
                  backgroundPositionX: `${storie.bg_position_x}` }} >
                </div>*/}
                
                <div onClick={ this.submitHandlerLike }> { likeForm } </div>
                <div onClick={this.submitHandlerdisLike } > { disLikeForm } </div>
                <div className="story">
               <p>{storie.story}</p>
              </div>
            </div>
          </div>
    </div>
  </div>
    </div>
  )

  }

}

export default userProfil;
