import React from 'react';
import ReactDom from "react-dom";
import {Link } from 'react-router-dom';
import axios from 'axios';
import './Photo.css';
import { read } from 'fs';
import  { Redirect } from 'react-router-dom';
import RecadrageImage from './RecadrageImage';
import config from '../../configuration/config';
import loadImage  from 'blueimp-load-image';
import ExifOrientationImg from 'react-exif-orientation-img';
//import API_URL from '../../configuration/config';
// import logo from '../../images/logo.jpg';


class Photo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            file: '',
            user_id: '',
            gallery: false,
            photo: false,
            validate: false,
        }
    }
    
   
    //Permet de déclencher l'input file
    onClickHandler = (e, elmId) => {
        //Permet de rechercher la valeur de l'id elmId
       if (e.target.value === "GALERIE"){
          elmId = "galleryUser";
         // Permet d'afficher la vue de galerie
            this.setState({
                photo: false
            })
            this.setState({
                gallery: true
            })

       } else if (e.target.value === "PHOTO") {
          elmId = "captureUser";

           // Permet d'afficher la vue de photo
            this.setState({
                gallery: false
            })
            this.setState({
                photo: true
            })

       }

        var elem = document.getElementById(elmId);
	   if(elem && document.createEvent) {
		  var evt = document.createEvent("MouseEvents");
		  evt.initEvent("click", true, false);
          elem.dispatchEvent(evt);
          
       }
       
    }
 
    //Permet l'insertion d'une image
      changeHandler = (e) => {
        let files = e.target.files;
       
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

    // Image à inserrer en base de données
        this.setState({
            file: e.target.files[0]
        })

    // Permet l'affichage de l'image à l'utilisation 
    //avant son insertion en base de données
        reader.onload = (e) => {
            console.log("l'image", e)
            this.setState({
                image: e.target.result,
                user_id: JSON.parse(sessionStorage.getItem('data')).id
            })
        }
        //--------------------Changement de l'orientation de l'image---------------------


        //---------------------------------------

    }
       // document.getElementById("form").submit();


     
  
    submitHandler = (e) => {
        const fd = new FormData();
        fd.append('image', this.state.file, this.state.file.name)
      e.preventDefault()
     // console.log(this.state)
      axios.post( config.API_URL + 'api/storeStories/' + this.state.user_id, fd)
      .then(response => {
        // On crée une sessionStorage de l'image pour le component RecadrageImage
        sessionStorage.setItem('recadrageimage_image', this.state.image)
        this.setState({
            validate: true
        })
       

      })
      .catch(error => {
        console.log(error)
      })
    }
    

 render () {
      let { image } = this.state;
      if(this.state.validate) {
        return <Redirect to={'/recadrageimage'} />
    }
      //let { change } = this.state;
    if(sessionStorage.getItem('data')) {
      if(image) {
        if(this.state.gallery == true ) {

           return (
                    <div className="content">
                       
                        <div className="cadreImg">  
                        <ExifOrientationImg className="img" 
                            src={image}
                        /> 
                        </div>
                        <p className="text-validate">Recadrage disponible après validation</p>
                        <form id="form" onSubmit={this.submitHandler}>
                            <input id="galleryUser" name="image" type="file" accept="image/*" onChange={this.changeHandler} />
                            <div className="bouton-img">
                                <button className="bouton-img__validate" value="GALERIE" onClick={this.submitHandler} validate={image}>VALIDER
                                    <i className="fas fa-check"></i>
                                </button>
                            </div>
                        
                            <div className="bouton-img">
                                <button className="bouton-img__restart" value="GALERIE" onClick={this.onClickHandler} >RECOMMENCER
                                    <i className="far fa-images"></i>
                                </button>
                            </div>
                        </form>
                    </div>
           )
         } else if (this.state.photo == true ) {
        return (
                <div className="content">
                    <div className="cadreImg"> 
                        
                        <img className="img" src={image} />
                       
                    </div>
                        <form id="form">
                            <input id="captureUser" name="image" type="file" accept="image/*" capture="user" onChange={this.changeHandler}/>
                            <div className="bouton-img">
                                <button className="bouton-img__validate" value="GALERIE" onClick={this.submitHandler} >VALIDER
                                    <i className="fas fa-check"></i>
                                </button>
                            </div>
                            <div className="bouton-img">
                                <button className="bouton-img__restart" value="PHOTO"  onClick={this.onClickHandler} >RECOMMENCER
                                    <i className="fas fa-camera"></i>
                                </button>
                            </div>
                        </form>
                </div> 
                )
         }
        
        } else {

            return (
            <div className="content">
                <div className="histoire" >
                    <hr className="noBorder" />
                    <p>
                        Parce que vous aussi vous avez une St(or)y à raconter
                    </p>
                    
                    <p>
                        Parce que vous aussi vous avez une histoire qui vaut la peine d'être lue
                    </p>
                    
                    <hr className="noBorder" />
                    
                    <div>
                        Créez votre story :
                        <div className="row">
                            <div className="col-xs-1">1.</div><div className="col-xs-11">Choisissez une photo en lien avec l’histoire que vous souhaitez partager !</div>
                            <div className="col-xs-1">2.</div><div className="col-xs-11">Ajouter à votre photo, l'anecdote que vous voulez raconter.</div>
                            <div className="col-xs-1">3.</div><div className="col-xs-11">Publiez ! </div>
                            <div className="col-xs-1">4.</div><div className="col-xs-11">À partir du 24 juin, vous aurez accès à l'ensemble des stories et pourrez liker les plus inspirantes !</div>
                        </div>
                    </div>
                    
                    <hr className="noBorder" />
                    
                    <p className="On-a-tous-une text-center" >
                        On a tous une belle histoire à écrire
                    </p>
                
                </div>

                <div>
                    <form id="form">
                        <input id="galleryUser" name="image" type="file" accept="image/*" onChange={this.changeHandler} />
                        <input id="captureUser" name="image" type="file" accept="image/*" capture="user" onChange={this.changeHandler}/>
                        <div className="bouton-img">
                            <input className="boutonPhoto" type="button" value="GALERIE" onClick={this.onClickHandler}/>
                            <input className="boutonPhoto" type="button" value="PHOTO"  onClick={this.onClickHandler} />
                        </div>
                    </form>
                </div>
            </div>
           )
        }
      
     } else {

        return  <Redirect to={'/'} />;
     }  

  }

}

export default Photo;
