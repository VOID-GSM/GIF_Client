export const ROLE_OPTIONS = ['팀장', '팀원'] as const;
export type Role = (typeof ROLE_OPTIONS)[number];
