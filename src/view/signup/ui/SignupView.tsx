'use client';

import Image from 'next/image';
import Logo from '@/shared/asset/img/gif_logo.png';
import Input from '@/shared/ui/input/Input';
import Button from '@/shared/ui/button/Button';
import SelectButton from '@/shared/ui/button/SelectButton';
import { useState } from 'react';
import { Role, ROLE_OPTIONS } from '@/view/signup/constants/Role';

export default function SignupView() {
  const [name, setName] = useState<string>('');
  const [studentId, setStudentId] = useState<string>('');
  const [role, setRole] = useState<Role | null>(null);

  const isReady = name.trim() !== '' && studentId.trim() !== '' && role !== null;

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-bg-main">
      <div className="w-125 h-112.5 flex flex-col items-center justify-center gap-10 bg-white border border-gray-80 rounded-[10px]">
        <Image src={Logo} alt="GIF LOGO" width={100} height={66} priority />
        <form className="flex flex-col gap-5">
          <Input
            value={name}
            placeholder="이름을 입력하세요"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            value={studentId}
            placeholder="학번 예)1215"
            type="number"
            onChange={(e) => setStudentId(e.target.value)}
          />
          <div className="flex gap-5">
            {ROLE_OPTIONS.map((option) => (
              <SelectButton key={option} selected={role === option} onClick={() => setRole(option)}>
                {option}
              </SelectButton>
            ))}
          </div>
          <Button disabled={!isReady} type="submit">
            시작하기
          </Button>
        </form>
      </div>
    </div>
  );
}
