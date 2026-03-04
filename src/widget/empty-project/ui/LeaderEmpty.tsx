import CreateProjectButton from '@/features/create-project/ui/CreateProjectButton';

export default function LeaderEmpty() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <p className="font-medium text-2xl text-gray-40">아직 참여한 프로젝트가 없습니다.</p>
      <CreateProjectButton />
    </div>
  );
}
