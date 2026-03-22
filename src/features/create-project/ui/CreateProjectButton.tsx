import Link from 'next/link';

export default function CreateProjectButton() {
  return (
    <Link
      href="/project/create"
      className="flex justify-center items-center w-[25rem] h-[45px] bg-main text-white font-semibold text-2xl rounded-[10px]"
    >
      프로젝트 생성하기
    </Link>
  );
}
