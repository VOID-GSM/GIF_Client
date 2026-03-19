interface ProjectButtonProps {
  text: string;
  disabled: boolean;
  onClick?: () => void;
}

export default function ProjectButton({ text, disabled, onClick }: ProjectButtonProps) {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`w-[400px] h-10 rounded-[10px] text-white font-medium text-[20px]
        ${disabled ? 'bg-[#e6e6e6]' : 'bg-main cursor-pointer'}`}
    >
      {text}
    </button>
  );
}
