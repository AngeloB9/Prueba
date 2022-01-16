import withSession from '@/helpers/session';

export default withSession(async (req, res) => {
  const user = req.session.get('user');
  if (user) {
    req.session.destroy();
  }
  res.status(200).json({ isLoggedIn: false });
});
