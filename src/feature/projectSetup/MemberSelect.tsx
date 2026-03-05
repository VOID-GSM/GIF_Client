"use client";

import { useState, useRef, useEffect } from "react";
import { MOCK_MEMBERS } from "./model/tempData";
import Badge from "@/shared/ui/Badge";

interface MemberItemProps {
  id: string;
  name: string;
  onClick: () => void;
}

function MemberItem({ id, name, onClick }: MemberItemProps) {
  return (
    <p 
      onClick={onClick}
      className="text-3 cursor-pointer"
    >
      {id} {name}
    </p>
  );
}

export default function MemberSelect({ value, selectedMembers = [], setSelectedMembers }: { value: string; selectedMembers: {id: string; name: string}[]; setSelectedMembers: React.Dispatch<React.SetStateAction<{id: string; name: string}[]>> }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  const handleMemberClick = (member: {id: string; name: string}) => {
    if (!selectedMembers.find(m => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member]);
    }
  };

  const handleRemove = (id: string) => {
    setSelectedMembers(selectedMembers.filter(m => m.id !== id));
  };

  return (
    <div className="relative w-full" ref={selectRef}>
      <div 
        className={`w-100 h-[50px] border px-3 rounded-[10px] cursor-text text-[18px] font-medium flex gap-1 items-center
          flex-nowrap overflow-x-auto whitespace-nowrap scrollbar-hide
          ${isOpen ? "border-[#000000]" : "border-[#bcbcbc]"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedMembers.length > 0 ? (
          selectedMembers.map((member) => (
            <Badge 
              key={member.id} 
              id={member.id} 
              name={member.name} 
              onRemove={handleRemove} 
            />
          ))
        ) : (
          <span className="text-[#929292]">{value}</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-100 h-[91px] overflow-y-auto bg-[#f9f9f9] shadow-[1px_1px_20px_rgba(0,0,0,0.2)] rounded-[5px]">
          <div className="w-full flex flex-col px-3 py-1 gap-[5px]">
            {MOCK_MEMBERS.map((member) => (
              <MemberItem 
                key={member.id}
                id={member.id} 
                name={member.name} 
                onClick={() => handleMemberClick(member)}
              />
            ))}
          </div>          
        </div>
      )}
    </div>
  );
}