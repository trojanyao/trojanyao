export default function ProjectCount({ count }: { count: number }) {
  return (
    <div className="bg-middle-gray px-3 py-1 rounded-full text-center text-light text-small">
      {count}
    </div>
  );
}
