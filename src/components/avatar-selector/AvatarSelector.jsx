import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Avatar from 'react-avatar-edit';
import './AvatarSelector.css';

export default function AvatarSelector({showAvatarSelect, handleCrop, handleClose}) {
  const [src, setSrc] = useState(null);
  // const [preview, setPreview] = useState(null);

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showAvatarSelect} 
      onHide={() => handleClose()}>
      <Modal.Body>
        <Avatar onCrop={img => handleCrop(img)} onClose={() => handleClose()} width={300} height={300} src={src}/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleClose()}>Done</Button>
      </Modal.Footer>
    </Modal>
  );
}