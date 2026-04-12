import Header from '@/widget/header/ui';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <Header />
      <div className="w-full min-h-[calc(100vh-80px)] flex items-center justify-center flex-col">
        <p className="font-family-decobox text-main text-[80px]">404 ERROR</p>
        <p>죄송합니다. 페이지를 찾을 수 없습니다.</p>
        <Link href="/" className="font-medium text-main underline mt-11">
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  );
}
