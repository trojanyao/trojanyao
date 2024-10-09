import { ExclamationTriangleIcon } from '@heroicons/react/16/solid';

export default function StatusDown() {
  return (
    <div className="size-14 relative flex justify-center items-center">
      <div className="bg-[#FFF4DB]/90 p-2 rounded-full cursor-pointer peer">
        <ExclamationTriangleIcon className="size-4 text-yellow" />
      </div>

      {/* Tooltip */}
      <div className="bg-[#FFF4DB] p-2 rounded-lg absolute right-[calc(100%+8px)] bottom-0 text-yellow text-center text-xs whitespace-nowrap opacity-0 peer-hover:opacity-100 transition-all duration-300 ease-out">
        由于甲方调整或其他原因
        <br />
        目前已无法访问
      </div>
    </div>
  );
}
