import Image from 'next/image';

import CollaborationMap from '@/public/imgs/resume/collaboration.svg';

export default function Collaboration() {
  return (
    <div className="w-[504px] h-[288px]">
      <Image src={CollaborationMap} alt="Collaboration Map" />
    </div>
  );
}
