import React, { useState } from 'react';
import Modal from '../components/Modal'
import '../styles/Help.css';

function Help() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
    console.log("pressed open modal")
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className='parent-container'>
       <div className='help-button-container'>
           <button className="floating-button" onClick={() => {setModalOpen(true)}}>
            ?
           </button> 
        </div>
      {modalOpen && <Modal closeModal={setModalOpen}/>}
    </div>
  );
}

export default Help;