import { ListAccessArgs } from './types';
import { permissionsList } from './schemas/fields';

export function isSignedIn({ session }: ListAccessArgs): boolean {
  return !!session;
}

const generatedPermissions = Object.fromEntries(
  permissionsList.map(permission => [
    permission,
    ({ session }: ListAccessArgs): boolean =>
      session?.data.role ? !!session?.data.role?.[permission] : false,
  ])
);

export const permissions = {
  ...generatedPermissions,
};

export const rules = {
  canManageQuizzes({ session }: ListAccessArgs): boolean {
    if (permissions.canManageQuizzes({ session })) {
      return true;
    }

    return !!{ user: { id: session?.itemId } };
  },

  canManageUsers({ session }: ListAccessArgs): boolean {
    if (!session || !isSignedIn({ session })) {
      return false;
    }

    if (permissions.canManageUsers({ session })) {
      return true;
    }

    return !!{ id: session?.itemId };
  },
};
