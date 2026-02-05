import Image from 'next/image';
import Link from 'next/link';

import GitHubLogo from '@/public/icons/github.svg';

const GITHUB_LINK = 'https://github.com/trojanyao/';

export default function GitHubLink() {
  return (
    <Link href={GITHUB_LINK} target="_blank" className="group">
      <Image
        src={GitHubLogo}
        alt="TROJAN's GitHub"
        className="size-6 opacity-50 group-hover:opacity-100 transition-opacity duration-200"
      />
    </Link>
  );
}
