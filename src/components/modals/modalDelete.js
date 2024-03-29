import { Modal, Button } from 'react-bootstrap';

const index = ({ show, handleClose, titulo, mensaje, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{titulo}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{mensaje}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant='danger' onClick={handleDelete}>
          Eliminar <i className='fas fa-trash-alt' />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default index;
