'use client';

import { useEffect } from 'react';

export default function GroupBy({
  options,
  groupKey,
  onChange,
}: {
  options: GroupOptionItem[];
  groupKey: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {options?.map((option: GroupOptionItem) => (
        <div
          key={option?.key}
          className={`px-2 py-1.5 rounded-lg flex gap-1 ${
            option?.key === groupKey ? 'bg-light-blue text-blue' : 'text-secondary'
          } cursor-pointer hover:bg-light-blue hover:text-blue transition-all duration-300`}
          onClick={() => onChange(option?.key)}
        >
          <span className="size-4">{option?.icon}</span>
          <span className="text-small">{option?.text}</span>
        </div>
      ))}
    </div>
  );
}
