import { Member } from '@/entities/member/model/types';

export interface Project {
  id: string;
  name: string;
  teamName: string;
  logoUrl: string;
  leaderId: string;
  members: Member[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectData {
  name: string;
  teamName: string;
  description: string;
  memberIds: string[];
}

export interface UpdateProjectData {
  name?: string;
  teamName?: string;
  description?: string;
  logoUrl?: string;
  memberIds?: string[];
}
