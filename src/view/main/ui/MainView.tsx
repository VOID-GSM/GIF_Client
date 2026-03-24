'use client';

import { useState } from 'react';
import { Project } from '@/entities/project/model/types';
import ProjectHeader from '@/widget/main/ui/ProjectHeader';
import MemberList from '@/widget/main/ui/MemberList';
import EditableField from '@/shared/ui/EditableField';
import { MOCK_MEMBERS } from '@/features/MemberSelect/model/tempData';

interface Props {
  project: Project;
  currentUserId: string;
}

export default function MainView({ project: initial, currentUserId }: Props) {
  const [project, setProject] = useState(initial);
  const isLeader = project.leaderId === currentUserId;

  const update = (patch: Partial<Project>) => setProject((prev) => ({ ...prev, ...patch }));

  return (
    <div className="flex flex-col gap-5 w-full max-w-[500px]">
      <ProjectHeader
        name={project.name}
        teamName={project.teamName}
        logoUrl={project.logoUrl}
        editable={isLeader}
        onUpdateName={(name) => update({ name })}
        onUpdateTeamName={(teamName) => update({ teamName })}
        onUpdateLogo={(file) => console.log('logo file:', file)}
      />

      <MemberList
        members={project.members}
        availableMembers={MOCK_MEMBERS}
        editable={isLeader}
        onUpdate={(members) => update({ members })}
      />

      <EditableField
        value={project.description}
        onSave={(description) => update({ description })}
        editable={isLeader}
        multiline
        className="text-[20px]"
        pencilSize={{ width: '13', height: '17.7' }}
      />
    </div>
  );
}
