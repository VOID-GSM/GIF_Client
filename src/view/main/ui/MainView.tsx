import EmptyProject from '@/widget/empty-project/ui';
import { User } from '@/entities/user/model/types';
import { Project } from '@/entities/project/model/types';

async function getCurrentUser(): Promise<User> {
  return {
    id: '1',
    email: 'jiyu@gmail.com',
    name: '김지유',
    studentId: '1205',
    role: 'LEADER',
  };
}

async function getUserProject(): Promise<Project | null> {
  return null;
}

export async function MainView() {
  const user = await getCurrentUser();
  const project = await getUserProject();

  if (!project) {
    return <EmptyProject role={user.role} />;
  }

  // 프로젝트 있는 경우(아직 구현 안함)
  return null;
}
