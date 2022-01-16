import { Modal, Col, Row, ListGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Cell from '@/components/commonStyles/tableCell';
import styled from 'styled-components';

const StyledCol = styled(Col)`
  border: solid 2px #055c9d;
`;

const InfoMedico = ({ show, handleClose, category }) => {
  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{category.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Cell labelName='Descripción:' info={category.descripcion} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoMedico;
