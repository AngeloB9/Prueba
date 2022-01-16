import { useState } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { Formik } from 'formik';
import Link from 'next/link';
import axios from 'axios';
import ModalError from '@/components/modals/modalError';
import router from 'next/router';

const sr2 = () => {
  return (
    <div className='vh-100 w-100 d-flex justify-content-center align-items-center'>
      <div className='border p-5'>
        <div className='text-center p-3'>
          <h3>Se ha enviado el correo</h3>
          <p className='fs-5'>
            Porfavor revisa tu bandeja de entrada<br></br> y sigue los pasos
            para recuperar tu contraseña
          </p>
        </div>

        <div className='d-flex justify-content-center'>
          <img src='/mail.svg' height={150} width={150} alt='email' />
        </div>

        <div className='w-100 mt-3 p-3'>
          <Link href='/recovery/sr1'>
            <div
              className='text-center text-info pe-auto'
              style={{ cursor: 'pointer' }}>
              <span>No recibiste el correo? Reenviar</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default sr2;
