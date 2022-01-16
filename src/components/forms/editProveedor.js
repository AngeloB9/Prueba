import { Form, Col, Row, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object().shape({
  nombre: yup
    .string()
    .matches(/^.{1,12}$/, 'Máximo 12 caracteres')
    .required('Campo Requerido'),
  razon_social: yup
    .string()
    .matches(/^[0-9]{10,13}$/, 'Dígito entre 10 y 13 caracteres')
    .required('Campo requerido'),
  direccion: yup.string().required('Campo Requerido'),
  telefono: yup.number().required('Campo Requerido'),
  nombre_contacto: yup.string().required('Campo Requerido'),
  celular_contacto: yup.number().required('Campo Requerido'),
  informacion_adicional: yup.string().required('Campo Requerido'),
});

const EditProveedor = ({ handleSubmit, proveedor }) => {
  return (
    <div className='p-4'>
      <h4 className='mb-3'>Editar Proveedor</h4>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
        }}
        initialValues={{
          ...proveedor,
          nombre: proveedor.nombre.toString().trim(),
        }}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Row className='mb-sm-3'>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  name='nombre'
                  type='text'
                  value={values.nombre}
                  onChange={handleChange}
                  placeholder='nombre'
                  isInvalid={errors.nombre}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.nombre}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Razón Social/Cédula</Form.Label>
                <Form.Control
                  name='razon_social'
                  type='text'
                  value={values.razon_social}
                  onChange={handleChange}
                  placeholder='razón social'
                  isInvalid={errors.razon_social}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.razon_social}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Dirección:</Form.Label>
                <Form.Control
                  name='direccion'
                  type='text'
                  value={values.direccion}
                  onChange={handleChange}
                  placeholder='dirección'
                  isInvalid={errors.direccion}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.direccion}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-sm-3'>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Teléfono:</Form.Label>
                <Form.Control
                  name='telefono'
                  type='text'
                  value={values.telefono}
                  onChange={handleChange}
                  placeholder='teléfono'
                  isInvalid={errors.telefono}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.telefono}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Nombre de contacto:</Form.Label>
                <Form.Control
                  name='nombre_contacto'
                  type='text'
                  value={values.nombre_contacto}
                  onChange={handleChange}
                  placeholder='nombre de contacto'
                  isInvalid={errors.nombre_contacto}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.nombre_contacto}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Celular contacto:</Form.Label>
                <Form.Control
                  name='celular_contacto'
                  type='text'
                  value={values.celular_contacto}
                  onChange={handleChange}
                  placeholder='celular de contacto'
                  isInvalid={errors.celular_contacto}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.celular_contacto}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-sm-3'>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Información adicional:</Form.Label>
                <Form.Control
                  name='informacion_adicional'
                  type='text'
                  value={values.informacion_adicional}
                  onChange={handleChange}
                  placeholder='información adicional'
                  isInvalid={errors.informacion_adicional}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.informacion_adicional}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button className='d-block my-4 mx-auto' type='submit' size='lg'>
              Editar Proveedor
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProveedor;
