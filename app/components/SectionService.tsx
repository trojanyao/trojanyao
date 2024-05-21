import { CurrencyYenIcon } from '@heroicons/react/24/outline';
import SectionHeader from './SectionHeader';
import AvailableStatus from '../service/AvailableStatus';
import ServiceItem from '@/app/service/ServiceItem';

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
