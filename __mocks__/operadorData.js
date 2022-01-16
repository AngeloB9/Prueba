export const OPERADOR_DATA = [
    {
        "_id": "61da333db5c85d9647557aba",
        "cedula": "1004584031",
        "nombres": "Angelo Gabriel",
        "apellidos": "Benavidez ",
        "genero": "Masculino",
        "fecha_nacimiento": "2001-05-05T00:00:00.000Z",
        "nivel_instruccion": "primaria",
        "estado_civil": "soltero/a",
        "tipo_sangre": "A+",
        "direccion": "San Isidro del Inca",
        "telefono": "112121112",
        "correo_personal": "benavidezangelo@outlook.com",
        "informacion_adicional": "Ninguna"
    },
    {
        "_id": "61dba55547133f7df252d1da",
        "cedula": "1721754768",
        "nombres": "Juan Jose",
        "apellidos": "Puente",
        "genero": "Masculino",
        "fecha_nacimiento": "2021-09-17T00:00:00.000Z",
        "nivel_instruccion": "superior",
        "estado_civil": "soltero/a",
        "tipo_sangre": "A+",
        "direccion": "tumbaco",
        "telefono": "09923228329",
        "correo_personal": "juanjo@gmail.com",
        "informacion_adicional": ""
    }
  ];
  
  export const MOCK_COLUMNS = [
    { field: 'cedula', headerName: 'Cédula', minWidth: 200 },
    { field: 'nombres', headerName: 'Nombres', minWidth: 300 },
    { field: 'apellidos', headerName: 'Apellidos', minWidth: 300 },
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
