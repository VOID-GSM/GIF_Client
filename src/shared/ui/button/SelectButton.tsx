interface SelectButtonProps {
  children: React.ReactNode;
  width?: string;
  height?: string;
  selected?: boolean;
  onClick?: () => void;
}

export default function SelectButton({
  children,
  width = 'w-47.5',
  height = 'h-8.75',
  selected = false,
  onClick,
}: SelectButtonProps) {
  const base = 'flex-1 rounded-[10px] border cursor-pointer';

  const variant = selected ? 'bg-main-20 border-main-50' : 'bg-[#E6E6E6] border-[#B5B5B5]';

  return (
    <button type="button" onClick={onClick} className={`${base} ${variant} ${width} ${height}`}>
      {children}
    </button>
  );
}
