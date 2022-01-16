import { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';
import Link from 'next/link';
import axios from 'axios';
import ModalError from '@/components/modals/modalError';
import router from 'next/router';
import Cookies from 'js-cookie';
import ModalSuccess from '@/components/modals/modalSuccess';

const schema = yup.object().shape({
  password: yup.string().required('Campo requerido'),
});

const sr1 = () => {
  const [show, setshow] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const [showTokenError, setshowTokenError] = useState(false);
  const [tokenMsg, settokenMsg] = useState(
    'Lo sentimos la sesión expiró. Intente de nuevo'
  );
  const [showSuccess, setshowSuccess] = useState(false);

  const handleSubmit = async ({ password }) => {
    try {
      const cookieValue = Cookies.get('recoveryT');
      if (cookieValue) {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_APIURL}/usuarios`,
          {
            password,
            token: cookieValue,
          }
        );
        console.log('respuesta', response);
        if (response.status === 200) {
          setshowSuccess(true);
        } else {
          setshow(true);
        }
      } else {
        setshow(true);
        setshowTokenError(true);
      }
    } catch (error) {
      setshow(error);
    }
  };

  return (
    <div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
      <div className='border p-5'>
        <div className='text-center p-3'>
          <h3>Nueva contraseña</h3>
          <p className='fs-5'>
            Ingresa una nueva contraseña<br></br> para tu cuenta
          </p>
        </div>
        <div className='d-flex justify-content-center'>
          <img src='/key.png' height={150} width={150} alt='email' />
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
                    <Form.Label className='fs-5 fw-bold'>
                      Nueva Contraseña:
                    </Form.Label>
                    <div className='d-flex'>
                      <Form.Control
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='contraseña'
                        isInvalid={errors.password}
                      />
                      <div
                        className='d-flex align-items-center justify-content-center p-1'
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          setshowPassword(!showPassword);
                        }}>
                        <i className='far fa-eye'></i>
                      </div>
                    </div>
                    <Form.Control.Feedback type='invalid'>
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Button
                  className='d-block my-4 mx-auto w-100'
                  type='submit'
                  size='lg'>
                  Cambiar contraseña
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
          setshowTokenError(false);
					router.push('/recovery/sr1')
        }}
        mensaje={
          showTokenError ? tokenMsg : 'Error. Contacte con el administrador.'
        }
        tituloMensaje='Error'
      />
      <ModalSuccess
        handleClose={() => {
          setshowPassword(false);
        }}
        mensaje='Su contraseña a sido cambiada'
        tituloMensaje='Contraseña restaurada'
        redireccion='/login'
        show={showSuccess}
      />
    </div>
  );
};

export default sr1;
