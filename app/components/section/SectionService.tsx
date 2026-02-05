import { CurrencyYenIcon } from '@heroicons/react/24/outline';

import AvailableStatus from '@/app/service/components/AvailableStatus';
import ServiceItem from '@/app/service/components/ServiceItem';

import SectionHeader from '../common/SectionHeader';

export default function SectionService() {
  return (
    <section>
      <SectionHeader url="/service" title="服务" icon={<CurrencyYenIcon />}>
        <AvailableStatus />
      </SectionHeader>

      <ul className="grid grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((item, index) => (
          <ServiceItem key={index} />
        ))}
      </ul>
    </section>
  );
}
