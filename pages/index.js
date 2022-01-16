import React from 'react';
import withSession from '@/helpers/session';
import { Button } from '@material-ui/core';
import axios from 'axios';
import Link from 'next/link';
import AdminLayout from '@/components/layouts/adminLayout';

export const getServerSideProps = withSession(async ({ req }) => {
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
  console.log(user);
  return {
    props: {
      user,
    },
  };
});

export default function Index({ user }) {
  const logout = () => {
    axios
      .post('/api/auth/logout')
      .then((response) => {
        if (response.status === 200) {
          window.location.href = '/';
        }
      })
      .catch((error_peticion) => {
        console.log(error_peticion);
      });
  };
  return (
    <AdminLayout user={user}>
      <Link href='/login'>login</Link>
      <div>{user?.nombre}</div>
      <Button onClick={logout}>LOGOUT</Button>
    </AdminLayout>
  );
}
