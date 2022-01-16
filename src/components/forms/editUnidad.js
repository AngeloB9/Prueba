import { Form, Col, Row, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object().shape({
  unidad: yup.string().required('Campo Requerido'),
  abreviatura: yup.string().required('Campo Requerido'),
  magnitud: yup.string().required('Campo Requerido'),
});

const EditUnidad = ({ handleSubmit, unidad }) => {
  return (
    <div className='p-4'>
      <h4 className='mb-3'>Editar Unidad</h4>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
        }}
        initialValues={{
          ...unidad,
          magnitud: unidad.magnitud,
        }}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Unidad:</Form.Label>
                <Form.Control
                  name='unidad'
                  type='text'
                  value={values.unidad}
                  onChange={handleChange}
                  placeholder='unidad'
                  isInvalid={errors.unidad}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.unidad}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Abreviatura:</Form.Label>
                <Form.Control
                  name='abreviatura'
                  type='text'
                  value={values.abreviatura}
                  onChange={handleChange}
                  placeholder='abreviatura'
                  isInvalid={errors.abreviatura}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.abreviatura}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Magnitud:</Form.Label>
                <Form.Select
                  name='magnitud'
                  value={values.magnitud}
                  onChange={handleChange}
                  placeholder='magnitud'
                  isInvalid={errors.magnitud}>
                  <option value='Longitud'>Longitud</option>
                  <option value='Masa'>Masa</option>
                  <option value='Corriente Electrica'>
                    Corriente Eléctrica
                  </option>
                  <option value='Temperatura'>Temperatura</option>
                  <option value='Intensidad Luminosa'>
                    Intensidad Luminosa
                  </option>
                  <option value='Cantidad de Sustancia'>
                    Cantidad de Sustancia
                  </option>
                  <option value='No aplica'>No aplica</option>
                </Form.Select>

                <Form.Control.Feedback type='invalid'>
                  {errors.magnitud}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button className='d-block my-4 mx-auto' type='submit' size='lg'>
              Editar Unidad
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditUnidad;
