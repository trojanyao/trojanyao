import Image from 'next/image';

import CollaborationMap from '@/public/imgs/resume/collaboration.svg';

export default function Collaboration() {
  return (
    <div className="w-full aspect-[504/288] relative overflow-visible">
      <Image
        src={CollaborationMap}
        alt="Collaboration Map"
        style={{ width: '110%', maxWidth: '110%', height: 'auto' }}
        className="absolute top-0 left-1/2 -translate-x-1/2"
      />
    </div>
  );
}
