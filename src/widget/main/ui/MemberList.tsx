'use client';

import { useEffect, useMemo, useRef, useState, KeyboardEvent } from 'react';
import { Member } from '@/entities/member/model/types';
import Plus from '@/shared/asset/svg/Plus';
import Deleted from '@/shared/asset/svg/Deleted';

interface MemberListProps {
  members: Member[];
  availableMembers: Member[];
  editable: boolean;
  onUpdate: (members: Member[]) => void;
}

export default function MemberList({
  members,
  availableMembers = [],
  editable,
  onUpdate,
}: MemberListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return availableMembers.filter((c) => {
      const isAlreadyMember = members.some((m) => m.studentId === c.studentId);
      const matchesSearch =
        c.name.toLowerCase().includes(normalized) || c.studentId.includes(normalized);
      return !isAlreadyMember && matchesSearch && c.role !== 'LEADER';
    });
  }, [availableMembers, members, search]);

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
    if (members.some((m) => m.studentId === candidate.studentId)) return;
    onUpdate([...members, candidate]);
    setIsOpen(false);
    setSearch('');
  };

  const handleRemove = (studentId: string) => {
    onUpdate(members.filter((m) => m.studentId !== studentId));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && filtered.length > 0) {
      e.preventDefault();
      handleAdd(filtered[0]);
    }
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
            {editable && m.role !== 'LEADER' && (
              <button
                type="button"
                onClick={() => handleRemove(m.studentId)}
                className="cursor-pointer"
              >
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
              className="w-[40px] h-[30px] rounded-[20px] bg-green-70 flex items-center justify-center cursor-pointer"
            >
              <Plus />
            </button>

            {isOpen && (
              <div className="absolute z-50 top-[36px] left-0 rounded-[8px]">
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
                <div className="bg-main-card w-[120px] max-h-[88px] overflow-y-auto scrollbar-hide rounded-[5px] shadow-[1px_1px_20px_0_rgba(0,0,0,0.2)]">
                  {filtered.length > 0 ? (
                    filtered.map((c, index) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleAdd(c)}
                        className={`w-full text-left px-3 py-1 text-xs hover:bg-gray-100 cursor-pointer ${index === 0 ? 'rounded-t-[5px]' : ''} ${index === filtered.length - 1 ? 'rounded-b-[5px]' : ''}`}
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
