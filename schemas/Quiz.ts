import { list } from '@keystone-next/keystone/schema';
import { timestamp, integer, text, relationship } from '@keystone-next/fields';

export const Quiz = list({
  fields: {
    subject: text({ isRequired: true }),
    week: timestamp({
      isRequired: true,
    }),
    votes: integer(),
    question: relationship({ ref: 'Question.quiz', many: true }),
  },
  ui: {
    listView: {
      initialColumns: ['votes', 'subject', 'week'],
    },
  },
});
