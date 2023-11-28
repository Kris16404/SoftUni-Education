import { useState } from 'react';
import { Toast } from 'react-bootstrap';

import './emailExistsNotifications.css';

const EmailExistsNotification = ({ userEmail }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <Toast show={show} onClose={handleClose} className="ToastContainer">
      <Toast.Header>
        <strong className="me-auto">Notification</strong>
      </Toast.Header>
      <Toast.Body>
        The user with email <strong>{userEmail}</strong> already exists.
      </Toast.Body>
    </Toast>
  );
};

export default EmailExistsNotification;
