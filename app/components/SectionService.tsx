import { CurrencyYenIcon } from '@heroicons/react/24/outline';
import SectionHeader from './SectionHeader';

export default function SectionService() {
  return (
    <section>
      <SectionHeader
        url="/service"
        title="服务"
        icon={<CurrencyYenIcon />}
      ></SectionHeader>
    </section>
  );
}
