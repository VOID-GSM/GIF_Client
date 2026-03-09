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

  const variant = selected ? 'bg-main-20 border-main-50' : 'bg-gray-100 border-gray-30';

  return (
    <button type="button" onClick={onClick} className={`${base} ${variant} ${width} ${height}`}>
      {children}
    </button>
  );
}
