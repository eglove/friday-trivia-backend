import { checkbox } from '@keystone-next/fields';

export const permissionFields = {
  canManageQuizzes: checkbox({
    defaultValue: false,
    label: 'User can update and delete any quiz/question/option.',
  }),
  canSeeOtherUsers: checkbox({
    defaultValue: false,
    label: 'User can query other users.',
  }),
  canManageUsers: checkbox({
    defaultValue: false,
    label: 'User can edit other users.',
  }),
  canManageRoles: checkbox({
    defaultValue: false,
    label: 'User can CRUD roles.',
  }),
};

export type Permission = keyof typeof permissionFields;

export const permissionsList: Permission[] = Object.keys(
  permissionFields
) as Permission[];
