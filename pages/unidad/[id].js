import { useState } from 'react';
import { LinearProgress } from '@material-ui/core';
//
import AdminLayout from '@/components/layouts/adminLayout';
import withSession from '@/helpers/session';
import EditUnidad from '@/components/forms/editUnidad';
import axios from '@/helpers/axios-helper';
import ModalSuccess from '@/components/modals/modalSuccess';
import ModalError from '@/components/modals/modalError';

export const getServerSideProps = withSession(
  async ({ query: { id }, req, res }) => {
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

    const { data: unidadEdit } = await axios(user.token).get(
      `/unidades/${id}`
    );

    if (!unidadEdit)
      return {
        notFound: true,
      };

    return {
      props: {
        user,
        unidadEdit,
        id,
      },
    };
  }
);

const index = ({ user, unidadEdit, id }) => {
  const [loading, setloading] = useState(false);
  const [errorMsg, seterrorMsg] = useState(
    'Revise que los datos ingresados sean correctos!'
  );
  const [modalSuccess, setmodalSuccess] = useState(false); //modal de éxito
  const [modalError, setmodalError] = useState(false); //modal de error

  const handleSubmit = async (values) => {
    setloading(true);
    try {
      const response = await axios(user.token).put(`/unidades/${id}`, values);
      response.status === 200 ? setmodalSuccess(true) : setmodalError(true);
      setloading(false);
      setmodalSuccess(true);
    } catch (error_peticion) {
      seterrorMsg(error_peticion.response.data.msg ?? errorMsg);
      setmodalError(true);
      setloading(false);
    }
  };

  return (
    <AdminLayout user={user}>
      {loading && <LinearProgress />}
      <EditUnidad handleSubmit={handleSubmit} unidad={unidadEdit} />
      {/*----------Modal de petición exitosa------- */}
      <ModalSuccess
        show={modalSuccess}
        handleClose={() => setmodalSuccess(false)}
        tituloMensaje='Edición Exitosa'
        mensaje='La unidad se ha editado satisfactoriamente!'
        redireccion='/unidades'
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
