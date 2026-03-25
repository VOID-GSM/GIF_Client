'use client';

import { Cancel } from '@/shared/asset/svg/Cancel';
import Button from '@/shared/ui/button/Button';
import { useState } from 'react';
import { GRADE_1_RANKING, GRADE_2_RANKING } from '../model/rankData';


interface RankingModalProps {
  onClose?: () => void;
}

const HEIGHT_RANKBAR: Record<number, string> = {
  1: "121px",
  2: "69px",
  3: "35px",
}

const getPodiumRankings = (grade: number) => {
  const rawData = grade === 1 ? GRADE_1_RANKING : GRADE_2_RANKING;
  const podiumOrder = [2, 1, 3];
  
  return [...rawData]
  .filter((item) => item.rank <= 3)
  .sort((a, b) => podiumOrder.indexOf(a.rank) - podiumOrder.indexOf(b.rank));
};

export const RankingModal = ({ onClose }: RankingModalProps) => {
  const [activeGrade, setActiveGrade] = useState<number>(1);
  const displayRankings = getPodiumRankings(activeGrade);
  
  return (
    <div className="relative w-[350px] bg-white rounded-[20px] p-4 shadow-lg flex flex-col items-center">
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 cursor-pointer"
      >
        <Cancel />
      </button>

      <div className="flex items-end justify-center gap-7 mb-8 h-[180px]">
        {displayRankings.map((item) => (
          <div key={item.rank} className="flex flex-col items-center w-[60px]">
            <span className="font-medium text-xl">{item.name}</span>
            <div 
              style={{ height: HEIGHT_RANKBAR[item.rank] }}
              className="w-15 rounded-t-2xl rounded-b bg-gradient-to-t from-main to-green-50"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-[50px] mb-[43px]">
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
              variant="tab" 
              width="w-[100px]"
              height="h-[35px]"
              className={`text-sm font-normal rounded-none ${
                activeGrade === grade ? "font-bold" : "" 
              }`}
            >
              {grade}학년
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};