export const ROLES = {
  PARENT: 'parent',
  MOTHER: 'mother',
  CHILD: 'child',
};

export const ACCESS_LEVELS = {
  [ROLES.PARENT]: ['read', 'write', 'delete'],
  [ROLES.MOTHER]: ['read', 'write'],
  [ROLES.CHILD]: ['read'],
};