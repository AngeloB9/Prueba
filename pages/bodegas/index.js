import { useState, useMemo } from 'react';
import Link from 'next/link';
import router from 'next/router';
import { Button } from 'react-bootstrap';
//
import AdminLayout from '@/components/layouts/adminLayout';
import withSession from '@/helpers/session';
import axios from '@/helpers/axios-helper';
import ModalDelete from '@/components/modals/modalDelete';
import BodegasTable from '@/components/tables/bodegasTable';
import ModalInfoBodega from '@/components/modals/modalInfoBodega';

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
  if (user.rol != 'ADMIN_ROLE' && user.rol != 'USER_ROLE')
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  const {
    data: { bodegas },
  } = await axios(user.token).get('/bodegas');

  return {
    props: {
      user,
      bodegas,
    },
  };
});

const index = ({ user, bodegas }) => {
  /*-------------Variables de estado de la pagina-------------*/
  const [error, seterror] = useState(null); //si existe un error se setea la var
  const [loading, setloading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false); //variable para el modal de eliminación
  const [showInfo, setshowInfo] = useState(false);
  const [bodega, setbodega] = useState({
    nombre: '',
    dimensiones: '',
    ubicacion: '',
    datos_acidionales: '',
  });

  const [bodegasQuery, setbodegasQuery] = useState('');
  const [bodegasQueryResultados, setbodegasQueryResultados] = useState();
  //-------------Funciones de la página------------//
  useMemo(() => {
    if (bodegasQuery.trim().length == 0) setbodegasQueryResultados();
  }, [bodegasQuery]);

  //Sete al tratamiento y muestra el modal de eliminación
  const handleModalDelete = (bodega_info) => {
    setbodega(bodega_info);
    setdeleteModal(true);
  };

  const columns = [
    { field: 'nombre', headerName: 'Nombre', minWidth: 200 },
    { field: 'dimensiones', headerName: 'Dimensiones', minWidth: 300 },
    { field: 'ubicacion', headerName: 'Ubicación', minWidth: 300 },
    {
      field: 'information',
      headerName: 'Información',
      minWidth: 200,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          setbodega(params.row);
          setshowInfo(true);
        };
        return (
          <div className='w-100 d-flex justify-content-center'>
            <Button variant='info' className='text-white' onClick={onClick}>
              <i className='fas fa-info-circle'></i>
            </Button>
          </div>
        );
      },
    },
    {
      field: 'edit',
      headerName: 'Editar',
      minWidth: 200,
      renderCell: (params) => {
        return (
          <div className='w-100 d-flex justify-content-center'>
            <Link href={`/bodega/${params.row._id}`}>
              <Button>
                <i className='fas fa-edit'></i>
              </Button>
            </Link>
          </div>
        );
      },
    },
    {
      field: 'delete',
      headerName: 'Eliminar',
      minWidth: 200,
      renderCell: (params) => {
        return (
          <div className='w-100 d-flex justify-content-center'>
            <Button
              onClick={() => {
                handleModalDelete(params.row);
              }}
              variant='danger'>
              <i className='fas fa-trash-alt'></i>
            </Button>
          </div>
        );
      },
    },
  ];

  //Maneja la busqueda de bodegas
  const handleSearchBodegas = async () => {
    if (bodegasQuery.trim()) {
      setloading(true);
      try {
        const {
          data: { results: bodegasResults },
        } = await axios(user.token).get(
          `/buscar/bodegas/${bodegasQuery.trim()}`
        );
        setbodegasQueryResultados(bodegasResults);
        setloading(false);
      } catch (error_peticion) {
        seterror(error_peticion);
        setloading(false);
      }
    } else {
      setbodegasQueryResultados();
    }
  };

  //Se encarga de la eliminación de la bodega
  const handleDelete = async () => {
    setloading(true);
    try {
      const response = await axios(user.token).delete(`/bodegas/${bodega._id}`);
      if (response.status == 200) {
        setloading(false);
        setbodegasQueryResultados();
        setdeleteModal(false);
        router.push(router.asPath);
      }
    } catch (error_peticion) {
      seterror(error_peticion);
      setloading(false);
    }
  };

  return (
    <AdminLayout user={user}>
      <BodegasTable
        columns={columns}
        rows={bodegasQueryResultados ?? bodegas}
        handleSearchBodegas={handleSearchBodegas}
        bodegasQuery={bodegasQuery}
        handleChangeQuery={(event) => {
          setbodegasQuery(event.target.value);
        }}
      />
      {/* Modal para ver la informacion de la bodega */}
      <ModalInfoBodega
        handleClose={() => setshowInfo(false)}
        show={showInfo}
        bodega={bodega}
      />
      {/* Modal para eliminar informacion de la tabla */}
      <ModalDelete
        handleClose={() => {
          setdeleteModal(false);
        }}
        show={deleteModal}
        handleDelete={handleDelete}
        titulo='Eliminar bodega'
        mensaje={`Esta seguro que desea eliminar la bodega ${bodega.nombre}`}
      />
    </AdminLayout>
  );
};

export default index;
