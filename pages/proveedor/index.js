import { useState } from 'react';
import { LinearProgress } from '@material-ui/core';
//Auth
import ModalSuccess from '@/components/modals/modalSuccess';
import ModalError from '@/components/modals/modalError';
import AdminLayout from '@/components/layouts/adminLayout';
import withSession from '@/helpers/session';
import axios from '@/helpers/axios-helper';
import CreateProveedor from '@/components/forms/createProveedor';

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
  const [proveedor, setproveedor] = useState({
    nombre: '',
    razon_social: '',
    direccion:'',
    telefono:'',
    nombre_contacto:'',
    celular_contacto:'',
    inforacion_adicional:'',
  });
  const [modalSuccess, setmodalSuccess] = useState(false); //modal de éxito
  const [modalError, setmodalError] = useState(false); //modal de error

  const handleSubmit = async (values) => {
    setloading(true);
    try {
      const response = await axios(user.token).post('/proveedores', values);
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
      <CreateProveedor handleSubmit={handleSubmit} proveedor={proveedor} />
      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Creación Exitosa'
        mensaje='El proveedor se ha creado satisfactoriamente!'
        redireccion='/proveedores'
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
