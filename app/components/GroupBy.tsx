'use client';

interface GroupOptionItem {
  icon: any;
  text: string;
}

export default function GroupBy({ options }: { options: GroupOptionItem[] }) {
  const [actived, setActived] = useState<string>();

  return (
    <div className="flex items-center gap-2">
      {options?.map((option: GroupOptionItem) => (
        <div
          key={option?.text}
          className={`px-2 py-1.5 rounded-lg flex gap-1 ${
            option?.text === actived
              ? 'bg-light-blue text-blue'
              : 'text-secondary'
          } cursor-pointer hover:bg-light-blue hover:text-blue transition-all duration-300`}
          onClick={() => setActived(option?.text)}
        >
          <span className="size-4">{option?.icon}</span>
          <span className="text-small">{option?.text}</span>
        </div>
      ))}
    </div>
  );
}
