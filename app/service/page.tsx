import { CommandLineIcon } from '@heroicons/react/24/outline';

import SectionHeader from '../components/SectionHeader';
import ServiceItem from './ServiceItem';

export default function Service() {
  return (
    <div className="py-12">
      <SectionHeader
        title="开发"
        icon={<CommandLineIcon />}
        showArrow={false}
      />

      <ul className="grid grid-cols-3 gap-6">
        {Array.from({ length: 4 }).map((item, index) => (
          <ServiceItem key={index} />
        ))}
      </ul>
    </div>
  );
}
