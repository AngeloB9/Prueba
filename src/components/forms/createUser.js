import { useState, useRef } from 'react';
import { Form, Col, Overlay, Tooltip, Button, Row } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object().shape({
  nombre: yup.string().required(),
  correo: yup.string().email('Correo inválido').required('Campo requerido'),
  estado: yup.string().required(),
  rol: yup.string().required(),
});

const index = ({
  handleSubmit,
  randompassword,
  generateRandomPassword,
  handlePasswordChange,
}) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <div className='p-4'>
      <h4 className='mb-3'>Nuevo Usuario</h4>
      <Formik
        validationSchema={schema}
        onSubmit={async (values, actions) => {
          handleSubmit(values);
        }}
        initialValues={{
          nombre: '',
          correo: '',
          estado: true,
          rol: 'USER_ROLE',
        }}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit} onChange={handleChange}>
            <Row>
              <Form.Group as={Col} sm='4' controlId='userCreateNombreId'>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  name='nombre'
                  type='text'
                  placeholder='nombre completo'
                  isInvalid={!!errors.nombre}
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
                  placeholder='correo'
                  isInvalid={!!errors.correo}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.correo}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4' controlId='userCreateTipoUsuarioId'>
                <Form.Label>Tipo de Usuario</Form.Label>
                <Form.Select as='select' name='rol'>
                  <option value='ADMIN_ROLE'>Administrador</option>
                  <option value='USER_ROLE'>Usuario Común</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} sm='4' controlId='userCreateEstadoId'>
                <Form.Label>Estado</Form.Label>
                <Form.Select as='select' name='estado' disabled>
                  <option value={true}>Activo</option>
                  <option value={false}>Inactivo</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} sm='4' controlId='userCreatePasswordId'>
                <Form.Label>Contraseña:</Form.Label>
                <div className='d-flex'>
                  <Form.Control
                    name='password'
                    type='text'
                    autoComplete='current-password'
                    value={randompassword}
                    onChange={handlePasswordChange}
                    placeholder='contraseña'
                    required
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
              Crear Usuario
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

export default index;
