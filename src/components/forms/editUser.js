import { useState, useRef } from 'react';
import { Form, Col, Row, Overlay, Tooltip, Button } from 'react-bootstrap';
import { LinearProgress } from '@material-ui/core';
//
import * as yup from 'yup';
import { Formik } from 'formik';
import axios from '@/helpers/axios-helper';

const schema = yup.object().shape({
  nombre: yup.string().required(),
  correo: yup.string().email('Correo inválido').required(),
  rol: yup.string().required(),
  estado: yup.bool().required(),
});

const EditarUsuario = ({
  handleSubmit,
  usuario,
  generateRandomPassword,
  randompassword,
  handlePasswordChange,
}) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <div className='p-4'>
      <h4 className='mb-3'>Editar Usuario</h4>
      <Formik
        validationSchema={schema}
        onSubmit={async (values, actions) => {
          handleSubmit(values);
        }}
        initialValues={usuario}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} sm='4' controlId='userCreateNombreId'>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  name='nombre'
                  type='text'
                  value={values.nombre}
                  onChange={handleChange}
                  placeholder='nombre completo'
                  isInvalid={errors.nombre}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.nombre}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4' controlId='userCreateCorreoId'>
                <Form.Label>Correo:</Form.Label>
                <Form.Control
                  name='correo'
                  type='text'
                  value={values.correo}
                  onChange={handleChange}
                  placeholder='correo'
                  isInvalid={!!errors.correo}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.correo}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4' controlId='userCreateTipoUsuarioId'>
                <Form.Label>Tipo de Usuario</Form.Label>
                <Form.Select
                  as='select'
                  name='rol'
                  value={values.rol}
                  onChange={handleChange}>
                  <option value='ADMIN_ROLE'>Administrador</option>
                  <option value='USER_ROLE'>Usuario Común</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} sm='4' controlId='userCreateEstadoId'>
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name='estado'
                  value={values.estado}
                  onChange={handleChange}>
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} sm='4' controlId='userCreatePasswordId'>
                <Form.Label>Contraseña:</Form.Label>
                <div className='d-flex'>
                  <Form.Control
                    type='text'
                    autoComplete='current-password'
                    value={randompassword}
                    onChange={handlePasswordChange}
                    placeholder='contraseña'
                  />

                  <Button
                    ref={target}
                    onClick={() => {
                      generateRandomPassword();
                      setShow(true);
                      setTimeout(() => {
                        setShow(false);
                      }, 1300);
                    }}>
                    <i className='fas fa-key' />
                  </Button>
                </div>
              </Form.Group>
            </Row>

            <Button className='d-block mt-5 mx-auto' type='submit' size='lg'>
              Editar Usuario
            </Button>
          </Form>
        )}
      </Formik>
      <Overlay target={target.current} show={show} placement='top'>
        {(props) => (
          <Tooltip id='overlay' {...props}>
            LLave generada
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
};

export default EditarUsuario;
