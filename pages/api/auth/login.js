import axios from 'axios';
import withSession from '@/helpers/session';

export default withSession(async (req, res) => {
  const { email: correo, password } = req.body;
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_APIURL}/auth/login`,
      {
        correo,
        password,
      }
    );
    if (response.status == 200) {
      req.session.set('user', {
        nombre: response.data.usuario.nombre,
        correo: response.data.usuario.correo,
        estado: response.data.usuario.estado,
        google: response.data.usuario.google,
        rol: response.data.usuario.rol,
        uid: response.data.usuario.uid,
        token: response.data.token,
        isLoggedIn: true,
      });
      await req.session.save();
      res.status(200).json({ message: 'Logged In' });
    }
  } catch (error) {
    if (error.response.status == 400) {
      res.status(401).json({ message: 'Unauthorized' });
    } else res.status(500).json({ message: 'Internal server error' });
  }
});
