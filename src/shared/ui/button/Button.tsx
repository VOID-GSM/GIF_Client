interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  width?: string;
  height?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'main' | 'sub';
}

export default function Button({
  children,
  type = 'button',
  disabled = false,
  width = 'w-full',
  height = 'h-12.5',
  variant = 'main',
  onClick,
}: ButtonProps) {
  const base = 'rounded-[10px] text-2xl font-semibold';

  const variantStyle = disabled ? 'bg-gray-100 text-white' : variant === 'sub' 
    ? 'bg-gray-100 cursor-pointer'
    : 'bg-main text-white cursor-pointer';
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variantStyle} ${width} ${height}`}
    >
      {children}
    </button>
  );
}
