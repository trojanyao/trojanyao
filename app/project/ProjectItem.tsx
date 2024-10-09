import Image from 'next/image';

import Duomo from '@/public/2023.11 多墨智能.png';
import Logo_Duomo from '@/public/Logo_Duomo.svg';
import ProductType from './components/ProductType';
import Link from 'next/link';

export default function ProjectItem() {
  return (
    <Link href="">
      <div className="w-96 min-w-96 aspect-[4/3] bg-light-gray rounded-[20px] overflow-hidden flex flex-col">
        {/* Cover */}
        <div className="flex-1 overflow-hidden">
          <Image src={Duomo} alt="多墨智能" />
        </div>

        {/* Detail */}
        <div className="p-3 flex items-center gap-3">
          {/* Logo */}
          <Image src={Logo_Duomo} alt="Logo" />

          {/* Detail */}
          <div className="flex-1 flex justify-between items-center">
            {/* Title + Text */}
            <div className="flex flex-col gap-2">
              <div className="text-[#FC578C] font-medium">多墨智能</div>
              <div className="text-secondary text-xs leading-none">
                人工智能驱动的创意工作流写作工具
              </div>
            </div>

            {/* Time + Type */}
            <div className="flex flex-col items-end gap-2">
              <div className="pr-[2px] text-right text-light text-[0.625rem]">
                2023 Q4
              </div>
              <ProductType type="Web 官网" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
