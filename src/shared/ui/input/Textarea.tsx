interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({ value, onChange, placeholder }: TextareaProps) {
  return (
    <textarea 
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full h-[143px] border border-[#787878] px-[15px] py-3 rounded-[10px] focus:outline-none text-black text-[18px] font-medium placeholder:text-[#8B8B8B] resize-none mt-[18px] scrollbar-hide"
    ></textarea>
  )
}