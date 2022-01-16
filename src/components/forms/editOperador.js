import { Form, Col, Row, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';

const schema = yup.object().shape({
  cedula: yup
    .string()
    .matches(/^.{1,10}$/, 'Máximo 10 caracteres')
    .required('Campo Requerido'),
  nombres: yup.string().required('Campo requerido'),
  apellidos: yup.string().required('Campo Requerido'),
  genero: yup.string().required('Campo Requerido'),
  fecha_nacimiento: yup.string().required('Campo Requerido'),
  nivel_instruccion: yup.string().required('Campo Requerido'),
  estado_civil: yup.string().required('Campo Requerido'),
  tipo_sangre: yup.string().required('Campo requerido'),
  direccion: yup.string().required('Campo requerido'),
  telefono: yup.string().required('Campo requerido'),
  correo_personal: yup
    .string()
    .email('Correo Inválido')
    .required('Campo requerido'),
  informacion_adicional: yup.string().required('Campo requerido'),
});

const EditOperador = ({ handleSubmit, operador }) => {
  return (
    <div className='p-4'>
      <h4 className='mb-3'>Editar Operador</h4>
      <Formik
        validationSchema={schema}
        onSubmit={(values, actions) => {
          handleSubmit(values);
        }}
        initialValues={{
          ...operador,
        }}>
        {({ handleSubmit, handleChange, values, errors }) => (
          <Form onSubmit={handleSubmit}>
            <Row className='mb-sm-3'>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Cédula:</Form.Label>
                <Form.Control
                  name='cedula'
                  type='text'
                  value={values.cedula}
                  onChange={handleChange}
                  placeholder='cedula'
                  isInvalid={errors.cedula}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.cedula}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  name='nombres'
                  type='text'
                  value={values.nombres}
                  onChange={handleChange}
                  placeholder='nombres'
                  isInvalid={errors.nombres}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.nombres}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Apellidos:</Form.Label>
                <Form.Control
                  name='apellidos'
                  type='text'
                  value={values.apellidos}
                  onChange={handleChange}
                  placeholder='apellidos'
                  isInvalid={errors.apellidos}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.apellidos}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-sm-3'>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Género:</Form.Label>
                <Form.Select
                  name='genero'
                  type='text'
                  value={values.genero}
                  onChange={handleChange}
                  placeholder='genero'
                  isInvalid={errors.genero}>
                  <option value='Masculino'>Masculino</option>
                  <option value='Femenino'>Femenino</option>
                </Form.Select>

                <Form.Control.Feedback type='invalid'>
                  {errors.genero}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Fecha de Nacimiento:</Form.Label>
                <Form.Control
                  name='fecha_nacimiento'
                  type='date'
                  value={values.fecha_nacimiento.split('T')[0]}
                  onChange={handleChange}
                  min='1921-01-01'
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Nivel de instrucción:</Form.Label>
                <Form.Select
                  name='nivel_instruccion'
                  type='text'
                  value={values.nivel_instruccion}
                  onChange={handleChange}
                  isInvalid={errors.nivel_instruccion}>
                  <option value='ninguno'>Ninguno</option>
                  <option value='primaria'>Primaria</option>
                  <option value='secundaria'>Secundaria</option>
                  <option value='superior'>Superior</option>
                  <option value='postgrado'>Postgrado</option>
                  <option value='masterado'>Masterado</option>
                </Form.Select>

                <Form.Control.Feedback type='invalid'>
                  {errors.nivel_instruccion}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className='mb-sm-3'>
              <Form.Group as={Col} sm='4'>
                <Form.Label>Estado civil:</Form.Label>
                <Form.Select
                  name='estado_civil'
                  type='text'
                  value={values.estado_civil}
                  onChange={handleChange}
                  isInvalid={errors.estado_civil}>
                  <option value='casado/a'>Casado/a</option>
                  <option value='divorciado/a'>Divorciado/a</option>
                  <option value='soltero/a'>Soltero/a</option>
                  <option value='union de echo'>Unión de hecho</option>
                  <option value='viudo/a'>Viudo/a</option>
                </Form.Select>

                <Form.Control.Feedback type='invalid'>
                  {errors.estado_civil}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Tipo de sangre:</Form.Label>
                <Form.Select
                  name='tipo_sangre'
                  type='text'
                  value={values.tipo_sangre}
                  onChange={handleChange}
                  isInvalid={errors.tipo_sangre}>
                  <option value='A+'>A+</option>
                  <option value='B+'>B+</option>
                  <option value='O+'>O+</option>
                  <option value='AB+'>AB+</option>
                  <option value='A-'>A-</option>
                  <option value='O-'>O-</option>
                  <option value='B-'>B-</option>
                  <option value='AB-'>AB-</option>
                </Form.Select>

                <Form.Control.Feedback type='invalid'>
                  {errors.tipo_sangre}
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
                  {errors.cedula}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Correo Personal</Form.Label>
                <Form.Control
                  name='correo_personal'
                  type='text'
                  value={values.correo_personal}
                  onChange={handleChange}
                  placeholder='correo personal'
                  isInvalid={errors.correo_personal}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.correo_personal}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} sm='4'>
                <Form.Label>Información Adicional:</Form.Label>
                <Form.Control
                  name='informacion_adicional'
                  as='textarea'
                  value={values.informacion_adicional}
                  onChange={handleChange}
                  rows={3}
                  placeholder='informacion_adicional'
                  isInvalid={errors.informacion_adicional}
                />
                <Form.Control.Feedback type='invalid'>
                  {errors.informacion_adicional}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Button className='d-block my-4 mx-auto' type='submit' size='lg'>
              Editar Operador
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditOperador;
