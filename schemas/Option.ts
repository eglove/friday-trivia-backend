import { list } from '@keystone-next/keystone/schema';
import {integer, relationship, text} from '@keystone-next/fields';

export const Option = list({
  fields: {
    content: text({ isRequired: true }),
    votes: integer(),
    question: relationship({ref: 'Question.option', many: true})
  },
  ui: {
    listView: {
      initialColumns: ['votes', 'content']
    }
  }
});
