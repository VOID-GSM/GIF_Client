import Link from 'next/link';
import Logo from '@/shared/asset/img/gif_logo.png';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="h-20 w-full flex justify-center items-center border-b border-gray-70 bg-white">
      <Link href="/">
        <Image src={Logo} alt="홈으로 이동" width={61} height={56} priority />
      </Link>
    </header>
  );
}
