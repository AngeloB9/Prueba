export const UNIDAD_DATA = [
  {
    _id: '61cfca4d2aaae795c0cbd969',
    unidad: 'metro',
    abreviatura: 'm',
    magnitud: 'Longitud',
  },
  {
    _id: '61cfca682aaae795c0cbd96d',
    unidad: 'kilogramo',
    abreviatura: 'kg',
    magnitud: 'Masa',
  },
];

export const MOCK_COLUMNS = [
  { field: 'unidad', headerName: 'Unidad', minWidth: 250 },
  { field: 'abreviatura', headerName: 'Abreviatura', minWidth: 250 },
  { field: 'magnitud', headerName: 'Magnitud', minWidth: 250 },
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
