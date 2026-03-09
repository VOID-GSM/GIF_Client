export interface Member {
  id: string;
  name: string;
  studentId: string;
  role: 'LEADER' | 'MEMBER';
  joinedAt: string; //프로젝트 참여 날짜
}
