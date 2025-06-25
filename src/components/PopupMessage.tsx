import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {PopupMessageType} from '../types';

interface PopupMessageProps {
  onHandleClose: () => void;
  popupMessage: PopupMessageType;
}

function PopupMessage({ onHandleClose, popupMessage }: PopupMessageProps): JSX.Element | null {


  const handleClose = () => {
    onHandleClose();
  };

  return (
    <Modal
    show={popupMessage.isVisible}
    onHide={handleClose}
    backdrop="static"
    keyboard={false}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>{popupMessage.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    {popupMessage.body}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        OK
      </Button>
    </Modal.Footer>
  </Modal>
  );
  }

export default PopupMessage;