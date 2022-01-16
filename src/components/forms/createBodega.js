import { Form, Col, Row, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object().shape({
  nombre: yup
    .string()
    .matches(/^.{1,40}$/, 'Máximo 40 caracteres')
    .required('Campo Requerido'),
  dimensiones: yup
    .string()
    .matches(/^.{1,80}$/, 'Máximo 80 caracteres')
    .required('Campo requerido'),
  ubicacion: yup
    .string()
    .matches(/^.{1,150}$/, 'Máximo 150 caracteres')
    .required('Campo requerido'),
  datos_adicionales: yup
    .string()
    .matches(/^.{1,200}$/, 'Máximo 200 caracteres')
    .required('Campo requerido'),
});

const CreateBodega = ({ handleSubmit, bodega }) => {
  return (
    <div className='p-4'>
      <h4 className='mb-3'>Nueva Bodega</h4>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
        }}
        initialValues={bodega}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit} onChange={handleChange}>
            <Row className='mb-sm-3'>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  name='nombre'
                  type='text'
                  placeholder='nombre'
                  isInvalid={errors.nombre}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.nombre}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Dimensiones:</Form.Label>
                <Form.Control
                  name='dimensiones'
                  type='text'
                  placeholder='dimensiones'
                  isInvalid={errors.dimensiones}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.dimensiones}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Ubicación:</Form.Label>
                <Form.Control
                  name='ubicacion'
                  type='text'
                  placeholder='ubicación'
                  isInvalid={errors.ubicacion}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.ubicacion}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-sm-3'>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Datos adicionales:</Form.Label>
                <Form.Control
                  name='datos_adicionales'
                  type='text'
                  placeholder='datos adicionales'
                  isInvalid={errors.datos_adicionales}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.datos_adicionales}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button className='d-block my-4 mx-auto' type='submit' size='lg'>
              Crear Bodega
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateBodega;
