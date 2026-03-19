'use client';
import { useState } from 'react';
import Input from '@/shared/ui/input/Input';
import ProjectButton from '@/shared/ui/button/ProjectButton';
import MemberSelect from '@/features/MemberSelect/ui/MemberSelect';
import Textarea from '@/shared/ui/input/Textarea';
import { Member } from '@/entities/member/model/types';

export default function ProjectSetup() {
  const [projectName, setProjectName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [description, setDescription] = useState('');

  const handleAddMember = (member: Member) => {
    setSelectedMembers((prev) => {
      if (prev.some((m) => m.id === member.id)) return prev;
      return [...prev, member];
    });
  };

  const handleRemoveMember = (id: string) => {
    setSelectedMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const isFormValid =
    projectName.trim().length > 0 &&
    teamName.trim().length > 0 &&
    selectedMembers.length > 0 &&
    description.trim().length > 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <form>
        <p className="text-2xl font-medium mb-[68px]">프로젝트 생성</p>
        <div className="flex flex-col gap-[30px] w-[400px]">
          <Input
            placeholder="프로젝트 이름을 입력하세요"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <Input
            placeholder="팀명을 입력하세요"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <MemberSelect
            value="팀원을 추가하세요"
            selectedMembers={selectedMembers}
            onAddMember={handleAddMember}
            onRemoveMember={handleRemoveMember}
          />
          <Textarea
            placeholder="프로젝트 설명을 입력해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-[18px]"
          />
        </div>
        <div className="mt-[116px]">
          <ProjectButton text="프로젝트 생성하기" disabled={!isFormValid} />
        </div>
      </form>
    </div>
  );
}
