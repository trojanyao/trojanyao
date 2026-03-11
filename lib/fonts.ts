import { Inter, Kaushan_Script } from 'next/font/google';

export const kaushan_script = Kaushan_Script({ weight: '400', subsets: ['latin'] });

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
