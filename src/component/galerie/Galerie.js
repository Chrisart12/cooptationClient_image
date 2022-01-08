import React from 'react';
import ReactDom from "react-dom";
import {Link } from 'react-router-dom';
import axios from 'axios';
import './Galerie.css';
import  { Redirect } from 'react-router-dom';
import config from '../../configuration/config';
//import API_URL from '../../configuration/config';
// import logo from '../../images/logo.jpg';


class Galerie extends React.Component {
  
  state = {
    stories: [],
  }
  
  componentDidMount() {
    // axios.get(API_URL + 'api/allStories')
    // .then(res => {
    //     this.setState({
    //       faHeart: 'red',
    //       stories: res.data.slice(0, 16)
    //     })
    // })
    //-------------
    axios({
      method: 'get',
      url:  config.API_URL  + 'api/allStories',
    
      headers: { 
        "Content-Type": "application/json",
        "Accept":"application/json",
        "authorization": "Bearer " +  sessionStorage.getItem('token')
      }
    
    }).then(response => {
        this.setState({
            stories: response.data
        }) 
    })
    //---------------
  }
 
 render () {
  const { stories } = this.state;
  
  return sessionStorage.getItem('data') ? (
    <div className="content">
      <div className="galerie-container">
        <div className="conts">
          {stories.map(storie => 
              <div key={storie.id} className="sections text-center">
                <div className="cadres">
                  <Link to={'/galerie/'+ storie.id } >
                    <div className="photos" style={{backgroundImage: 
                    `url(${ config.API_URL }resources/pictures/${storie.picture_path})`,
                    backgroundPositionY: `${storie.bg_position_y}`, 
                    backgroundPositionX: `${storie.bg_position_x}` }} >
                    </div>
                    <div><i className="far fa-heart coeurs"></i></div>
                  </Link>
                  <div className="noms">
                    <span className="firstnames">{storie.firstname} </span> 
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

export default Galerie;
