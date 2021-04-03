import { list } from '@keystone-next/keystone/schema';
import { integer, relationship, text } from '@keystone-next/fields';
import { isSignedIn, rules } from '../access';

export const Question = list({
  access: {
    create: isSignedIn,
    read: true,
    update: rules.canManageQuizzes,
    delete: rules.canManageQuizzes,
  },
  fields: {
    content: text({ isRequired: true }),
    votes: integer({ defaultValue: 1 }),
    numberOfOptions: integer({ defaultValue: 0 }),
    option: relationship({ ref: 'Option.question', many: true }),
    quiz: relationship({ ref: 'Quiz.question' }),
    usersVoted: relationship({ ref: 'User.votedOnQuestions', many: true }),
    userCreated: relationship({
      ref: 'User.questions',
      // Default user id when question is created
      defaultValue: ({ context }) => ({
        connect: { id: context.session?.itemId },
      }),
    }),
  },
  ui: {
    listView: {
      initialColumns: ['votes', 'content', 'numberOfOptions'],
    },
    hideDelete: args => !rules.canManageQuizzes(args),
  },
});
