import React from 'react';
import ReactDom from "react-dom";
import {Link } from 'react-router-dom';
import axios from 'axios';
import '../galerie/Galerie.css';
import  { Redirect } from 'react-router-dom';
import config from '../../configuration/config';
// import logo from '../../images/logo.jpg';
//import API_URL from '../../configuration/config';


class AllProfilLike extends React.Component {

  state = {
    stories: [],
  }
  

  componentDidMount() {
    // axios.get(API_URL + 'api/allProfilLikes/' + JSON.parse(sessionStorage.getItem('data')).id)
    // .then(res => {
    //     this.setState({
    //       faHeart: 'red',
    //       stories: res.data
         
    //     })
    // })
    //------------------------
    axios({
      method: 'get',
      url:  config.API_URL  + 'api/allProfilLikes/' + JSON.parse(sessionStorage.getItem('data')).id,
    
      headers: { 
        "Content-Type": "application/json",
        "Accept":"application/json",
        "authorization": "Bearer " +  sessionStorage.getItem('token')
      }
    
    }).then(response => {
        this.setState({
          faHeart: 'red',
          stories: response.data
        }) 
    })
    //-----------------------------
  }
 
 render () {
  //sessionStorage.getItem('data') ?
  //: <Redirect to={'/'} />
  const { stories } = this.state;
  return sessionStorage.getItem('data') ? (
    <div className="content">
      <div className="galerie-container">
        <div className="conts">
          {stories.map(storie => 
              <div key={storie.id} className="sections text-center" >
                <div className="cadres">
                  <Link to={'/galerie/'+ storie.id } >
                    <div className="photos" style={{backgroundImage: 
                    `url(${ config.API_URL }resources/pictures/${storie.picture_path})`,
                    backgroundPositionY: `${storie.bg_position_y}`, 
                    backgroundPositionX: `${storie.bg_position_x}` }} >
                    </div>
                    <div><i className="fas fa-heart coeurs"></i></div>
                  </Link>
                  <div className="noms">
                    <span className="firstnames">{storie.firstname}</span> 
                    <span className="lastnames"> {storie.lastname}</span>
                  </div>
                </div>
              </div>
              )
            }
        </div>
      </div>
    </div>
  ) : <Redirect to={'/'} />;

  }

}

export default AllProfilLike;
