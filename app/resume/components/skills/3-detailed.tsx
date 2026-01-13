import Image from 'next/image';

import SkillDetails from '@/public/imgs/resume/skill-details.webp';

export default function Detailed() {
  return <Image src={SkillDetails} alt="details" />;
}
