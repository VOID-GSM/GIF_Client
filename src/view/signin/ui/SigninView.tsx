import Image from 'next/image';
import Logo from '@/shared/asset/img/gif_logo.png';
import GoogleLoginButton from '@/widget/signin/ui/GoogleLoginButton';

export default function SigninView() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-[#F7FFFC]">
      <div className="w-125 h-75 flex flex-col items-center gap-19 bg-white border border-gray-80 rounded-[10px] px-12.5 pb-13.5 pt-19">
        <Image src={Logo} alt="GIF LOGO" width={100} height={66} priority />
        <GoogleLoginButton />
      </div>
    </div>
  );
}
