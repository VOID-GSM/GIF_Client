'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/entities/project/model/types';
import ProjectHeader from '@/widget/main/ui/ProjectHeader';
import MemberList from '@/widget/main/ui/MemberList';
import EditableField from '@/shared/ui/EditableField';
import { MOCK_MEMBERS } from '@/features/MemberSelect/model/tempData';
import Button from '@/shared/ui/button/Button';
import { RankingModal } from '@/features/ranking/ui/RankingModal';
import { RANKING_OPEN_DATE } from '@/shared/constants/date';

interface Props {
  project: Project;
  currentUserId: string;
}

const TARGET_DATE = new Date(RANKING_OPEN_DATE);

export default function MainView({ project: initial, currentUserId }: Props) {
  const [project, setProject] = useState(initial);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isShowRankingButton = new Date() >= TARGET_DATE;
  const isLeader = project.leaderId === currentUserId;

  useEffect(() => {
    if (!isModalOpen) return;

    document.body.classList.add('overflow-hidden');
    
    return () => { document.body.classList.remove('overflow-hidden'); };
  }, [isModalOpen]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const update = (patch: Partial<Project>) => setProject((prev) => ({ ...prev, ...patch }));

  return (
    <div className="flex flex-col justify-around min-h-[calc(100vh-80px)]">
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

      {isShowRankingButton && (
        <div className="mt-70">
          <Button onClick={openModal} className='!font-medium !text-[20px]'>등수 확인</Button>
      </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-bg-opacity" onClick={closeModal} />

          <div className="relative z-10 animate-in fade-in zoom-in duration-200">
            <RankingModal onClose={closeModal} />
          </div>
        </div>
      )}
    </div>
  );
}
