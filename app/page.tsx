import Image from 'next/image';
import { Kaushan_Script } from 'next/font/google';

import Memoji from '@/public/memoji.png';

import './page.css';
import SectionService from './components/SectionService';
import SectionProject from './components/SectionProject';
import SectionSkill from './components/SectionSkill';

const kaushan_script = Kaushan_Script({ weight: '400', subsets: ['latin'] });

export default function Home() {
  return (
    <>
      {/* Banner */}
      <div className="banner-wrap w-screen h-[80vh] min-h-[600px] -mt-20 box-content border-b border-secondary flex flex-col items-center">
        <div className="w-[1200px] h-full min-h-[600px] relative flex flex-col justify-center items-center">
          {/* Title */}
          <div className="pb-[200px] flex flex-col items-center gap-4">
            <div className="text-secondary text-xl leading-none">TROJAN</div>
            <div className="flex flex-col items-center gap-8">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-semibold">全职远程</span>
                <span
                  className={`text-green text-[1.625rem] ${kaushan_script.className}`}
                >
                  Freelancer
                </span>
              </div>
              <div className="text-center text-light leading-6">
                用专业和认真
                <br />
                打造精致细腻的优秀产品
              </div>
            </div>
          </div>

          {/* Memoji */}
          <Image
            src={Memoji}
            width={240}
            alt="Memoji"
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
          />
        </div>
      </div>

      {/* Content */}
      <div className="w-[1200px] pt-12 mx-auto flex flex-col gap-8">
        <SectionService />
        <SectionProject />
        <SectionSkill />
      </div>
    </>
  );
}
