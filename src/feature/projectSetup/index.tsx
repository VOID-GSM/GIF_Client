"use client";
import { useState } from "react";
import TextField from "@/shared/ui/TextField";
import ProjectButton from "@/shared/ui/ProjectButton";
import MemberSelect from "./MemberSelect";

export default function ProjectSetup(){
  const [projectName, setProjectName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<{id: string, name: string}[]>([]);
  const [description, setDescription] = useState("");

  const isFormValid = 
  projectName.trim().length > 0 && 
  teamName.trim().length > 0 && 
  selectedMembers.length > 0 && 
  description.trim().length > 0;

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <form>
        <p className="text-2xl font-medium mb-[68px]">
          프로젝트 생성
        </p>
        <div className="flex flex-col gap-[30px] w-[400px]">
          <TextField placeholder="프로젝트 이름을 입력하세요" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
          <TextField placeholder="팀명을 입력하세요" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
          <MemberSelect 
            value="팀원을 추가하세요" 
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
          />
          <textarea 
            placeholder="프로젝트 설명을 입력해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-[143px] border border-[#bcbcbc] px-[15px] py-3 rounded-[10px] focus:outline-none focus:border-[#000000] text-[18px] font-medium placeholder-[#8b8b8b] resize-none mt-[18px] scrollbar-hide"
          ></textarea>
        </div>
        <div className="mt-[116px]">
          <ProjectButton text="프로젝트 생성하기" disabled={!isFormValid} />
        </div>
      </form>
    </div>
  )
}