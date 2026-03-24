'use client';

import { useState } from 'react';
import { RankingModal } from "@/features/ranking/modal/RankingModal";

export default function RankingTestPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-8 text-gray-800">
        랭킹 모달 테스트 페이지
      </h1>

      <button
        onClick={openModal}
        className="px-6 py-3 bg-main text-white rounded-xl font-bold hover:opacity-90"
      >
        랭킹 모달 열기
      </button>

      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm" 
            onClick={closeModal}
          />

          <div className="relative z-10 animate-in fade-in zoom-in duration-200">
            <RankingModal onClose={closeModal} />
          </div>
        </div>
      )}
    </main>
  );
}