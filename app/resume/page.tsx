import ActionBar from './components/action-bar';
import Cover from './components/cover';

export default function Resume() {
  return (
    <div className="w-[576px] relative flex-1 bg-light-blue m-auto">
      <Cover />

      <div className="w-full p-4 absolute bottom-0">
        <ActionBar />
      </div>
    </div>
  );
}
