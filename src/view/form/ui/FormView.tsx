import { FormSection } from "./_components/formSection";
import { FileUpload } from "./_components/FileUpload";
import { Calendar } from "@/features/Calendar/ui/Calendar";

export default function FormPage() {
  return (
    <div className="w-[600px] mx-auto h-auto px-[50px] py-[70px] bg-input">
      <h2 className="font-semibold text-2xl text-center mb-5">결과 보고서 제출</h2>
      {/* 나중에 다른 페이지에서 가져올 예정 */}
      <p className="mb-[6px] text-gray-40 font-medium">마감일:</p>
      <FormSection
        title="프로젝트 이름"
        description="프로젝트 이름을 작성해 주세요"
      >
        <textarea
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
        <Calendar />
      </FormSection>

      <div className="flex flex-col gap-5 mt-[20px] text-xl font-medium">
        <button 
          type="submit"
          className="bg-main text-white h-[45px] rounded-[10px] cursor-pointer"
        >
          제출하기
        </button>
        
        <button 
          type="button"
          className="bg-gray-100 h-[45px] rounded-[10px] cursor-pointer"
        >취소하기</button>
      </div>
    </div>
  );
}