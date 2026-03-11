interface FormSectionProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const FormSection = ({ title, description, children }: FormSectionProps) => {
  return (
    <div className="bg-main-card border-t-5 border-main rounded-[10px] py-[30px] px-[50px] mt-5">
      <h3 className="font-semibold text-xl">{title}</h3>
      {description && <p className="font-medium text-lg text-gray-40 mt-[10px]">{description}</p>}
      {children}
    </div>
  );
};
