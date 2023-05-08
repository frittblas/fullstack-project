import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Avatar from 'react-avatar-edit';
import './AvatarSelector.css';

export default function AvatarSelector({showAvatarSelect, handleCrop, handleClose, handleCancel}) {
  const [src, setSrc] = useState(null);
  // const [preview, setPreview] = useState(null);

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showAvatarSelect} 
      onHide={() => handleClose()}>
      <Modal.Body>
        <Avatar onClose={() => {setSrc(null); handleCancel();}} onCrop={img => handleCrop(img)} width={300} height={300} src={src}/>
      </Modal.Body>
      <Modal.Footer>
      <Button className="rounded new-user-btn btn-light-green" variant='disabled' 
          onClick={() => {handleCancel(); handleClose();}}
        >
          Cancel
        </Button>
        <Button className="rounded new-user-btn btn-light-green" onClick={() => handleClose()}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
}