import Image from 'next/image';

import Link from 'next/link';
import { ArrowTopRightOnSquareIcon, CheckIcon } from '@heroicons/react/16/solid';
import {
  CodeBracketIcon,
  DeviceTabletIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';
import StatusDown from '../components/StatusDown';
import ProductType from '../components/ProductType';
import PreviewCarousel from '../components/PreviewCarousel';
import DuomoLogo from '@/public/Logo_Duomo.svg';
import Cover from '@/public/2023.11 多墨智能.png';

import SectionHeader from '@/app/components/SectionHeader';
import SkillGrid from '@/app/skill/SkillGrid';
import Breadcrumb from '@/app/components/Breadcrumb';
import { getProject } from '@/lib/notion';
import { checkUrl } from '@/lib/utils/checkUrl';



export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const project = await getProject(params?.id);

  const breadcrumbMenus = [
    { text: '开发', url: '/dev' },
    { text: '开发项目', url: '/project' },
    { text: project?.name },
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
              <Image src={project?.logo} alt={`${project?.name} Logo`} width={64} height={64} />

              <div className="flex flex-col gap-2">
                {/* Title + Label */}
                <div className="flex items-center gap-2">
                  <div className="title-middle" style={{ color: `#${project?.color}` }}>
                    {project?.name}
                  </div>
                  {project?.type.map((t: any, i) => (
                    <ProductType key={i} type={t} />
                  ))}
                </div>

                {/* Description */}
                <span className="text-small text-light">{project?.slogan}</span>
              </div>
            </div>

            {/* Contributions */}
            {project?.work && (
              <div className="flex flex-col gap-4">
                {project?.work.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckIcon className="size-4" />
                    <span>{item?.replace('- ', '')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom */}
          <div className="flex flex-col gap-8">
            {/* Link */}
            {project?.url && (
              <Link
                href={project?.url}
                target="_blank"
                className=" w-fit p-2 rounded-lg flex items-center gap-1"
                style={{
                  background: `#${project?.color}1A`, // '1A' stand for 10% transparency in HEX
                  color: `#${project?.color}`,
                }}
              >
                <ArrowTopRightOnSquareIcon className="size-4" />
                <span className="text-small">{project?.url}</span>
              </Link>
            )}

            {/* Date */}
            <span className="text-light text-mini">{project?.date}</span>
          </div>
        </div>

        {/* Cover */}
        <div className=" relative">
          <Link
            href={project?.url || '#'}
            className="block w-[600px] max-w-[600px] h-[400px] rounded-3xl border border-secondary overflow-hidden"
          >
            <Image
              src={project?.cover}
              alt={project?.name}
              width={600}
              height={400}
              className="hover:scale-110 transition-all duration-300 ease-out"
            />
          </Link>

          <div className="absolute left-0 bottom-0">
            {project?.url && <StatusDown url={project?.url} />}
          </div>
        </div>
      </div>
    );
  }

  /* === Component: Preview === */
  function Preview() {
    let device: 'Desktop' | 'Phone' | 'Tablet' = 'Desktop';

    if (project?.type?.some((item) => ['iOS', 'Android'].includes(item))) {
      device = 'Phone';
    } else if (project?.type?.some((item) => ['iPad'].includes(item))) {
      device = 'Tablet';
    }

    return (
      <div>
        <SectionHeader
          title="真机截图"
          icon={
            device === 'Phone' ? (
              <DevicePhoneMobileIcon />
            ) : device === 'Tablet' ? (
              <DeviceTabletIcon />
            ) : (
              <ComputerDesktopIcon />
            )
          }
          color={`#${project?.color}`}
        />
        <PreviewCarousel
          data={project?.screenshots ?? []}
          width={project?.width ?? 1200}
          height={project?.height ?? 800}
        />
      </div>
    );
  }

  /* === Component: TechStack === */
  function TechStack() {
    return (
      <div>
        <SectionHeader title="技术栈" icon={<CodeBracketIcon />} color={`#${project?.color}`} />
        <SkillGrid />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb menus={breadcrumbMenus} />

      <div className="flex flex-col gap-8">
        <BasicInfo />
        <Preview />
        <TechStack />
      </div>
    </div>
  );
}
