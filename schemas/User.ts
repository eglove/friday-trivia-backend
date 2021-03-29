import { list } from '@keystone-next/keystone/schema';
import { text, integer, password, relationship } from '@keystone-next/fields';

export const User = list({
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password({ isRequired: true }),
    totalScore: integer({ defaultValue: 0 }),
    currentWeekScore: integer({ defaultValue: 0 }),
    votedOnQuizzes: relationship({ ref: 'Quiz.usersVoted', many: true }),
    votedOnQuestions: relationship({ ref: 'Question.usersVoted', many: true }),
    votedOnOptions: relationship({ ref: 'Option.usersVoted', many: true }),
    role: relationship({ ref: 'Role.assignedTo' }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'role', 'currentWeekScore', 'totalScore'],
    },
  },
});
