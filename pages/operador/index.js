import { useState } from 'react';
import { LinearProgress } from '@material-ui/core';
//Auth
import ModalSuccess from '@/components/modals/modalSuccess';
import ModalError from '@/components/modals/modalError';
import AdminLayout from '@/components/layouts/adminLayout';
import withSession from '@/helpers/session';
import axios from '@/helpers/axios-helper';
import CreateOperador from '@/components/forms/createOperador';

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
  //-----Variables de estado de la página-----//
  const [error, seterror] = useState(null); //si existe un error se setea la variable
  const [loading, setloading] = useState(false);
  const [operador, setoperador] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    genero: 'Masculino',
    fecha_nacimiento: '',
    nivel_instruccion: 'Ninguno',
    estado_civil: 'Casado/a',
    tipo_sangre: 'A+',
    direccion: '',
    telefono: '',
    correo_personal: '',
    informacion_adicional: '',
  });
  const [modalSuccess, setmodalSuccess] = useState(false); //modal de éxito
  const [modalError, setmodalError] = useState(false); //modal de error

  const handleSubmit = async (values) => {
    setloading(true);
    try {
      const response = await axios(user.token).post('/operadores', values);
      if (response.status === 201) {
        setmodalSuccess(true);
      }
      setloading(false);
    } catch (error_peticion) {
      seterror(error_peticion);
      setmodalError(true);
      setloading(false);
    }
  };

  return (
    <AdminLayout user={user}>
      {loading && <LinearProgress />}
      <CreateOperador handleSubmit={handleSubmit} operador={operador} />
      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Creación Exitosa'
        mensaje='El operador se ha creado satisfactoriamente!'
        redireccion='/operadores'
      />
      {/*----------Modal de error en petición------- */}
      <ModalError
        show={modalError}
        handleClose={() => setmodalError(false)}
        tituloMensaje='Error'
        mensaje='Revise que los datos ingresados sean correctos!'
      />
    </AdminLayout>
  );
};

export default index;
