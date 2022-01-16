export const BODEGA_DATA = [
  {
    _id: '61cc9bf11ca2fc5344866a0e',
    nombre: 'BODEGA1',
    dimensiones: '25 metros cuadrados',
    ubicacion: 'Subsuelo1',
    datos_adicionales: 'Bodega para guardar materiales de impresión',
  },
  {
    _id: '61ccb9acadb4339f4fbcabce',
    nombre: 'BODEGA2',
    dimensiones: '50 metros cuadrados',
    ubicacion: 'Subsuelo2',
    datos_adicionales: 'Bodega para guardar materiales de impresión',
  },
];

export const MOCK_COLUMNS = [
  { field: 'nombre', headerName: 'Nombre', minWidth: 200 },
  { field: 'dimensiones', headerName: 'Dimensiones', minWidth: 300 },
  { field: 'ubicacion', headerName: 'Ubicación', minWidth: 300 },
  {
    field: 'information',
    headerName: 'Información',
    minWidth: 200,
    renderCell: () => {
      return <div className='w-100 d-flex justify-content-center'></div>;
    },
  },
  {
    field: 'edit',
    headerName: 'Editar',
    minWidth: 200,
    renderCell: () => {
      return <div className='w-100 d-flex justify-content-center'></div>;
    },
  },
  {
    field: 'delete',
    headerName: 'Eliminar',
    minWidth: 200,
    renderCell: () => {
      return <div className='w-100 d-flex justify-content-center'></div>;
    },
  },
];
