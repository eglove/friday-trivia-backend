import 'dotenv/config';
import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  statelessSessions,
  withItemData,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Option } from './schemas/Option';
import { Question } from './schemas/Question';
import { Quiz } from './schemas/Quiz';
import { sendPasswordResetEmail } from './lib/mail';
import { TriviaState } from './schemas/TriviaState';

const databaseUrl =
  process.env.DATABASE_URL || 'mongodb://localhost/friday-trivia';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 365,
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
  passwordResetLink: {
    async sendToken(args) {
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
});

export default withAuth(
  config({
    server: {
      cors: {
        // @ts-ignore
        origin: [process.env.FRONTEND_URL],
        credentials: true,
      },
    },
    db: {
      adapter: 'mongoose',
      url: databaseUrl,
    },
    lists: createSchema({
      TriviaState,
      User,
      Quiz,
      Question,
      Option,
    }),
    ui: {
      isAccessAllowed: ({ session }) => !!session?.data,
    },
    // @ts-ignore
    session: withItemData(statelessSessions(sessionConfig), {
      User: `id`,
    }),
  })
);
