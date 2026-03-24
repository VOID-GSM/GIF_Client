'use client';

import { Cancel } from "@/shared/asset/svg/Cancel";
import Button from "@/shared/ui/button/Button";
import { useState } from "react";

interface RankingModalProps {
  onClose?: () => void;
}

export const RankingModal = ({ onClose }: RankingModalProps) => {
  const [activeGrade, setActiveGrade] = useState<number>(1);
  const rankings = activeGrade === 1 
    ? [
        { name: "B", height: "69px", rank: 2 },
        { name: "A", height: "121px", rank: 1 },
        { name: "C", height: "35px", rank: 3 },
      ] 
    : [
        { name: "E", height: "69px", rank: 2 },
        { name: "D", height: "121px", rank: 1 },
        { name: "F", height: "35px", rank: 3 },
      ];

  return (
    <div className="relative w-[350px] bg-white rounded-[20px] p-10 shadow-lg flex flex-col items-center">
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 cursor-pointer"
      >
        <Cancel />
      </button>

      <div className="flex items-end justify-center gap-7 mb-8 h-[180px]">
        {rankings.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="font-medium text-xl">{item.name}</span>
            <div 
              style={{ height: item.height }}
              className="w-15 rounded-t-2xl rounded-b bg-gradient-to-t from-main to-green-50"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-[50px]">
        {[1, 2].map((grade) => (
          <div 
            key={grade}
            className={`rounded-[10px] overflow-hidden border transition-all ${
              activeGrade === grade 
                ? "border-main bg-green-70 text-black shadow-[0_0_0_0.5px_#31c690]" 
                : "border-gray-70 bg-high-emphasis text-gray-40"
            }`}
          >
            <Button
              onClick={() => setActiveGrade(grade)}
              variant={activeGrade === grade ? "main" : "sub"}
              className="!bg-transparent !text-inherit !w-[100px] !h-[35px] !text-sm !font-normal !rounded-none !border-none"
            >
              {grade}학년
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};