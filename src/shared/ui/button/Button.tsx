interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  width?: string;
  height?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  children,
  type = 'button',
  disabled = false,
  width = 'w-100',
  height = 'h-12.5',
  onClick,
}: ButtonProps) {
  const base = 'rounded-[10px] text-2xl font-semibold';

  const variant = disabled ? 'bg-[#E6E6E6] text-white' : 'bg-main-60 text-white cursor-pointer';
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variant} ${width} ${height}`}
    >
      {children}
    </button>
  );
}
