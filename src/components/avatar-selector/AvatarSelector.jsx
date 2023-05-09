import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import FormRange from 'react-bootstrap/FormRange';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AvatarEditor from 'react-avatar-editor';
import './AvatarSelector.css';

export default function AvatarSelector({showAvatarSelect, handleCrop, handleClose, handleCancel}) {
  const [scale, setScale] = useState(1.2);
  const [rawImg, setRawImg] = useState("");

console.log(rawImg);

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showAvatarSelect} 
      onHide={() => handleClose()}>
      <Modal.Body>
      <AvatarEditor
        image={rawImg}
        borderRadius={1000}
        width={250}
        height={250}
        border={50}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={scale}
        rotate={0}
      />
      </Modal.Body>
      <Modal.Footer>
        <Form.Group>
          <Form.Label>Scale</Form.Label>
          <Form.Range min={0.6} max={10} value={scale} step={0.2} onChange={(e) => setScale(Number(e.target.value))}/>
        </Form.Group>
        <Form.Group>
          <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={e => setRawImg(e.target.files[0])} />
        </Form.Group>
        <br/>
        <Button className="rounded new-user-btn btn-light-green" onClick={() => handleClose()}>Confirm</Button>
        <Button className="rounded new-user-btn btn-light-green" variant='disabled' 
          onClick={() => {handleCancel(); handleClose();}}
        >
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}