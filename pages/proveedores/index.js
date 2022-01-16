import { useState, useMemo } from 'react';
import Link from 'next/link';
import router from 'next/router';
import { Button } from 'react-bootstrap';
//
import AdminLayout from '@/components/layouts/adminLayout';
import withSession from '@/helpers/session';
import axios from '@/helpers/axios-helper';
import ModalDelete from '@/components/modals/modalDelete';
import ProveedorTable from '@/components/tables/proveedoresTable';
import ModalInfoProveedor from '@/components/modals/modalInfoProveedor';

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
    data: { proveedores },
  } = await axios(user.token).get('/proveedores');

  return {
    props: {
      user,
      proveedores,
    },
  };
});

const index = ({ user, proveedores }) => {
  /*-------------Variables de estado de la pagina-------------*/
  const [error, seterror] = useState(null); //si existe un error se setea la var
  const [loading, setloading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false); //variable para el modal de eliminación
  const [showInfo, setshowInfo] = useState(false);
  const [proveedor, setproveedor] = useState({
    nombre: '',
    razon_social: '',
    direccion:'',
    telefono:'',
    nombre_contacto:'',
    celular_contacto:'',
    inforacion_adicional:'',
  });

  const [proveedoresQuery, setproveedoresQuery] = useState('');
  const [proveedoresQueryResultados, setproveedoresQueryResultados] = useState();
  //-------------Funciones de la página------------//
  useMemo(() => {
    if (proveedoresQuery.trim().length == 0) setproveedoresQueryResultados();
  }, [proveedoresQuery]);

  //Sete al tratamiento y muestra el modal de eliminación
  const handleModalDelete = (proveedor_info) => {
    setproveedor(proveedor_info);
    setdeleteModal(true);
  };

  const columns = [
    { field: 'nombre', headerName: 'Nombre', minWidth: 200 },
    { field: 'razon_social', headerName: 'Razón Social', minWidth: 300 },
    { field: 'direccion', headerName:'Dirección', minWidth:300 },
    {
      field: 'information',
      headerName: 'Información',
      minWidth: 200,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          setproveedor(params.row);
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
            <Link href={`/proveedor/${params.row._id}`}>
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

  //Maneja la busqueda de proveedores
  const handleSearchProveedores = async () => {
    if (proveedoresQuery.trim()) {
      setloading(true);
      try {
        const {
          data: { results: proveedoresResults },
        } = await axios(user.token).get(
          `/buscar/proveedores/${proveedoresQuery.trim()}`
        );
        setproveedoresQueryResultados(proveedoresResults);
        setloading(false);
      } catch (error_peticion) {
        seterror(error_peticion);
        setloading(false);
      }
    } else {
      setproveedoresQueryResultados();
    }
  };

  //Se encarga de la eliminación del proveedor
  const handleDelete = async () => {
    setloading(true);
    try {
      const response = await axios(user.token).delete(
        `/proveedores/${proveedor._id}`
      );
      if (response.status == 200) {
        setloading(false);
        setproveedoresQueryResultados();
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
      <ProveedorTable
        columns={columns}
        rows={ proveedoresQueryResultados ?? proveedores}
        handleSearchProveedores={handleSearchProveedores}
        proveedoresQuery={proveedoresQuery}
        handleChangeQuery={(event) => {
          setproveedoresQuery(event.target.value);
        }}
      />
      {/* Modal para ver la informacion del proveedor */}
      <ModalInfoProveedor
        handleClose={() => setshowInfo(false)}
        show={showInfo}
        proveedor={proveedor}
      />
      {/* Modal para eliminar informacion de la tabla */}
      <ModalDelete
        handleClose={() => {
          setdeleteModal(false);
        }}
        show={deleteModal}
        handleDelete={handleDelete}
        titulo='Eliminar proveedor'
        mensaje={`Esta seguro que desea eliminar al proveedor ${proveedor.nombre}`}
      />
    </AdminLayout>
  );
};

export default index;
