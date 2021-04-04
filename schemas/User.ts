import { list } from '@keystone-next/keystone/schema';
import { text, integer, password, relationship } from '@keystone-next/fields';
import { permissions, rules } from '../access';

export const User = list({
  access: {
    create: true,
    read: rules.canManageUsers,
    update: rules.canManageUsers,
    delete: permissions.canManageUsers,
  },
  fields: {
    name: text({ isRequired: true }),
    email: text({ isRequired: true, isUnique: true }),
    password: password({ isRequired: true }),
    totalScore: integer({ defaultValue: 0 }),
    currentWeekScore: integer({ defaultValue: 0 }),
    votedOnQuizzes: relationship({ ref: 'Quiz.usersVoted', many: true }),
    votedOnQuestions: relationship({ ref: 'Question.usersVoted', many: true }),
    votedOnOptions: relationship({ ref: 'Option.usersVoted', many: true }),
    answeredQuestions: relationship({
      ref: 'Question.usersAnswered',
      many: true,
    }),
    role: relationship({
      ref: 'Role.assignedTo',
      access: {
        create: permissions.canManageUsers,
        update: permissions.canManageUsers,
      },
    }),
    quizzes: relationship({ ref: 'Quiz.userCreated', many: true }),
    questions: relationship({ ref: 'Question.userCreated', many: true }),
    options: relationship({ ref: 'Option.userCreated', many: true }),
  },
  ui: {
    listView: {
      initialColumns: ['name', 'role', 'currentWeekScore', 'totalScore'],
    },
    hideCreate: args => !permissions.canManageUsers(args),
    hideDelete: args => !permissions.canManageUsers(args),
    isHidden: args => !permissions.canManageUsers(args),
  },
});
