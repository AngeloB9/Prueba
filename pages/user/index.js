import { useState, useMemo } from 'react';
import { LinearProgress } from '@material-ui/core';
import generator from 'generate-password';
//
import AdminLayout from '@/components/layouts/adminLayout';

import withSession from '@/helpers/session';
import CrearUsuario from '@/components/forms/createUser';
import axios from '@/helpers/axios-helper';
import ModalSuccess from '@/components/modals/modalSuccess';
import ModalError from '@/components/modals/modalError';

export const getServerSideProps = withSession(async ({ req, res }) => {
  //Revisa si el usuario esta seteado antes de hacer la petición
  const user = req.session.get('user');

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  //Comprueba que el usuario sea administrador caso contrario lo redirecciona
  if (user.rol != 'ADMIN_ROLE')
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return {
    props: {
      user,
    },
  };
});

const index = ({ user }) => {
  const [loading, setloading] = useState(false);
  const [errorMsg, seterrorMsg] = useState(
    'Revise que los datos ingresados sean correctos!'
  );
  const [modalSuccess, setmodalSuccess] = useState(false); //modal de éxito
  const [modalError, setmodalError] = useState(false); //modal de error
  const [randompassword, setrandompassword] = useState('');

  const generateRandomPassword = () => {
    setrandompassword(
      generator.generate({
        length: 10,
        numbers: true,
      })
    );
  };

  const handleSubmit = async (values) => {
    setloading(true);
    try {
      const response = await axios(user.token).post('/usuarios', {
        ...values,
        password: randompassword,
      });
      response.status === 200 ? setmodalSuccess(true) : setmodalError(true);
      setloading(false);
    } catch (error_peticion) {
      seterrorMsg(error_peticion.response.data.errors[0].msg ?? errorMsg);
      setmodalError(true);
      setloading(false);
    }
  };

  return (
    <AdminLayout user={user}>
      {loading && <LinearProgress />}
      <CrearUsuario
        handleSubmit={handleSubmit}
        generateRandomPassword={generateRandomPassword}
        randompassword={randompassword}
        handlePasswordChange={(event) => {
          setrandompassword(event.target.value);
        }}
        user={user}
      />
      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Creación Exitosa'
        mensaje='El usuario se ha ingresado satisfactoriamente!'
        redireccion='/users'
      />
      {/*----------Modal de error en petición------- */}
      <ModalError
        show={modalError}
        handleClose={() => setmodalError(false)}
        tituloMensaje='Error'
        mensaje={errorMsg}
      />
    </AdminLayout>
  );
};

export default index;
