import { UserRole } from '@/entities/user/model/types';
import LeaderEmpty from './LeaderEmpty';
import MemberEmpty from './MemberEmpty';

interface EmptyProjectProps {
  role: UserRole;
}

export default function EmptyProject({ role }: EmptyProjectProps) {
  return role === 'LEADER' ? <LeaderEmpty /> : <MemberEmpty />;
}
