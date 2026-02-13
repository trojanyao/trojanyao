import Image from 'next/image';
import Link from 'next/link';

import { CurrencyYenIcon, CreditCardIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useLocale, useTranslations } from 'next-intl';

import SectionHeader from '@/app/[locale]/components/common/SectionHeader';
import UpWorkLogo from '@/public/logos/upwork.svg';

const payments = [
  {
    icon: <CreditCardIcon className="size-8" />,
    zh: '合同 + 银行转账',
    en: 'Contract + Bank Transfer',
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
    en: 'Contract + Corporate Bank Transfer',
    desc_zh: '可开具发票',
    desc_en: 'Invoice Available',
  },
];

export default function Payments() {
  const locale = useLocale();
  const t = useTranslations('resume.title');

  const lang = locale === 'zh' ? 'zh' : 'en';

  return (
    <div>
      <SectionHeader title={t('payment')} icon={<CurrencyYenIcon />} />

      <div className="mt-8 flex justify-between items-start gap-0">
        {payments.map((payment, index) => (
          <div key={index} className={`flex-1 flex flex-col items-center gap-4`}>
            <div className={`text-primary ${index === 1 ? 'mt-4' : ''}`}>{payment.icon}</div>
            {payment?.[lang] && (
              <div className="text-center text-small leading-normal">{payment?.[lang]}</div>
            )}
            {payment?.[`desc_${lang}`] && (
              <div className="-mt-2 text-xs text-light">{payment?.[`desc_${lang}`]}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
