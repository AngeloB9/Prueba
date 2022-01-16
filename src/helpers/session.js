import { withIronSession } from 'next-iron-session';

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.WITH_IRON_PASSWORD ?? 'secret_key',
    cookieName: process.env.COOKIE_NAME ?? 'cookie_name',
    cookieOptions: {
      maxAge: process.env.COOKIE_EXPIRE_TIME ?? 3600,
      //secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  });
}
