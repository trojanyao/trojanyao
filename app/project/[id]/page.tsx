import Breadcrumb from '@/app/components/Breadcrumb';
import Image from 'next/image';

const breadcrumbMenus = [
  { text: '开发', url: '/dev' },
  { text: '开发项目', url: '/dev/projects' },
  { text: '多墨智能' },
];

import DuomoLogo from '@/public/Logo_Duomo.svg';
import Cover from '@/public/2023.11 多墨智能.png';
import ProductType from '../components/ProductType';
import Link from 'next/link';
import {
  ArrowTopRightOnSquareIcon,
  CheckIcon,
} from '@heroicons/react/16/solid';
import StatusDown from '../components/StatusDown';

export default function ProjectDetail() {
  const isAvailable = false;

  const contributions = [
    '前端开发：视觉及动效',
    '前端开发：视觉及动效',
    '前端开发：视觉及动效',
  ];

  /* === Component: BasicInfo === */
  function BasicInfo() {
    return (
      <div className="flex gap-8">
        {/* Details */}
        <div className="flex-1 p-8 pb-4 flex flex-col justify-between">
          {/* Top */}
          <div className="flex flex-col gap-9">
            {/* Header */}
            <div className="flex items-center gap-3">
              <Image src={DuomoLogo} alt="Logo" className="size-16" />

              <div className="flex flex-col gap-2">
                {/* Title + Label */}
                <div className="flex items-center gap-2">
                  <div className="title-middle text-[#F96277]">多墨智能</div>
                  <ProductType type="Web 官网" />
                </div>

                {/* Description */}
                <span className="text-small text-light">
                  人工智能驱动的创意工作流写作工具
                </span>
              </div>
            </div>

            {/* Contributions */}
            <div className="flex flex-col gap-4">
              {contributions.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckIcon className="size-4" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col gap-8">
            {/* Link */}
            <Link
              href="https://duomosmart.com/"
              target="_blank"
              className=" w-fit bg-[#F96277]/10 p-2 rounded-lg flex items-center gap-1 text-[#F96277]"
            >
              <ArrowTopRightOnSquareIcon className="size-4" />
              <span className="text-small">https://duomosmart.com/</span>
            </Link>

            {/* Date */}
            <span className="text-light text-mini">2023.11</span>
          </div>
        </div>

        {/* Cover */}
        <div className=" relative">
          <Link
            href="#"
            className="block w-[600px] max-w-[600px] h-[400px] rounded-3xl border border-secondary overflow-hidden"
          >
            {isAvailable ? (
              <iframe src="https://mindpals.com/" className="size-full" />
            ) : (
              <Image
                src={Cover}
                alt="多墨智能"
                className="w-[600px] h-[400px] hover:scale-110 transition-all duration-300 ease-out"
              />
            )}
          </Link>

          <div className="absolute left-0 bottom-0">
            <StatusDown />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb menus={breadcrumbMenus} />

      <div className="flex flex-col gap-8">
        <BasicInfo />
      </div>
    </div>
  );
}
