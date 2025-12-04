import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowTopRightOnSquareIcon, CheckIcon } from '@heroicons/react/16/solid';
import {
  CodeBracketIcon,
  DeviceTabletIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
} from '@heroicons/react/24/outline';

import SectionHeader from '@/app/components/common/SectionHeader';
import Breadcrumb from '@/app/components/ui/Breadcrumb';
import SkillGrid from '@/app/skill/components/SkillGrid';
import { getProject, getSkills } from '@/lib/notion';

import PreviewCarousel from '../components/PreviewCarousel';
import ProductType from '../components/ProductType';
import StatusDown from '../components/StatusDown';

export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const project = await getProject(params?.id);

  /**
   * Join project?.responsibilities array into a single string,
   * then use a regular expression to split it into an array based on ordered list markers like "1. ", "2. ", etc.
   */
  let orderedResponsibilities: string[] | undefined = undefined;
  if (project?.responsibilities && Array.isArray(project.responsibilities)) {
    const joined = project.responsibilities.join('');
    // Only split the beginning or end numbered markers like "1. ", "2. ", etc.,
    // not the ones in the middle like "V1.0", "V2.0", etc.
    orderedResponsibilities = joined
      .split(/^(?:\d+\.\s*)|(?:\d+\.\s*)$/gm)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  const breadcrumbMenus = [
    { text: '开发', url: '/dev' },
    { text: '开发项目', url: '/project' },
    { text: project?.name },
  ];

  /* === Component: BasicInfo === */
  function BasicInfo() {
    return (
      <div className="flex gap-24">
        {/* Details */}
        <div className="flex-1 pb-4 flex flex-col justify-between gap-4">
          {/* Top */}
          <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center gap-3">
              <Image src={project?.logo} alt={`${project?.name} Logo`} width={64} height={64} />

              <div className="flex flex-col gap-3">
                {/* Title + Label */}
                <div className="flex items-center gap-2">
                  <div className="title-small" style={{ color: `#${project?.color}` }}>
                    {project?.name}
                  </div>
                  {project?.type?.map((t: any, i) => (
                    <ProductType key={i} type={t} />
                  ))}
                </div>

                {/* Description */}
                <span className="text-small text-light">{project?.slogan}</span>
              </div>
            </div>

            {/* Responsibilities */}
            {orderedResponsibilities && (
              <div className="flex flex-col gap-2">
                {orderedResponsibilities.map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <CheckIcon className="size-4 min-w-4 min-h-4 mt-2" />
                    <p className="leading-8">{item}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom */}
          <div className="flex flex-col gap-8">
            {/* Link */}
            {project?.url && (
              <div className="flex items-center gap-2">
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

                <StatusDown url={project?.url} />
              </div>
            )}

            {project?.qrcode && project?.qrcode?.length > 0 && (
              <Image src={project?.qrcode[0]} alt={project?.name} width={100} height={100} />
            )}

            {/* Date */}
            <span className="text-light text-mini">
              {project?.dateStart != project?.dateEnd
                ? `${project?.dateStart} - ${project?.dateEnd}`
                : project?.dateStart}
            </span>
          </div>
        </div>

        {/* Cover */}
        <Image
          src={project?.cover}
          alt={project?.name}
          width={600}
          height={450}
          className="self-start rounded-2xl border border-secondary overflow-hidden"
        />
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
  async function TechStack() {
    // Returns unsorted skills
    const skills = await getSkills([
      {
        property: '相关项目',
        relation: {
          contains: project?.id,
        },
      },
    ]);

    // Returns skills' id manually sorted in Notion
    const relatedSkills = project?.skills ?? [];

    // Turn skills to expected order
    skills.sort((a: SkillItem, b: SkillItem) => {
      const indexA = relatedSkills.indexOf(a?.id);
      const indexB = relatedSkills.indexOf(b?.id);

      return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
    });

    return (
      <div>
        <SectionHeader title="技术栈" icon={<CodeBracketIcon />} color={`#${project?.color}`} />
        <SkillGrid skills={skills} />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb menus={breadcrumbMenus} />

      <div className="flex flex-col gap-8">
        <BasicInfo />
        <TechStack />
        <Preview />
      </div>
    </div>
  );
}
