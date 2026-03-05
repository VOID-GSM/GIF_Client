interface ButtonProps {
  children: string;
  width?: string;
  height?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  disabled = false,
  width = 'w-100',
  height = 'h-12.5',
  onClick,
}: ButtonProps) {
  const base = 'rounded-[10px] text-2xl font-semibold';

  const variant = disabled ? 'bg-[#E6E6E6] text-white' : 'bg-main-60 text-white cursor-pointer';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variant} ${width} ${height}`}
    >
      {children}
    </button>
  );
}
