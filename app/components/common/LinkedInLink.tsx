import Image from 'next/image';
import Link from 'next/link';

import LinkedInLogo from '@/public/icons/linkedin.svg';

const LINKEDIN_LINK = 'https://www.linkedin.com/in/trojan-yao-005992b1';

export default function LinkedInLink() {
  return (
    <Link href={LINKEDIN_LINK} target="_blank" className="group">
      <Image
        src={LinkedInLogo}
        alt="TROJAN's GitHub"
        className="size-6 opacity-50 group-hover:opacity-100 transition-opacity duration-200"
      />
    </Link>
  );
}
