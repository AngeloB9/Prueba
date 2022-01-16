import { useState, useMemo } from 'react';
import router from 'next/router';
//
import AdminLayout from '@/components/layouts/adminLayout';
import UserTable from '@/components/tables/userTable';
import withSession from '@/helpers/session';
import axios from '@/helpers/axios-helper';
import ModalDelete from '@/components/modals/modalDelete';

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
  /*-------------Variables de estado de la pagina-------------*/
  const [error, seterror] = useState(null); //si existe un error se setea la var
  const [loading, setloading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false); //variable para el modal de eliminación
  const [usuario, setusuario] = useState({
    nombre: '',
    correo: '',
    rol: '',
    estado: '',
    google: '',
  });
  const [usuariosQuery, setusuariosQuery] = useState('');
  const [usuariosQueryResultados, setusuariosQueryResultados] = useState();
  //-------------Funciones de la página------------//
  useMemo(() => {
    if (usuariosQuery.trim().length == 0) setusuariosQueryResultados();
  }, [usuariosQuery]);

  //Sete al tratamiento y muestra el modal de eliminación
  const handleModalDelete = (usuario_info) => {
    setusuario(usuario_info);
    setdeleteModal(true);
  };
  //Maneja la busqueda de los usuarios
  const handleSearchUsuarios = async () => {
    if (usuariosQuery.trim()) {
      setloading(true);
      try {
        const {
          data: { results: usuariosResultados },
        } = await axios(user.token).get(
          `/buscar/usuarios/${usuariosQuery.trim()}`
        );
        setusuariosQueryResultados(usuariosResultados);
        setloading(false);
      } catch (error_peticion) {
        seterror(error_peticion);
        setloading(false);
      }
    } else {
      setusuariosQueryResultados();
    }
  };
  //Se encarga de la eliminación del tratamiento
  const handleDelete = async () => {
    setloading(true);
    try {
      const response = await axios(user.token).delete(
        `/usuarios/${usuario.uid}`
      );
      if (response.status == 200) {
        setloading(false);
        setusuariosQueryResultados();
        setdeleteModal(false);
        router.push(router.asPath); //refresca los props de la pagina
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      setloading(false);
    }
  };

  return (
    <AdminLayout user={user}>
      <UserTable
        handleChangeQuery={(event) => {
          setusuariosQuery(event.target.value);
        }}
        handleModalDelete={handleModalDelete}
        handleSearchUsuarios={handleSearchUsuarios}
        usuariosQuery={usuariosQuery}
        usuarios={usuariosQueryResultados ?? []}
      />
      {/*----------Modal para eliminar------- */}
      <ModalDelete
        handleClose={() => {
          setdeleteModal(false);
        }}
        show={deleteModal}
        handleDelete={handleDelete}
        titulo='Eliminar usuario'
        mensaje={`Esta seguro que desea eliminar el usuario de ${usuario.nombre} con correo ${usuario.correo} ?`}
      />
    </AdminLayout>
  );
};

export default index;
