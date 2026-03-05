'use client';

import Image from 'next/image';
import Logo from '@/shared/asset/img/gif_logo.png';
import Input from '@/shared/ui/input/Input';
import Button from '@/shared/ui/button/Button';
import SelectButton from '@/shared/ui/button/SelectButton';
import { useState } from 'react';

const ROLE_OPTIONS = ['팀장', '팀원'] as const;
type Role = (typeof ROLE_OPTIONS)[number];

export default function SignupView() {
  const [name, setName] = useState<string>('');
  const [roomCode, setRoomCode] = useState<string>('');
  const [role, setRole] = useState<Role | null>(null);

  const isReady = name.trim() !== '' && roomCode.trim() !== '' && role !== null;

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F7FFFC]">
      <div className="w-125 h-112.5 flex flex-col items-center gap-10 bg-white border border-gray-80 rounded-[10px] px-12.5 pb-13.5 pt-19">
        <Image src={Logo} alt="GIF LOGO" width={100} height={66} priority />
        <form className="flex flex-col gap-5">
          <Input placeholder="이름을 입력하세요" onChange={(e) => setName(e.target.value)} />
          <Input
            placeholder="학번 예)1215"
            type="number"
            onChange={(e) => setRoomCode(e.target.value)}
          />
          <div className="flex gap-2">
            {ROLE_OPTIONS.map((option) => (
              <SelectButton key={option} selected={role === option} onClick={() => setRole(option)}>
                {option}
              </SelectButton>
            ))}
          </div>
          <Button disabled={!isReady} onClick={() => {}}>
            시작하기
          </Button>
        </form>
      </div>
    </div>
  );
}

// 'use client';

// import { useState } from 'react';
// import Input from '@/shared/ui/input/Input';
// import Button from '@/shared/ui/button/Button';

// const ROLE_OPTIONS = ['팀장', '팀원'] as const;
// type Role = (typeof ROLE_OPTIONS)[number];

// export default function LoginPage() {
//   const [name, setName] = useState<string>('');
//   const [roomCode, setRoomCode] = useState<string>('');
//   const [role, setRole] = useState<Role | null>(null);

//   const isReady = name.trim() !== '' && roomCode.trim() !== '' && role !== null;

//   return (
//     <div className="min-h-screen bg-[#edfaf6] flex items-center justify-center">
//       <div className="bg-white rounded-xl shadow-md px-9 py-10 w-full max-w-xs flex flex-col gap-3">
//         <h1 className="text-[#6dc8a0] text-3xl font-bold text-center tracking-widest mb-2">GIF</h1>

//         <Input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="이름을 입력하세요"
//         />

//         <Input
//           value={roomCode}
//           onChange={(e) => setRoomCode(e.target.value)}
//           placeholder="방번 예)1215"
//         />

//         {/* 팀장/팀원 — Button 두 개, 한 개만 selected */}
//         <div className="flex gap-2">
//           {ROLE_OPTIONS.map((option) => (
//             <Button
//               key={option}
//               label={option}
//               selected={role === option}
//               onClick={() => setRole(option)}
//             />
//           ))}
//         </div>

//         {/* 시작하기 — 모두 입력 시 활성화 */}
//         <Button
//           label="시작하기"
//           fullWidth
//           disabled={!isReady}
//           selected={isReady}
//           onClick={() => {
//             if (isReady) alert(`${name}님 (${role}), 방(${roomCode}) 입장`);
//           }}
//         />
//       </div>
//     </div>
//   );
// }
