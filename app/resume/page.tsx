import ActionBar from './components/action-bar';
import Cover from './components/cover';
import Highlights from './components/highlights';
import Skills from './components/skills';

export default function Resume() {
  return (
    <div className="-mb-12 flex flex-col items-center">
      <div className="w-[576px] pb-[88px] -mb-[88px] relative flex-1 bg-light-blue">
        <Cover />

        <div>
          <Skills />
          <Highlights />
        </div>
      </div>

      <div className="w-[576px] p-4 mx-auto sticky bottom-0">
        <ActionBar />
      </div>
    </div>
  );
}
