'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { MOCK_MEMBERS } from '../model/tempData';
import Badge from '@/shared/ui/Badge';
import { Member } from '@/entities/member/model/types';

interface MemberItemProps {
  id: string;
  name: string;
  onClick: () => void;
}

interface MemberSelectProps {
  value: string;
  selectedMembers: Member[];
  onAddMember: (member: Member) => void;
  onRemoveMember: (id: string) => void;
}

function MemberItem({ id, name, onClick }: MemberItemProps) {
  return (
    <p onClick={onClick} className="text-md cursor-pointer">
      {id} {name}
    </p>
  );
}

export default function MemberSelect({
  value,
  selectedMembers = [],
  onAddMember,
  onRemoveMember,
}: MemberSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const selectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollLeft = el.scrollWidth;
    }
  }, [selectedMembers]);

  const filteredMembers = useMemo(() => {
    const selectedIds = new Set(selectedMembers.map((m) => m.id));
    const availableMembers = MOCK_MEMBERS.filter((member) => !selectedIds.has(member.id));
    const trimmedSearchTerm = searchTerm.trim();
    if (trimmedSearchTerm === '') {
      return availableMembers;
    }
    const lowercasedSearchTerm = trimmedSearchTerm.toLowerCase();
    return availableMembers.filter(
      (member) =>
        member.id.toLowerCase().startsWith(lowercasedSearchTerm) ||
        member.name.toLowerCase().includes(lowercasedSearchTerm),
    );
  }, [selectedMembers, searchTerm]);

  const handleMemberClick = (member: Member) => {
    if (!selectedMembers.find((m) => m.id === member.id)) {
      onAddMember(member);
    }
  };

  return (
    <div className="relative w-[400px]" ref={selectRef}>
      <div
        className={`w-full h-[50px] border px-3 rounded-[10px] cursor-pointer placeholder:text-gray-40 text-[18px] font-medium flex gap-1 items-center
          flex-nowrap overflow-x-auto whitespace-nowrap scrollbar-hide border-gray-60`}
        onClick={() => setIsOpen(!isOpen)}
        ref={containerRef}
      >
        {selectedMembers.length > 0 ? (
          selectedMembers.map((member) => (
            <Badge key={member.id} id={member.id} name={member.name} onRemove={onRemoveMember} />
          ))
        ) : (
          <span className="text-gray-40">{value}</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-100 h-[150px] overflow-y-auto bg-main-card shadow-[1px_1px_20px_rgba(0,0,0,0.2)] rounded-[5px]">
          <input
            type="text"
            placeholder="팀원을 검색하세요"
            value={searchTerm || ''}
            className="w-90 h-9 ml-3 border-b border-gray-80 text-md placeholder:text-gray-40 focus:outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="w-full flex flex-col px-3 py-1 gap-[5px]">
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <MemberItem
                  key={member.id}
                  id={member.id}
                  name={member.name}
                  onClick={() => {
                    handleMemberClick(member);
                    setSearchTerm('');
                  }}
                />
              ))
            ) : (
              <div className="text-md">검색 결과가 없습니다.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
