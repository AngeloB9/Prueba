import Link from 'next/link';
//import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { useStyles } from './drawerStyles';
import { Dropdown } from 'react-bootstrap';

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  const matches = useMediaQuery('(max-width:991px)');
  const drawer = (
    <div>
      <div className={classes.drawerImage}>
        <img className='w-100 h-100' alt='' src={props.logo} />
      </div>
      <Divider />
      <List>
        {/* <Dropdown>
          <Dropdown.Toggle
            id='dropdown-basic'
            className='w-100'
            as={ListItem}
            button
            className={classes.styledLink}>
            <ListItemIcon id='list-item-id'>
              <i className='far fa-calendar-alt' />
            </ListItemIcon>
            <ListItemText primary={'Citas'} />
          </Dropdown.Toggle>

          <Dropdown.Menu className='w-100'>
            <Link href='/admin/citas'>
              <a className='dropdown-item'>Calendario</a>
            </Link>
            <Link href='/admin/citas2'>
              <a className='dropdown-item'>Calenadario Variante</a>
            </Link>
          </Dropdown.Menu>
        </Dropdown> */}

        <Link href='/categories'>
          <ListItem button className={classes.styledLink}>
            <ListItemIcon>
              <i className='fas fa-paste' />
            </ListItemIcon>
            <ListItemText primary={'Categorias'} />
          </ListItem>
        </Link>

        <Link href='/proveedores'>
          <ListItem button className={classes.styledLink}>
            <ListItemIcon>
              <i className='fas fa-dolly-flatbed' />
            </ListItemIcon>
            <ListItemText primary={'Proveedores'} />
          </ListItem>
        </Link>

        <Link href='/bodegas'>
          <ListItem button className={classes.styledLink}>
            <ListItemIcon>
              <i className='fas fa-warehouse' />
            </ListItemIcon>
            <ListItemText primary={'Bodegas'} />
          </ListItem>
        </Link>

        <Link href='/unidades'>
          <ListItem button className={classes.styledLink}>
            <ListItemIcon>
              <i className='fas fa-ruler-combined' />
            </ListItemIcon>
            <ListItemText primary={'Unidades'} />
          </ListItem>
        </Link>

        <Link href='/operadores'>
          <ListItem button className={classes.styledLink}>
            <ListItemIcon>
              <i className='fas fa-people-carry' />
            </ListItemIcon>
            <ListItemText primary={'Operadores'} />
          </ListItem>
        </Link>

        {props.user ? (
          props.user.rol === 'ADMIN_ROLE' ? (
            <Link href='/users'>
              <ListItem button className={classes.styledLink}>
                <ListItemIcon>
                  <i className='fas fa-users-cog' />
                </ListItemIcon>
                <ListItemText primary={'Usuarios'} />
              </ListItem>
            </Link>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </List>
    </div>
  );
  const miniDrawer = (
    <List>
      {/* <Dropdown>
        <Dropdown.Toggle
          id='dropdown-basic'
          className='w-100'
          as={ListItem}
          button
          className={classes.styledLink}>
          <ListItemIcon id='list-item-id'>
            <i className='far fa-calendar-alt' />
          </ListItemIcon>
          <ListItemText primary={'Citas'} />
        </Dropdown.Toggle>

        <Dropdown.Menu className='w-100'>
          <Link href='/admin/citas'>
            <a className='dropdown-item'>Calendario</a>
          </Link>
          <Link href='/admin/citas2'>
            <a className='dropdown-item'>Calenadario Variante</a>
          </Link>
        </Dropdown.Menu>
      </Dropdown> */}

      <Link href='/categories'>
        <ListItem button className={classes.styledLink}>
          <ListItemIcon>
            <i className='fas fa-paste' />
          </ListItemIcon>
          <ListItemText primary={'Categorias'} />
        </ListItem>
      </Link>

      <Link href='/proveedores'>
        <ListItem button className={classes.styledLink}>
          <ListItemIcon>
            <i className='fas fa-dolly-flatbed' />
          </ListItemIcon>
          <ListItemText primary={'Proveedores'} />
        </ListItem>
      </Link>

      <Link href='/bodegas'>
        <ListItem button className={classes.styledLink}>
          <ListItemIcon>
            <i className='fas fa-warehouse' />
          </ListItemIcon>
          <ListItemText primary={'Bodegas'} />
        </ListItem>
      </Link>

      <Link href='/unidades'>
        <ListItem button className={classes.styledLink}>
          <ListItemIcon>
            <i className='fas fa-ruler-combined' />
          </ListItemIcon>
          <ListItemText primary={'Unidades'} />
        </ListItem>
      </Link>

      <Link href='/operadores'>
        <ListItem button className={classes.styledLink}>
          <ListItemIcon>
            <i className='fas fa-people-carry' />
          </ListItemIcon>
          <ListItemText primary={'Operadores'} />
        </ListItem>
      </Link>

      {props.user ? (
        props.user.rol === 'ADMIN_ROLE' ? (
          <Link href='/users'>
            <ListItem button className={classes.styledLink}>
              <ListItemIcon>
                <i className='fas fa-users-cog' />
              </ListItemIcon>
              <ListItemText primary={'Usuarios'} />
            </ListItem>
          </Link>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
    </List>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      {matches ? (
        <Drawer
          container={container}
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={props.mobileOpen}
          onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}>
          {drawer}
        </Drawer>
      ) : props.miniDrawer ? (
        <div className={classes.miniDrawer}>{miniDrawer}</div>
      ) : (
        <div className={classes.drawer}>{drawer}</div>
      )}
    </div>
  );
}

export default ResponsiveDrawer;
