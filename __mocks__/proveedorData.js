export const PROVEEDOR_DATA = [
  {
    _id: '61b6bf59f886f07483e39727',
    razon_social: '1004584031001',
    nombre: 'DSS1',
    direccion: 'Quito Eloy Alfaro',
    telefono: '09874123698',
    nombre_contacto: 'Viviana Mendez',
    celular_contacto: '09999999999',
    informacion_adicional: 'Solo atiende de lunes a viernes',
  },
  {
    _id: '61b6bf70f886f07483e3972b',
    razon_social: '1004584031002',
    nombre: 'DSS2',
    direccion: 'Quito Eloy Alfaro',
    telefono: '09874123698',
    nombre_contacto: 'Viviana Mendez',
    celular_contacto: '09999999999',
    informacion_adicional: 'No hace envios a provincia de una día para otro',
  },
];

export const MOCK_COLUMNS = [
  { field: 'nombre', headerName: 'Nombre', minWidth: 200 },
  { field: 'razon_social', headerName: 'Razón Social', minWidth: 300 },
  { field: 'direccion', headerName: 'Dirección', minWidth: 300 },
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
