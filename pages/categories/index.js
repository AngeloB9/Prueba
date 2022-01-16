import { useState, useMemo } from 'react';
import Link from 'next/link';
import router from 'next/router';
//
import AdminLayout from '@/components/layouts/adminLayout';
import withSession from '@/helpers/session';
import axios from '@/helpers/axios-helper';
import ModalDelete from '@/components/modals/modalDelete';
import CategoryTable from '@/components/tables/categoryTable';
import { Button } from 'react-bootstrap';
import ModalInfoCategory from '@/components/modals/modalInfoCategory';

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
    data: { categorias },
  } = await axios(user.token).get('/categorias');

  return {
    props: {
      user,
      categorias,
    },
  };
});

const index = ({ user, categorias }) => {
  /*-------------Variables de estado de la pagina-------------*/
  const [error, seterror] = useState(null); //si existe un error se setea la var
  const [loading, setloading] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false); //variable para el modal de eliminación
  const [showInfo, setshowInfo] = useState(false);
  const [category, setcategory] = useState({
    nombre: '',
    descipcion: '',
  });

  const [categoriesQuery, setcategoriesQuery] = useState('');
  const [categoriesQueryResultados, setcategoriesQueryResultados] = useState();
  //-------------Funciones de la página------------//
  useMemo(() => {
    if (categoriesQuery.trim().length == 0) setcategoriesQueryResultados();
  }, [categoriesQuery]);

  //Sete al tratamiento y muestra el modal de eliminación
  const handleModalDelete = (category_info) => {
    setcategory(category_info);
    setdeleteModal(true);
  };

  const columns = [
    { field: 'nombre', headerName: 'Nombre', minWidth: 200 },
    { field: 'descripcion', headerName: 'Descripción', minWidth: 400 },
    {
      field: 'information',
      headerName: 'Información',
      minWidth: 200,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          setcategory(params.row);
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
            <Link href={`/category/${params.row._id}`}>
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

  //Maneja la busqueda de las categorias
  const handleSearchCategories = async () => {
    if (categoriesQuery.trim()) {
      setloading(true);
      try {
        const {
          data: { results: categoriesResults },
        } = await axios(user.token).get(
          `/buscar/categorias/${categoriesQuery.trim()}`
        );
        setcategoriesQueryResultados(categoriesResults);
        setloading(false);
      } catch (error_peticion) {
        seterror(error_peticion);
        setloading(false);
      }
    } else {
      setcategoriesQueryResultados();
    }
  };

  //Se encarga de la eliminación del tratamiento
  const handleDelete = async () => {
    setloading(true);
    try {
      const response = await axios(user.token).delete(
        `/categorias/${category._id}`
      );
      if (response.status == 200) {
        setloading(false);
        setcategoriesQueryResultados();
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
      <CategoryTable
        columns={columns}
        rows={ categoriesQueryResultados ?? categorias}
        handleSearchCategories={handleSearchCategories}
        categoriesQuery={categoriesQuery}
        handleChangeQuery={(event) => {
          setcategoriesQuery(event.target.value);
        }}
      />
      {/* Modal para ver la informacion de la categoria */}
      <ModalInfoCategory
        handleClose={() => setshowInfo(false)}
        show={showInfo}
        category={category}
      />
      {/* Modal para eliminar informacion de la tabla */}
      <ModalDelete
        handleClose={() => {
          setdeleteModal(false);
        }}
        show={deleteModal}
        handleDelete={handleDelete}
        titulo='Eliminar categoría'
        mensaje={`Esta seguro que desea eliminar la categoria ${category.nombre}`}
      />
    </AdminLayout>
  );
};

export default index;
