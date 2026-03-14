"use client";

import { FormSection } from "../../../widget/form/ui/formSection";
import { FileUpload } from "../../../widget/form/ui/FileUpload";
import { Calendar } from "@/features/Calendar/ui/Calendar";
import Button from "@/shared/ui/button/Button";
import { useState } from "react";

interface FormViewProps {
  deadLine?: string;
}

export default function FormView({ deadLine }: FormViewProps) {
  const [projectName, setProjectName] = useState("");
  const [projectSummary, setProjectSummary] = useState("");
  const [isCalendarDone, setIsCalendarDone] = useState(false);
  const isActive = projectName.trim() !== "" && projectSummary.trim() !== "" && isCalendarDone;

  return (
    <div 
      className="w-[600px] mx-auto min-h-full h-fit px-[50px] 
        py-[70px] bg-input overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
    >
      <h2 className="font-semibold text-2xl text-center mb-5">결과 보고서 제출</h2>
      <p className="mb-[6px] text-gray-40 font-medium">마감일: {deadLine || "불러오는 중..."} </p>
      <FormSection
        title="프로젝트 이름"
        description="프로젝트 이름을 작성해 주세요"
      >
        <textarea
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="설명을 입력하세요"
          className="w-full h-[100px]
            border border-gray-80 
            bg-white rounded-[10px] 
            px-[15px] py-[14px] mt-[15px] 
            placeholder:text-gray-40
            focus:border-main focus:outline-none
            resize-none"
        />
      </FormSection>
      
      <FormSection
        title="프로젝트 개요"
        description="프로젝트 개요를 작성해 주세요"
      >
        <textarea
          value={projectSummary}
          onChange={(e) => setProjectSummary(e.target.value)}
          placeholder="설명을 입력하세요"
          className="w-full h-[100px] 
            border border-gray-80
            bg-white rounded-[10px] 
            px-[15px] py-[14px] mt-[15px] 
            placeholder:text-gray-40
            focus:border-main focus:outline-none
            resize-none"
        />
      </FormSection>

      <FormSection
        title="팀 관련 사이트 QR코드"
        description="없으면 비워둘 것 (깃허브나 다른 사이트 등)">
        <FileUpload />
      </FormSection>

      <FormSection
        title="프로젝트 추진 일정"
        description="아이디어 계획서, 재료 신청, 프로젝트 기능 구현을 추가해 주세요"
      >
        <Calendar onChange={(done: boolean) => setIsCalendarDone(done)}/>
      </FormSection>

      <div className="flex flex-col gap-5 mt-[20px] pb-[50px] text-xl font-medium">
        <Button type="submit" disabled={!isActive}>
          제출하기
        </Button>
        
        <Button type="button" variant="sub">
          취소하기
        </Button>
      </div>
    </div>
  );
}