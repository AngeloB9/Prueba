import { Modal, Col, Row } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Cell from '@/components/commonStyles/tableCell';
import styled from 'styled-components';

const StyledCol = styled(Col)`
  border: solid 2px #055c9d;
`;

const InfoOperador = ({ show, handleClose, operador }) => {
  return (
    <Modal show={show} onHide={handleClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{operador.nombres}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Col>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Cédula:' info={operador.cedula} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Nombres:' info={operador.nombres} />
            </StyledCol>
            <StyledCol sm='4'>
              <Cell labelName='Apellidos:' info={operador.apellidos} />
            </StyledCol>
          </Row>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Género:' info={operador.genero} />
            </StyledCol>
            <StyledCol>
              <Cell
                labelName='Fecha de nacimiento:'
                info={operador.fecha_nacimiento.split('T')[0]}
              />
            </StyledCol>
            <StyledCol>
              <Cell
                labelName='Nivel de instrucción:'
                info={operador.nivel_instruccion}
              />
            </StyledCol>
          </Row>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Estado civil:' info={operador.estado_civil} />
            </StyledCol>
            <StyledCol>
              <Cell labelName='Tipo de sangre:' info={operador.tipo_sangre} />
            </StyledCol>
            <StyledCol>
              <Cell labelName='Dirección:' info={operador.direccion} />
            </StyledCol>
          </Row>
          <Row>
            <StyledCol sm='4'>
              <Cell labelName='Télefono:' info={operador.telefono} />
            </StyledCol>
            <StyledCol>
              <Cell labelName='Correo personal:' info={operador.correo_personal} />
            </StyledCol>
            <StyledCol>
              <Cell labelName='Información Adicional:' info={operador.informacion_adicional} />
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

export default InfoOperador;
