import Image from 'next/image';
import Link from 'next/link';

import { CurrencyYenIcon, CreditCardIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

import SectionHeader from '@/app/components/common/SectionHeader';
import UpWorkLogo from '@/public/logos/upwork.svg';

const payments = [
  {
    icon: <CreditCardIcon className="size-8" />,
    zh: '合同 + 银行转账',
  },
  {
    icon: (
      <Link
        href="https://www.upwork.com/freelancers/~01e3849c851c2b469a"
        target="_blank"
        className="h-6"
      >
        <Image src={UpWorkLogo} alt="UpWork" />
      </Link>
    ),
  },
  {
    icon: <DocumentTextIcon className="size-8" />,
    zh: '合同 + 对公转账',
    desc: '可开具发票',
  },
];

export default function Payments() {
  return (
    <div>
      <SectionHeader title="合作渠道" icon={<CurrencyYenIcon />} />

      <div className="mt-8 flex justify-between items-start gap-0">
        {payments.map((payment, index) => (
          <div key={index} className={`flex-1 flex flex-col items-center gap-4`}>
            <div className={`text-primary ${index === 1 ? 'mt-4' : ''}`}>{payment.icon}</div>
            {payment?.zh && <div className="text-small">{payment?.zh}</div>}
            {payment?.desc && <div className="-mt-2 text-xs text-light">{payment?.desc}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
