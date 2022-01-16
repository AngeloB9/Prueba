import { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';
import Link from 'next/link';
import axios from 'axios';
import ModalError from '@/components/modals/modalError';
import router from 'next/router'
import Cookies from 'js-cookie'

const schema = yup.object().shape({
  correo: yup.string().email('Correo Inválido').required('Campo requerido'),
});

const sr1 = () => {
  const [show, setshow] = useState(false);

  const handleSubmit = async ({ correo }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APIURL}/auth/recovery`,
        {
          correo,
        }
      );
			if(response.status === 200){
        Cookies.set('recoveryT', response.data.token, {expires:0.006})
				router.push('/recovery/sr2')
			}
			else{
				setshow(true)
			}
    } catch (error) {
      setshow(true);
    }
  };

  return (
    <div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
      <div className='border p-5'>
        <div className='text-center p-3'>
          <h3>Recuperación de contraseña</h3>
          <p className='fs-5'>
            Ayudanos con tu correo para <br></br> recuperar la contraseña
          </p>
        </div>

        <div className='w-100 mt-3 p-3'>
          <Formik
            validationSchema={schema}
            onSubmit={(values, actions) => {
              handleSubmit(values);
            }}
            initialValues={{}}>
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form onSubmit={handleSubmit} onChange={handleChange}>
                <Row>
                  <Form.Group as={Col} sm='4' className='w-100'>
                    <Form.Label className='fs-5 fw-bold'>Correo:</Form.Label>
                    <Form.Control
                      name='correo'
                      type='text'
                      placeholder='correo'
                      isInvalid={errors.correo}
                    />
                    <Form.Control.Feedback type='invalid'>
                      {errors.correo}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button
                  className='d-block my-4 mx-auto w-100'
                  type='submit'
                  size='lg'>
                  Ingresar
                </Button>
              </Form>
            )}
          </Formik>
          <Link href='/login'>
            <div
              className='text-center text-info pe-auto'
              style={{ cursor: 'pointer' }}>
              <span>Regresar al Login</span>
            </div>
          </Link>
        </div>
      </div>
      <ModalError
        show={show}
        handleClose={() => {
          setshow(false);
        }}
        mensaje='El correo ingresado no es correcto'
        tituloMensaje='Error'
      />
    </div>
  );
};

export default sr1;
