export const CATEGORY_DATA = [
  {
    _id: '61b542ead86fa7d930dbfec3',
    nombre: 'TESTING CATEGORY',
    descripcion: 'TESTING CATEGORY DESCRIPTION',
  },
  {
    _id: '61b5432bd86fa7d930dbfecb',
    nombre: 'SECOND TEST CATEGORY',
    descripcion: 'TESTING SECOND CATEGORY DESCRIPTION',
  },
];

export const MOCK_COLUMNS = [
  { field: 'nombre', headerName: 'Nombre', minWidth: 200 },
  { field: 'descripcion', headerName: 'Descripción', minWidth: 400 },
  {
    field: 'information',
    headerName: 'Información',
    minWidth: 200,
    renderCell: () => {
      return (
        <div className='w-100 d-flex justify-content-center'>
        </div>
      );
    },
  },
  {
    field: 'edit',
    headerName: 'Editar',
    minWidth: 200,
    renderCell: () => {
      return (
        <div className='w-100 d-flex justify-content-center'>
        </div>
      );
    },
  },
  {
    field: 'delete',
    headerName: 'Eliminar',
    minWidth: 200,
    renderCell: () => {
      return (
        <div className='w-100 d-flex justify-content-center'>
        </div>
      );
    },
  },
];
