import { useState, useMemo } from 'react';
import Link from 'next/link';
import router from 'next/router';
import { Button } from 'react-bootstrap';
//
import AdminLayout from '@/components/layouts/adminLayout';
import withSession from '@/helpers/session';
import axios from '@/helpers/axios-helper';
import ModalDelete from '@/components/modals/modalDelete';
import OperadorTable from '@/components/tables/operadoresTable';
import ModalInfoOperador from '@/components/modals/modalInfoOperador';

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
    data: { operadores },
  } = await axios(user.token).get('/operadores');

  return {
    props: {
      user,
      operadores,
    },
  };
});

const index = ({ user, operadores }) => {
  /*-------------Variables de estado de la pagina-------------*/
  const [error, seterror] = useState(null); //si existe un error se setea la var
  const [loading, setloading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false); //variable para el modal de eliminación
  const [showInfo, setshowInfo] = useState(false);
  const [operador, setoperador] = useState({
    cedula: '',
    nombres: '',
    apellidos: '',
    genero: '',
    fecha_nacimiento: '',
    nivel_instruccion: '',
    estado_civil: '',
    tipo_sangre: '',
    direccion: '',
    telefono: '',
    correo_personal: '',
    informacion_adicional: '',
  });

  const [operadoresQuery, setoperadoresQuery] = useState('');
  const [operadoresQueryResultados, setoperadoresQueryResultados] =
    useState();
  //-------------Funciones de la página------------//
  useMemo(() => {
    if (operadoresQuery.trim().length == 0) setoperadoresQueryResultados();
  }, [operadoresQuery]);

  //Sete al tratamiento y muestra el modal de eliminación
  const handleModalDelete = (operador_info) => {
    setoperador(operador_info);
    setdeleteModal(true);
  };

  const columns = [
    { field: 'cedula', headerName: 'Cédula', minWidth: 200 },
    { field: 'nombres', headerName: 'Nombres', minWidth: 300 },
    { field: 'apellidos', headerName: 'Apellidos', minWidth: 300 },
    {
      field: 'information',
      headerName: 'Información',
      minWidth: 200,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          setoperador(params.row);
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
            <Link href={`/operador/${params.row._id}`}>
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

  //Maneja la busqueda de operadores
  const handleSearchOperadores = async () => {
    if (operadoresQuery.trim()) {
      setloading(true);
      try {
        const {
          data: { results: operadoresResults },
        } = await axios(user.token).get(
          `/buscar/operadores/${operadoresQuery.trim()}`
        );
        setoperadoresQueryResultados(operadoresResults);
        setloading(false);
      } catch (error_peticion) {
        seterror(error_peticion);
        setloading(false);
      }
    } else {
      setoperadoresQueryResultados();
    }
  };

  //Se encarga de la eliminación del operador
  const handleDelete = async () => {
    setloading(true);
    try {
      const response = await axios(user.token).delete(
        `/operadores/${operador._id}`
      );
      if (response.status == 200) {
        setloading(false);
        setoperadoresQueryResultados();
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
      <OperadorTable
        columns={columns}
        rows={operadoresQueryResultados ?? operadores}
        handleSearchOperadores={handleSearchOperadores}
        operadoresQuery={operadoresQuery}
        handleChangeQuery={(event) => {
          setoperadoresQuery(event.target.value);
        }}
      />
      {/* Modal para ver la informacion del operador */}
      <ModalInfoOperador
        handleClose={() => setshowInfo(false)}
        show={showInfo}
        operador={operador}
      />
      {/* Modal para eliminar informacion de la tabla */}
      <ModalDelete
        handleClose={() => {
          setdeleteModal(false);
        }}
        show={deleteModal}
        handleDelete={handleDelete}
        titulo='Eliminar operador'
        mensaje={`Esta seguro que desea eliminar al operador ${operador.nombres} ${operador.apellidos} con cédula ${operador.cedula}`}
      />
    </AdminLayout>
  );
};

export default index;
