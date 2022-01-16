import { Modal, Col, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Cell from '@/components/commonStyles/tableCell';
import styled from 'styled-components';

const StyledCol = styled(Col)`
  border: solid 2px #055c9d;
`;

const InfoBodega = ({ show, handleClose, bodega }) => {
  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{bodega.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Nombre:' info={bodega.nombre} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Dimensiones:' info={bodega.dimensiones} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Ubicación:' info={bodega.ubicacion} />
            </StyledCol>
          </Row>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Datos adicionales:' info={bodega.datos_adicionales} />
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

export default InfoBodega;
