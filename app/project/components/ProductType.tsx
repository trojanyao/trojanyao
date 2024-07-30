'use client';

type ProductType = 'Web 官网' | '小程序'; /* 产品类型 */

export default function ProductType({ type }: { type: ProductType }) {
  let color = '';

  switch (type) {
    case 'Web 官网':
      color = 'bg-blue/10 text-blue';
      break;
    case '小程序':
      color = 'bg-green/10 text-green';
      break;
    default:
      break;
  }

  return (
    <div
      className={`px-2 py-1 ${color} rounded-full text-center text-[0.625rem]`}
    >
      {type}
    </div>
  );
}
