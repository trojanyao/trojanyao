type LineType = 'first' | 'second';

export default function Line({ type = 'first' }: { type: LineType }) {
  return (
    <div
      className={`w-full h-[1px] bg-[#D7DDE4] ${
        type === 'first' ? 'opacity-100' : 'opacity-50'
      }`}
    ></div>
  );
}
