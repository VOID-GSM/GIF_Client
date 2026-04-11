interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  width?: string;
  height?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'main' | 'sub' | 'tab';
  className?: string;
}

const variantStyle = {
  main: 'bg-main text-white cursor-pointer',
  sub: 'bg-gray-100 cursor-pointer',
  disabled: 'bg-gray-100 text-white',
  tab: 'bg-transparent text-inherit border-none cursor-pointer'
};

export default function Button({
  children,
  type = 'button',
  disabled = false,
  width = 'w-full',
  height = 'h-12.5',
  variant = 'main',
  className = '',
  onClick,
}: ButtonProps) {
  const currentVariant = disabled ? 'disabled' : variant;
  const base = 'rounded-[10px] text-2xl font-semibold';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variantStyle[currentVariant]} ${width} ${height} ${className}`}
    >
      {children}
    </button>
  );
}
