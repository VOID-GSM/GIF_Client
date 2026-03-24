'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import EditableField from '@/shared/ui/EditableField';
import { Upload } from '@/shared/asset/svg/Upload';
import { toast } from 'sonner';

interface ProjectHeaderProps {
  name: string;
  teamName: string;
  logoUrl?: string;
  editable: boolean;
  onUpdateName: (v: string) => void;
  onUpdateTeamName: (v: string) => void;
  onUpdateLogo: (file: File) => void;
}

export default function ProjectHeader({
  name,
  teamName,
  logoUrl,
  editable,
  onUpdateName,
  onUpdateTeamName,
  onUpdateLogo,
}: ProjectHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState(logoUrl);

  useEffect(() => {
    setPreviewUrl(logoUrl);
  }, [logoUrl]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('이미지는 5MB 이하만 업로드 가능합니다.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('이미지 파일만 업로드 가능합니다.');
      return;
    }

    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    onUpdateLogo(file);
  };

  return (
    <div className="flex flex-col">
      <div className="relative w-[70px] h-[70px] mb-[40px]">
        <button
          type="button"
          onClick={() => editable && fileInputRef.current?.click()}
          disabled={!editable}
          className="relative w-full h-full rounded-[10px] overflow-hidden flex items-center justify-center bg-white outline outline-2 outline-gray-80"
        >
          {previewUrl ? (
            <Image src={previewUrl} alt="프로젝트 로고" fill className="object-cover" />
          ) : (
            <Upload width="35" height="35" />
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleLogoChange}
        />
      </div>

      <div className="mb-[25px]">
        <EditableField
          value={name}
          onSave={onUpdateName}
          editable={editable}
          className="text-[40px] font-medium"
          pencilSize={{ width: '23', height: '32' }}
        />
      </div>
      <EditableField
        value={teamName}
        onSave={onUpdateTeamName}
        editable={editable}
        className="text-2xl font-medium"
        pencilSize={{ width: '15', height: '20' }}
      />
    </div>
  );
}
