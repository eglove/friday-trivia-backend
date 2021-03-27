import { list } from '@keystone-next/keystone/schema';
import { integer, relationship, text } from '@keystone-next/fields';

export const Question = list({
  fields: {
    content: text({ isRequired: true }),
    votes: integer(),
    option: relationship({ ref: 'Option.question', many: true }),
    quiz: relationship({ ref: 'Quiz.question', many: true }),
  },
  ui: {
    listView: {
      initialColumns: ['votes', 'content'],
    },
  },
});
