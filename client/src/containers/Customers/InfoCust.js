import React from 'react'
import { useState } from 'react';
import Modal from 'react-modal'

function InfoCust() {

    let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () =>{
    setIsOpen(true);
  }

  const closeModal=() => {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Personal Information</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
    
      </Modal>
    </div>
  );
}

export default InfoCust