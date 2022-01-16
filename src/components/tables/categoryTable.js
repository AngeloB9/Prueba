import { DataGrid } from '@material-ui/data-grid';
import Link from 'next/link';
import { Button, Form, Col } from 'react-bootstrap';

const categoryTable = ({
  rows,
  columns,
  categoriesQuery,
  handleChangeQuery,
  handleSearchCategories,
}) => {
  return (
    <div className='p-3'>
      <div className='mb-4'>
        <h1>Categorías</h1>
        <Link href='/category'>
          <a style={{ textDecoration: 'none' }}>
            <Button size='lg' className='mb-3 mt-1'>
              Nueva Categoría <i className='fas fa-paste' />
            </Button>
          </a>
        </Link>
        <br />

        <Form.Group as={Col} sm='4' className='pl-0'>
          <Form.Label>Nombre:</Form.Label>
          <div className='d-flex'>
            <Form.Control
              placeholder='Nombre'
              name='categoria'
              type='text'
              value={categoriesQuery}
              onChange={handleChangeQuery}
              onKeyDown={(event) => {
                event.key === 'Enter' && handleSearchCategories();
              }}
            />
            <Button className='' onClick={handleSearchCategories}>
              <i className='fas fa-search' style={{ fontSize: '1.5em' }} />
            </Button>
          </div>
        </Form.Group>
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          columns={columns}
          rows={rows}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row._id}
        />
      </div>
    </div>
  );
};

export default categoryTable;
