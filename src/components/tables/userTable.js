import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
//
import Link from 'next/link';
import { Button, Form, Col } from 'react-bootstrap';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#055C9D',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables({
  usuarios,
  handleModalDelete,
  handleChangeQuery,
  usuariosQuery,
  handleSearchUsuarios,
}) {
  const classes = useStyles();

  return (
    <div className='p-3'>
      <h1>Usuarios</h1>

      <Link href='/user'>
        <a style={{ textDecoration: 'none' }}>
          <Button size='lg' className='mb-3 mt-1'>
            Nuevo Usuario <i className='fas fa-user' />
          </Button>
        </a>
      </Link>
      <br />

      <Form.Group as={Col} sm='4' className='mb-3'>
        <Form.Label>Nombre de usuario o cédula:</Form.Label>
        <div className='d-flex'>
          <Form.Control
            placeholder='nombre usuario'
            name='usuario'
            type='text'
            value={usuariosQuery}
            onChange={handleChangeQuery}
            onKeyDown={(event) => {
              event.key === 'Enter' && handleSearchUsuarios();
            }}
          />
          <Button className='' onClick={handleSearchUsuarios}>
            <i className='fas fa-search' style={{ fontSize: '1.5em' }} />
          </Button>
        </div>
      </Form.Group>

      {/*-----------------Tabla-------------*/}
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              <StyledTableCell component='th' align='center'>
                Nombre
              </StyledTableCell>
              <StyledTableCell component='th' align='center'>
                Correo
              </StyledTableCell>

              <StyledTableCell component='th' align='center'>
                Editar
              </StyledTableCell>
              <StyledTableCell component='th' align='center'>
                Eliminar
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <StyledTableRow hover key={usuario.uid}>
                <StyledTableCell component='td' align='center' scope='row'>
                  {usuario.nombre}
                </StyledTableCell>
                <StyledTableCell component='td' align='center' scope='row'>
                  {usuario.correo}
                </StyledTableCell>

                <StyledTableCell component='td' align='center'>
                  <Link href={`/user/${usuario.uid}`}>
                    <Button variant='primary'>
                      <i className='fas fa-edit' />
                    </Button>
                  </Link>
                </StyledTableCell>
                <StyledTableCell component='td' align='center'>
                  <Button
                    variant='danger'
                    onClick={() => {
                      handleModalDelete(usuario);
                    }}>
                    <i className='fas fa-trash-alt' />
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
