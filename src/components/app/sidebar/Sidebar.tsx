'use client';

import { Link as Clink } from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { RiDashboardFill } from 'react-icons/ri';
import { SidebarLinkGroup } from './SidebarLinkGroup';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Navlinks = [
  {
    name: 'home',
    href: '/home',
    icon: <RiDashboardFill />,
    tags: 'home',
    sub: [
      {
        name: 'Link one',
        href: '#',
      },
    ],
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();

  const sidebar = useRef<any>(null);
  const trigger = useRef<any>(null);

  const path = pathname.split('/');
  const absolutePath = path[path.length - 1];

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-[#0b0b0b] duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/home" className="w-[120px] h-[25px] relative">
          TimeTableEASE
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>

      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 py-4 mt-5 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              {Navlinks.map((link, index) =>
                link.sub && link.sub.length > 0 ? (
                  <SidebarLinkGroup
                    activeCondition={absolutePath == `/${link.name}` || link.tags.includes(absolutePath)}
                    key={index}
                  >
                    {(handleClick, open) => {
                      return (
                        <>
                          <Clink
                            w="full"
                            _hover={{ textDecoration: 'none' }}
                            as="button"
                            type="button"
                            className={`group relative flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                              (absolutePath == `/${link.name}` || link.tags.includes(absolutePath)) &&
                              'bg-graydark dark:bg-meta-4'
                            }`}
                            onClick={() => {
                              sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                            }}
                          >
                            {link.icon}
                            <span className="capitalize">{link.name}</span>
                            <svg
                              className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                                open && 'rotate-180'
                              }`}
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                fill=""
                              />
                            </svg>
                          </Clink>
                          {/* <!-- Dropdown Menu Start --> */}
                          <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                              {link.sub.map((sublink, i) => (
                                <li key={i}>
                                  <Link
                                    href={sublink.href}
                                    className={
                                      'group capitalize relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white'
                                    }
                                  >
                                    {sublink.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {/* <!-- Dropdown Menu End --> */}
                        </>
                      );
                    }}
                  </SidebarLinkGroup>
                ) : (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`group relative flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                        (absolutePath == `/${link.name}` || link.tags.includes(absolutePath)) &&
                        'bg-graydark dark:bg-meta-4'
                      }`}
                    >
                      {link.icon}
                      <span className="capitalize">{link.name}</span>
                    </Link>
                  </li>
                )
              )}
              {/* <!-- Menu Item Dashboard --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">Account</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chart --> */}
              <li>
                <Link
                  href="/dashboard/profile"
                  className={`group relative flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('chart') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <CgProfile />
                  Profile
                </Link>
              </li>
              {/* <!-- Menu Item Chart --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};
