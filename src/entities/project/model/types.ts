import { Member } from '@/entities/member/model/types';

export interface Project {
  id: string;
  name: string;
  teamName: string;
  description: string;
  logoUrl?: string;
  leaderId: string;
  members: Member[];
  createdAt: string;
  updatedAt?: string;
}

// 프로젝트 생성 (최초 1회)
export interface CreateProjectInput {
  name: string;
  teamName: string;
  description: string;
  memberIds: string[];
}

// 프로젝트 정보 수정
export interface UpdateProjectInput {
  name?: string;
  teamName?: string;
  description?: string;
  logoUrl?: string;
  // 팀원은 별도 API로 관리
}
