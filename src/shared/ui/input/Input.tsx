import { ChangeEvent } from 'react';

interface InputProps {
  placeholder?: string;
  type?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function Input({ placeholder, type = 'text', value, onChange }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-100 h-12.5 bg-white border border-[#787878] rounded-[10px] py-3 px-3.75 font-medium text-lg text-black placeholder:text-[#8B8B8B] focus:outline-none"
    />
  );
}
