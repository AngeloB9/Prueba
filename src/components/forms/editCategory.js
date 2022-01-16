import { Form, Col, Row, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object().shape({
  nombre: yup.string().required(),
  descripcion: yup.string().required(),
});

const EditCategories = ({ handleSubmit, category }) => {
  return (
    <div className='p-4'>
      <h4 className='mb-3'>Editar Categoría</h4>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
        }}
        initialValues={{
          ...category,
          nombre: category.nombre.toString().trim(),
        }}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
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
                <Form.Label>Descripción:</Form.Label>
                <Form.Control
                  name='descripcion'
                  type='text'
                  value={values.descripcion}
                  onChange={handleChange}
                  placeholder='descripcion'
                  isInvalid={errors.descripcion}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.descripcion}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button className='d-block my-4 mx-auto' type='submit' size='lg'>
              Editar Categoria
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCategories;
