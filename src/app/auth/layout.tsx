'use client';
import { authSVG } from '@/components';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

export default function Authlayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="w-[98%] max-w-[1440px]">
        <div className="flex items-center justify-center mb-5 lg:mb-15">
          <Link className="mb-5.5 inline-block w-fit" href="/">
            TimeTableEASE
          </Link>
        </div>
        <div className="px-5 py-10 bg-white border rounded-lg border-stroke shadow-default dark:border-strokedark sm:py-20">
          <div className="flex flex-wrap items-center">
            <div className="hidden w-full xl:block xl:w-1/2">
              <div className="flex flex-col items-center justify-start py-10 text-center px-15">
                <span className="relative block w-full overflow-hidden h-100">
                  <Image src={authSVG} alt="" fill sizes="auto" />
                </span>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
