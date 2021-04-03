import { list } from '@keystone-next/keystone/schema';
import { checkbox, integer, relationship, text } from '@keystone-next/fields';
import { isSignedIn, rules } from '../access';

export const Option = list({
  access: {
    create: isSignedIn,
    read: true,
    update: rules.canManageQuizzes,
    delete: rules.canManageQuizzes,
  },
  fields: {
    content: text({ isRequired: true }),
    votes: integer({ defaultValue: 1 }),
    isCorrect: checkbox({ isRequired: true, defaultValue: false }),
    question: relationship({ ref: 'Question.option' }),
    usersVoted: relationship({ ref: 'User.votedOnOptions', many: true }),
    userCreated: relationship({
      ref: 'User.options',
      // Default user id when question is created
      defaultValue: ({ context }) => ({
        connect: { id: context.session?.itemId },
      }),
    }),
  },
  ui: {
    listView: {
      initialColumns: ['votes', 'content', 'question', 'isCorrect'],
    },
    hideDelete: args => !rules.canManageQuizzes(args),
  },
});
