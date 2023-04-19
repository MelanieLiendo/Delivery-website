import React from 'react'
import { useState } from 'react';
import Modal from 'react-modal'

function Orders() {

    let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () =>{
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  const closeModal=() => {
    setIsOpen(false);
  }



  return (
    <div>
      <button onClick={openModal}>Orders</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
      </Modal>
    </div>
  );
}

export default Orders