import { Modal, Col, Row, ListGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Cell from '@/components/commonStyles/tableCell';
import styled from 'styled-components';

const StyledCol = styled(Col)`
  border: solid 2px #055c9d;
`;

const InfoProveedor = ({ show, handleClose, proveedor }) => {
  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{proveedor.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Nombre:' info={proveedor.nombre} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Razón Social:' info={proveedor.razon_social} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Dirección:' info={proveedor.direccion} />
            </StyledCol>
          </Row>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Nombre de contacto:' info={proveedor.nombre_contacto} />
            </StyledCol>
            <StyledCol>
              <Cell labelName='Celular de contacto:' info={proveedor.celular_contacto} />
            </StyledCol>
            <StyledCol>
              <Cell labelName='Información adicional:' info={proveedor.informacion_adicional} />
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
