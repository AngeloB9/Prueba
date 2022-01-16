import { Form, Col, Row, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object().shape({
  nombre: yup.string().required('Campo Requerido'),
  descripcion: yup.string().required('Campo Requerido'),
});

const CreateCategory = ({ handleSubmit, category }) => {
  return (
    <div className='p-4'>
      <h4 className='mb-3'>Nueva Categoria</h4>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
        }}
        initialValues={category}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit} onChange={handleChange}>
            <Row>
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
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  name='descripcion'
                  as='textarea'
                  rows={3}
                  placeholder='descripcion'
                  isInvalid={errors.descripcion}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.descripcion}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button
              className='d-block my-4 mx-auto'
              type='submit'
              size='lg'>
              Crear Categoría
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCategory;
