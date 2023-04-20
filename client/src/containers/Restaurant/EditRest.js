// import React, { useState, useEffect } from 'react'
// import Modal from 'react-modal'
// import axios from 'axios';
// import {URL} from '../../config'

// function EditRest({user}) {
//     const [newData,setNewData]= useState({
//         country:"", 
//         city: "", 
//         address: "", 
//         restaurant: "", 
//         name:"", 
//         surname:"",
//         phone:"", 
//         filter:""})

//     const [message,setMessage]= useState('')
//     const [openClose, setOpenClose]= useState('')

//   const [modalIsOpen, setIsOpen] = useState(false);

//   const openModal = () =>{
//     setIsOpen(true);
//     setOpenClose('open')
//   }

//   const closeModal=() => {
//     setIsOpen(false);
//     setOpenClose('close')
//   }

// const handleChange = (e) => {setNewData({...newData,[e.target.name]:e.target.value})}

// const handleSubmit = async (e) => {
//         e.preventDefault()
//          try{
//              const response = await axios.post(`${URL}/restaurant/update`, {
//                  newCountry:newData.country, 
//                  newCity:newData.city, 
//                  newAddress:newData.address, 
//                  newRestaurant:newData.restaurant, 
//                  newName:newData.name, 
//                  newSurname:newData.surname,
//                  newPhone:newData.phone, 
//                  email:user.userEmail, 
//                  newFilter:newData.filter})

//              setMessage(response.data.message)}

//          catch(error){
//              console.log(error);
//          }}

//          useEffect(()=>{
//           setMessage('');
//           },[openClose, newData])


//   return (
//     <div>
//       <button onClick={openModal}>Edit</button>
//       <Modal
//         isOpen={modalIsOpen}
//         onRequestClose={closeModal}
//         contentLabel="Example Modal">

//         <button onClick={closeModal}>Close</button>

//         <form onSubmit={handleSubmit} onChange={handleChange}>
//             <label>Country</label><input id='country' />
//             <label>City</label><input name='city' />
//             <label>Address</label><input name='address'/>
//             <label>Restaurant Name</label><input name='restaurant'/>
//             <label>Name</label><input name='name'/>
//             <label>Surname</label><input name='surname'/>
//             <label>Phone</label><input name='phone'/>
//             <label>Filter</label><input name='filter'/>
//        <button>Change</button>
//        </form>
//        <h3>{message}</h3>
//       </Modal>
//     </div>
//   );
// }

// export default EditRest