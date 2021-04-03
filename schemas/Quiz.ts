import { list } from '@keystone-next/keystone/schema';
import { timestamp, integer, text, relationship } from '@keystone-next/fields';
import { isSignedIn, rules } from '../access';

export const Quiz = list({
  fields: {
    subject: text({ isRequired: true, isUnique: true }),
    week: timestamp(),
    votes: integer({ defaultValue: 1 }),
    numberOfQuestions: integer({ defaultValue: 0 }),
    question: relationship({ ref: 'Question.quiz', many: true }),
    usersVoted: relationship({ ref: 'User.votedOnQuizzes', many: true }),
    userCreated: relationship({
      ref: 'User.quizzes',
      // Default user id when quiz is created.
      defaultValue: ({ context }) => ({
        connect: { id: context.session?.itemId },
      }),
    }),
  },
  access: {
    create: isSignedIn,
    read: true,
    update: rules.canManageQuizzes,
    delete: rules.canManageQuizzes,
  },
  ui: {
    listView: {
      initialColumns: ['votes', 'subject', 'numberOfQuestions', 'week'],
    },
    hideDelete: args => !rules.canManageQuizzes(args),
  },
});
