export type UserRole = 'LEADER' | 'MEMBER';

export interface User {
  id: string;
  email: string;
  name: string;
  studentId: string;
  role: UserRole;
}

export interface SignupData {
  name: string;
  studentId: string;
  role: UserRole;
}
