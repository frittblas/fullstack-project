import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-bootstrap/Form';
import FormRange from 'react-bootstrap/FormRange';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AvatarEditor from 'react-avatar-editor';
import './AvatarSelector.css';

export default function AvatarSelector({showAvatarSelect, handleCrop, handleClose, handleCancel}) {
  const editor = useRef(null);
  const [scale, setScale] = useState(1.2);
  const [rawImg, setRawImg] = useState("");

  const cropHandler = () => {
    const croppedBlob = editor.current.getImage().toDataURL();
    handleCrop(croppedBlob);
    handleClose();
  }

  return (
    <Modal aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showAvatarSelect} 
      onHide={() => handleClose()}>
      <Modal.Body>
      <AvatarEditor className="w-100 h-auto"
        ref={editor}
        image={rawImg}
        borderRadius={1000}
        border={50}
        color={[255, 255, 255, 0.6]}
        scale={scale}
        rotate={0}
      />
      </Modal.Body>
      <Modal.Footer>
        <Form.Group className="w-100">
          <Form.Label>Scale</Form.Label>
          <Form.Range min={0.6} max={10} value={scale} step={0.2} onChange={(e) => setScale(Number(e.target.value))}/>
        </Form.Group>
        <Form.Group className="mb-3 w-100">
          <Form.Control type="file" accept="image/png, image/jpeg, image/jpg" onChange={e => setRawImg(e.target.files[0])} />
        </Form.Group>
        <br/>
        <Button className="rounded new-user-btn btn-light-green" onClick={() => cropHandler(rawImg)}>Confirm</Button>
        <Button className="rounded" variant='secondary' 
          onClick={() => {setRawImg(""); setScale(1.2); handleCancel(); handleClose();}}
        >
          Clear
        </Button>
      </Modal.Footer>
    </Modal>
  );
}