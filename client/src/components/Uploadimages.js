import React, { useEffect, useState } from "react";
import axios from "axios";
import widgetStyle from "../Styles/widgetStyle";
import { URL } from "../config";



const UploadImages = ({rest, infoMenu, setImageLink, setImageLinkRest, changeDetails, picReference}) => {


  const uploadWidget = () => {

    // remember to add your credentials to the .env file
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_UPLOAD_PRESET,
        tags: ["user"],
        stylesheet: widgetStyle,
      },
      (error, result) => {
        if (error) {
         
          console.log(error);
        } else if ( result.event === "queues-end" && picReference == "dish") {
         upload_picture(result);
        } else if (result.event === "queues-end" && picReference == "restaurant"){
          upload_picture_rest(result);
        }
      }
    );
  };


  const upload_picture = async (result) => {
    try {
      const response = await axios.post(`${URL}/pictures/upload`, {
        files: result.info.files,
        restaurant_id: rest.id ,
        menu_id: infoMenu.id,
       });
      
      if (response.data.ok){
        setImageLink(result.info.files[0].name) 
        try { 
          
          const resp = await axios.post(`${URL}/menu/update`, {   
           email: rest.email, 
           name: infoMenu.name,        
           newPicture: response.data.created[0].photo_url,
             })
         }catch (error) {
           console.log(error);
         }
      } else {
        alert("Something went wrong"); 
      }  
        
    } catch (error) {
      console.log(error);
    }
  }; 

  const upload_picture_rest = async (result) => {
    try {
      const response = await axios.post(`${URL}/pictures/upload`, {
        files: result.info.files,
        restaurant_id: rest.id ,
       });
      
      if (response.data.ok){
        setImageLinkRest(result.info.files[0].name) 
        try { 
          
          const resp = await axios.post(`${URL}/restaurant/update`, {   
           email: rest.email, 
           name: infoMenu.name,        
           newPicture: response.data.created[0].photo_url,
             })
         }catch (error) {
           console.log(error);
         }
      } else {
        alert("Something went wrong"); 
      }  
        
    } catch (error) {
      console.log(error);
    }
  }; 

  return (
    <div className="flex_upload">
      <div className="upload">
        <button className="button" onClick={uploadWidget} disabled={!changeDetails}>
          Open widget
        </button>
      </div>
      {/* button PUBLISH POST on click take data from state and send to server on the body -- function*/}
    </div>
  );
};

export default UploadImages;   