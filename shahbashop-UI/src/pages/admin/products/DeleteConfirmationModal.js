import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteConfirmationModal = (props
) => {
  const {
    buttonLabel,
    className,
    submit
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const DeleteProduct = () =>{
    submit();
    toggle();
  }

  return (
    <div>
      <Button color="danger" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Delete Product</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this Product?
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={toggle}>Cancel</Button>
          <Button color="danger" onClick={DeleteProduct}>Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteConfirmationModal;