import React from 'react';
import ReactDom from "react-dom";
import {Link } from 'react-router-dom';
import axios from 'axios';
import Photo from './Photo';
// import image from './image.jpg';
import './RecadrageImage.css';
import  { Redirect } from 'react-router-dom';
import config from '../../configuration/config';
import ExifOrientationImg from 'react-exif-orientation-img';
//import API_URL from '../../configuration/config';
//import { read } from 'fs';
// import logo from '../../images/logo.jpg';


class RecadrageImage extends React.Component {
    constructor() {
        super();
        this.state = {
            bg_position_x: 50,
            bg_position_y: 50,
            interval: '',
            redirect: false
        }
    }

   
//Recadrage de la photo vers la gauche
    handle_bg_position_x_left = () => {
        
            this.interval = setInterval(() => {
                if( this.state.bg_position_x < 100) {
                this.setState( prevState => ({
                    bg_position_x: prevState.bg_position_x + 1 
                }))
            }
        }, 30)   
    }

//Recadrage de la photo vers la droite
    handle_bg_position_x_right = () => {
        
        this.interval = setInterval(() => {
            if( this.state.bg_position_x > 0) {
            this.setState( prevState => ({
                bg_position_x: prevState.bg_position_x - 1 
            }))
        }
    }, 30)   
}

// Stop le recadrage
handle_bg_position_stop = () => {
    clearInterval(this.interval);
}

//Recadrage de la photo vers le haut
handle_bg_position_y_top = () => {
        
    this.interval = setInterval(() => {
        if( this.state.bg_position_y < 100) {
        this.setState( prevState => ({
            bg_position_y: prevState.bg_position_y + 1 
        }))
    }
  }, 30)   
}

//Recadrage de la photo vers le bas
handle_bg_position_y_down = () => {
        
    this.interval = setInterval(() => {
        if( this.state.bg_position_y > 0) {
        this.setState( prevState => ({
            bg_position_y: prevState.bg_position_y - 1 
        }))
    }
  }, 30)   
}

//Permet de centrer la photo
    handle_bg_position_center = () => {
        this.setState({
            bg_position_x: 50,
            bg_position_y: 50
        })
    }

//Envoi du positionnement de la photo après le recadrage
submitHandler = e => {
    e.preventDefault()
    console.log(this.state)

    axios.post(config.API_URL + 'api/updateStories/' + JSON.parse(sessionStorage.getItem('data')).id, this.state)
    .then(response => {
     // On stocke le positionnement de la photo en sessionStorage pour l'utiliser dans ke coponent Storie
      sessionStorage.setItem('bg_position_x', (this.state.bg_position_x))
      sessionStorage.setItem('bg_position_y', (this.state.bg_position_y))
console.log(response)
      this.setState({redirect: true})
    })
    .catch(error => {
      console.log(error)
    })
  }



   render(){
       let {bg_position_x} = this.state
       let {bg_position_y} = this.state
      
       // Redirection sur Storie
       if(this.state.redirect){
        return <Redirect to={'/storie'} />
      }
      
   let image =  sessionStorage.getItem('recadrageimage_image')
       return(
           <div className="content">
           <div className="global">
            <div className="recadrageimage">
            
                    <div >
                     <ExifOrientationImg className="recadrageimage_image" style={{ backgroundImage:  `url(${image})`,
                        backgroundPositionX: bg_position_x + '%',
                        backgroundPositionY: bg_position_y + '%'
                    }} />
                        <div  className="recadrageimage_image--top">
                            <i className="fas fa-caret-up"  onMouseDown={this.handle_bg_position_y_top}
                                                            onTouchStart={this.handle_bg_position_y_top}
                                                            onMouseUp={this.handle_bg_position_stop}
                                                            onTouchEnd={this.handle_bg_position_stop}>
                            </i>
                        </div>
                        <div className="recadrageimage_image--center">
                            <i className="fas fa-caret-left" onMouseDown={this.handle_bg_position_x_left}
                                                             onTouchStart={this.handle_bg_position_x_left}
                                                             onMouseUp={this.handle_bg_position_stop}
                                                             onTouchEnd={this.handle_bg_position_stop}>
                            </i>
                            <i className="fas fa-dot-circle" onClick={this.handle_bg_position_center}></i>
                            <i className="fas fa-caret-right" onMouseDown={this.handle_bg_position_x_right} 
                                                              onMouseUp={this.handle_bg_position_stop}
                                                              onTouchStart={this.handle_bg_position_x_right}
                                                              onTouchEnd={this.handle_bg_position_stop}>
                            </i>
                        </div>
                        <div  className="recadrageimage_image--down">
                            <i className="fas fa-caret-down"  onMouseDown={this.handle_bg_position_y_down}
                                                              onTouchStart={this.handle_bg_position_y_down}
                                                              onMouseUp={this.handle_bg_position_stop}
                                                              onTouchEnd={this.handle_bg_position_stop}>
                            </i>
                        </div>      
                       </div>
                    <div>
                        <p className="text-recadrage">Vous pouvez recadrer si necessaire et valider</p>
                    </div>
                    <form onSubmit={this.submitHandler}>
                        <input name="bg_position_x" value={bg_position_x} type="hidden" onChange={this.changeHandler} />
                        <input name="bg_position_y" value={bg_position_y} type="hidden" onChange={this.changeHandler} />
                        <div className="bouton-img">
                            <button className="bouton-img__validate" value="GALERIE" onClick={this.submitHandler}>VALIDER
                                <i className="fas fa-check"></i>
                            </button>
                        </div>
                    </form>
                    
            </div>
           </div>
        </div>
       )
   }
   
}

export default RecadrageImage;