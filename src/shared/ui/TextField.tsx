interface TextFieldProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TextField({ placeholder, value, onChange }: TextFieldProps) {
  return (
    <div>
      <div className="w-[400px] h-[50px]">
        <input type="text"
        value={value}
        onChange={onChange}
        className="w-full h-full border border-[#bcbcbc] px-[15px] py-3 rounded-[10px] focus:outline-none focus:border-[#000000] text-[18px] font-medium placeholder-[#8b8b8b]" 
        placeholder={placeholder}/>
      </div>
    </div>
  )
}