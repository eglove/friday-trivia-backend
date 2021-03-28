import { list } from '@keystone-next/keystone/schema';
import { select } from '@keystone-next/fields';

export const TriviaState = list({
  fields: {
    status: select({
      options: [
        { label: 'Voting', value: 'voting' },
        { label: 'Trivia', value: 'trivia' },
        { label: 'Results', value: 'results' },
      ],
    }),
  },
  ui: {
    listView: {
      initialColumns: ['status'],
    },
  },
});
