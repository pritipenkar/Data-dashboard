import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalDetails = ({ isOpen, onRequestClose, item }) => {
  return (
    <Modal show={isOpen} onHide={onRequestClose} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title>Product Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {item ? (
          <>
            <p>
              <strong>Name:</strong> {item.name}
            </p>
            <p>
              <strong>Engagement:</strong>{" "}
              {item.likes + item.shares + item.comments}
            </p>
            <p>
              <strong>Reach:</strong>{" "}
              {(item.followers * (item.likes + item.shares)) / 100}
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetails;
