import { useState, useMemo } from 'react';
import Link from 'next/link';
import router from 'next/router';
//
import AdminLayout from '@/components/layouts/adminLayout';
import withSession from '@/helpers/session';
import axios from '@/helpers/axios-helper';
import ModalDelete from '@/components/modals/modalDelete';
import UnidadesTable from '@/components/tables/unidadesTable';
import { Button } from 'react-bootstrap';
import ModalInfoUnidad from '@/components/modals/modalInfoUnidad';

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
    data: { unidades },
  } = await axios(user.token).get('/unidades');

  return {
    props: {
      user,
      unidades,
    },
  };
});

const index = ({ user, unidades }) => {
  /*-------------Variables de estado de la pagina-------------*/
  const [error, seterror] = useState(null); //si existe un error se setea la var
  const [loading, setloading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false); //variable para el modal de eliminación
  const [showInfo, setshowInfo] = useState(false);
  const [unidad, setunidad] = useState({
    unidad: '',
    abreviatura: '',
    magnitud: '',
  });

  const [unidadesQuery, setunidadesQuery] = useState('');
  const [unidadesQueryResultados, setunidadesQueryResultados] = useState();
  //-------------Funciones de la página------------//
  useMemo(() => {
    if (unidadesQuery.trim().length == 0) setunidadesQueryResultados();
  }, [unidadesQuery]);

  //Sete al tratamiento y muestra el modal de eliminación
  const handleModalDelete = (unidad_info) => {
    setunidad(unidad_info);
    setdeleteModal(true);
  };

  const columns = [
    { field: 'unidad', headerName: 'Unidad', minWidth: 250 },
    { field: 'abreviatura', headerName: 'Abreviatura', minWidth: 250 },
		{ field: 'magnitud', headerName: 'Magnitud', minWidth: 250 },
    {
      field: 'information',
      headerName: 'Información',
      minWidth: 200,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          setunidad(params.row);
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
            <Link href={`/unidad/${params.row._id}`}>
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

  const handleSearchUnidades = async () => {
    if (unidadesQuery.trim()) {
      setloading(true);
      try {
        const {
          data: { results: unidadesResults },
        } = await axios(user.token).get(
          `/buscar/unidades/${unidadesQuery.trim()}`
        );
        setunidadesQueryResultados(unidadesResults);
        setloading(false);
      } catch (error_peticion) {
        seterror(error_peticion);
        setloading(false);
      }
    } else {
      setunidadesQueryResultados();
    }
  };

  const handleDelete = async () => {
    setloading(true);
    try {
      const response = await axios(user.token).delete(
        `/unidades/${unidad._id}`
      );
      if (response.status == 200) {
        setloading(false);
        setunidadesQueryResultados();
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
      <UnidadesTable
        columns={columns}
        rows={unidadesQueryResultados ?? unidades}
        handleSearchUnidades={handleSearchUnidades}
        unidadesQuery={unidadesQuery}
        handleChangeQuery={(event) => {
          setunidadesQuery(event.target.value);
        }}
      />
      {/* Modal para ver la informacion de la unidad */}
      <ModalInfoUnidad
        handleClose={() => setshowInfo(false)}
        show={showInfo}
        unidad={unidad}
      />
      {/* Modal para eliminar informacion de la tabla */}
      <ModalDelete
        handleClose={() => {
          setdeleteModal(false);
        }}
        show={deleteModal}
        handleDelete={handleDelete}
        titulo='Eliminar unidad'
        mensaje={`Esta seguro que desea eliminar la unidad ${unidad.unidad}`}
      />
    </AdminLayout>
  );
};

export default index;
