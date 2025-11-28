import { CommandLineIcon } from '@heroicons/react/24/outline';

import SectionHeader from '@/app/components/common/SectionHeader';

import ServiceItem from './components/ServiceItem';

export default function Service() {
  return (
    <div className="section-list">
      <section className="section-item">
        <SectionHeader title="开发服务" icon={<CommandLineIcon />} />

        <ul className="grid grid-cols-3 gap-6">
          {Array.from({ length: 4 }).map((item, index) => (
            <ServiceItem key={index} />
          ))}
        </ul>
      </section>
    </div>
  );
}
