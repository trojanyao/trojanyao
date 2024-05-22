'use client';

type ProductType = 'Web 官网' | '小程序'; /* 产品类型 */

export default function ProductType({ type }: { type: ProductType }) {
  let colorSuffix = '';

  switch (type) {
    case 'Web 官网':
      colorSuffix = 'primary';
      break;
    case '小程序':
      colorSuffix = 'green';
      break;
    default:
      break;
  }

  return (
    <div
      className={`px-2 py-1 ${`bg-${colorSuffix}/10`} rounded-full text-center text-${colorSuffix} text-[0.625rem]`}
    >
      {type}
    </div>
  );
}
