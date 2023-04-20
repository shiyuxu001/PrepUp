import React, { useState } from 'react';
import Modal from '../components/Modal'
import '../styles/Help.css';

function FloatingButton() {
  const [modalOpen, setModalOpen] = useState(false);

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

export default FloatingButton;