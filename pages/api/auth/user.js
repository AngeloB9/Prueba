import withSession from '@/helpers/session';

export default withSession(async (req, res) => {
  const user = req.session.get('user');
  if (user) {
    res.json({
      isLoggedIn: true,
      ...user_data,
    });
  } else {
    res.json({
      isLoggedIn: false,
    });
  }
});
