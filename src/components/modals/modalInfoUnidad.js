import { Modal, Col, Row, ListGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Cell from '@/components/commonStyles/tableCell';
import styled from 'styled-components';

const StyledCol = styled(Col)`
  border: solid 2px #055c9d;
`;

const InfoProveedor = ({ show, handleClose, unidad }) => {
  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{unidad.unidad}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Nombre:' info={unidad.unidad} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Abreviatura:' info={unidad.abreviatura} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Magnitud:' info={unidad.magnitud} />
            </StyledCol>
          </Row>
        </Col>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InfoProveedor;
