import { Modal, Button } from 'react-bootstrap';

const CancelEditSongModal = ({ show, handleClose, handleCancel }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Cancel</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you don't want to edit this song</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Go Back
        </Button>
        <Button variant="danger" onClick={handleCancel}>
          Don't Edit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CancelEditSongModal;
