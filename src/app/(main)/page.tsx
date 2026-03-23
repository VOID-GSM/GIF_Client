import EmptyProject from '@/widget/empty-project/ui';
import { User } from '@/entities/user/model/types';
import { Project } from '@/entities/project/model/types';
import MainView from '@/view/main/ui/MainView';

const MOCK_PROJECT: Project = {
  id: '1',
  name: 'GIF',
  teamName: 'VOID',
  description:
    'GIF는 광주소프트웨어마이스터고 아이디어페스티벌 관리 서비스로 프로젝트 관리와 관련 서류 제출, 점수 부여 등의 편의를 제공합니다.',
  logoUrl: undefined,
  leaderId: '1',
  members: [
    { id: '1', name: '김민아', studentId: '2202', role: 'LEADER', joinedAt: '2024-01-01' },
    { id: '2', name: '김지유', studentId: '2204', role: 'MEMBER', joinedAt: '2024-01-01' },
    { id: '3', name: '김수빈', studentId: '2110', role: 'MEMBER', joinedAt: '2024-01-01' },
  ],
  createdAt: '2024-01-01',
};

async function getCurrentUser(): Promise<User> {
  return {
    id: '1',
    email: 'test@example.com',
    name: '홍길동',
    studentId: '1205',
    role: 'LEADER',
  };
}

async function getUserProject(): Promise<Project | null> {
  // 빈 프로젝트 볼 때
  // return null;
  // 프로젝트 있는 상태 볼 때 → 위 return null 지우고 아래 주석 해제
  return MOCK_PROJECT;
}

export default async function MainPage() {
  const user = await getCurrentUser();
  const project = await getUserProject();

  if (!project) {
    return <EmptyProject role={user.role} />;
  }

  return <MainView project={project} currentUserId={user.id} />;
}
