import React from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import axios from 'axios';
import {URL} from '../../config'

function AddCategory() {
    const [openClose, setOpenClose]= useState('')
    const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () =>{
    setIsOpen(true);
    setOpenClose("open")
  }

  const closeModal=() => {
    setIsOpen(false);
    setOpenClose("close")
  }

  return (
    <div>
      <button onClick={openModal}>Add a dish</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal">

    <button onClick={closeModal}>Close</button>
    </Modal>
    </div>
  )
}

export default AddCategory