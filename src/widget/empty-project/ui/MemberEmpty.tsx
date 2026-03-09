export default function MemberEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-1.5">
      <p className="font-medium text-2xl text-gray-40">아직 참여한 프로젝트가 없습니다.</p>
      <p className="font-medium text-gray-60">팀장이 프로젝트를 생성하면 자동으로 참여됩니다</p>
    </div>
  );
}
