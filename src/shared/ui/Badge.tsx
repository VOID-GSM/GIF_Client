import Deleted from "../asset/svg/Deleted";

interface BadgeProps {
  id: string;
  name: string;
  onRemove: (id: string) => void; 
}

export default function Badge({ id, name, onRemove }: BadgeProps) {
  return (
    <div className="w-auto px-3 h-[30px] bg-high-emphasis rounded-[20px] flex items-center justify-center gap-2">
      <span className="font-medium text-[14px]">{id} {name}</span>
      <button 
        type="button"
        onClick={(e) => {
          e.stopPropagation(); 
          onRemove(id);
        }}
      >
        <Deleted />
      </button>
    </div>
  );
}