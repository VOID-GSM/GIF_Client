import Link from 'next/link';

export default function CreateProjectButton() {
  return (
    <Link
      href="/project/create"
      className="flex justify-center items-center w-[400px] h-[45px] bg-main-60 text-white font-semibold text-2xl rounded-[10px]"
    >
      프로젝트 생성하기
    </Link>
  );
}
