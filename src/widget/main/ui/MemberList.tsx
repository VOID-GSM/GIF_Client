'use client';

import { useEffect, useRef, useState } from 'react';
import { Member } from '@/entities/member/model/types';
import Plus from '@/shared/asset/svg/Plus';
import Deleted from '@/shared/asset/svg/Deleted';
import { KeyboardEvent } from 'react';

interface MemberListProps {
  members: Member[];
  availableMembers: Member[];
  editable: boolean;
  onUpdate: (members: Member[]) => void;
}

export default function MemberList({
  members,
  availableMembers = [], // ✅ 안전 처리
  editable,
  onUpdate,
}: MemberListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔥 검색 필터 (개선: trim + 소문자)
  const normalized = search.trim().toLowerCase();

  const filtered = availableMembers.filter((c) => {
    const isAlreadyMember = members.some((m) => m.studentId === c.studentId);

    const matchesSearch =
      c.name.toLowerCase().includes(normalized) || c.studentId.includes(normalized);

    return !isAlreadyMember && matchesSearch;
  });

  // 🔥 Enter → 첫 번째 항목 추가
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filtered.length > 0) {
      e.preventDefault();
      handleAdd(filtered[0]);
    }
  };

  // 🔥 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAdd = (candidate: Member) => {
    onUpdate([...members, candidate]);
    setIsOpen(false);
    setSearch('');
  };

  const handleRemove = (studentId: string) => {
    onUpdate(members.filter((m) => m.studentId !== studentId));
  };

  return (
    <div className="flex items-start gap-[10px]">
      <p className="text-[20px] shrink-0">팀원:</p>

      <div className="flex flex-wrap items-center gap-[13px]">
        {members.map((m) => (
          <div
            key={m.id}
            className="w-[120px] h-[30px] bg-high-emphasis rounded-[20px] flex items-center justify-center font-medium gap-2"
          >
            {m.studentId} {m.name}
            {editable && (
              <button type="button" onClick={() => handleRemove(m.studentId)}>
                <Deleted />
              </button>
            )}
          </div>
        ))}

        {editable && (
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="w-[40px] h-[30px] rounded-[20px] bg-green-70 flex items-center justify-center"
            >
              <Plus />
            </button>

            {isOpen && (
              <div className="absolute z-50 top-[36px] left-0 rounded-[8px]">
                {/* 검색 input */}
                <div className="bg-white w-[120px] h-[30px] px-[9px] flex items-center border border-gray-80 rounded-[5px]">
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="추가하기"
                    className="bg-transparent w-full text-[13px] outline-none placeholder:text-gray-40"
                  />
                </div>

                {/* 리스트 */}
                <div className="bg-main-card w-[120px] max-h-[88px] overflow-y-auto scrollbar-hide rounded-[5px] shadow-[1px_1px_20px_0_rgba(0,0,0,0.2)]">
                  {filtered.length > 0 ? (
                    filtered.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleAdd(c)}
                        className="w-full text-left px-3 py-1 text-xs hover:bg-gray-100"
                      >
                        {c.studentId} {c.name}
                      </button>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-[13px]">결과 없음</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
