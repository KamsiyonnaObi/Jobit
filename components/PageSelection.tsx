"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
type Props = {};

const handleClick = (pageNumber: number) => {
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (pageNumber === 0) {
    pageNumber = 1;
  }
  if (pageNumber === 11) {
    pageNumber = 10;
  }
  return {
    pathname: "/jobsearch",
    query: { pageNumber: pageNumber ?? 1 },
  };
};

const PageSelection = (props: Props) => {
  const params = useSearchParams();
  const pageNumber = params.get("pageNumber");
  return (
    <>
      <div className="flex">
        {/* Mobile */}
        <div className="flex w-full items-center justify-between border-t border-t-Natural2 pt-[1rem] dark:border-t-DarkBG3 xl:hidden">
          <Link href={handleClick(Number(pageNumber) - 1)} scroll={false}>
            <div>
              <Image
                className="flex dark:hidden"
                src="/iconography/arrow-left.svg"
                alt="arrow left"
                width={20}
                height={20}
              />
              <Image
                className="hidden dark:flex"
                src="/iconography/arrow-left-white.svg"
                alt="arrow left"
                width={20}
                height={20}
              />
            </div>
          </Link>
          <div className="flex text-[.875rem] font-semibold leading-6 text-Natural7  dark:text-Natural6">
            <p className="flex gap-[.2rem]">
              Page
              <span className="text-Natural8 dark:text-white">
                {pageNumber}
              </span>
              of 10
            </p>
          </div>
          <Link href={handleClick(Number(pageNumber) + 1)} scroll={false}>
            <div>
              <Image
                className="flex dark:hidden"
                src="/iconography/arrow-right.svg"
                alt="arrow right"
                width={20}
                height={20}
              />
              <Image
                className="hidden dark:flex"
                src="/iconography/arrow-right-white.svg"
                alt="arrow right"
                width={20}
                height={20}
              />
            </div>
          </Link>
        </div>
        {/* Desktop */}
        <div className="hidden w-full items-center justify-between border-t-Natural2 pt-[1rem] dark:border-t-DarkBG3 xl:flex">
          {/* Previous */}
          <Link href={handleClick(Number(pageNumber) - 1)} scroll={false}>
            <div className="flex items-center justify-center gap-[.5rem] rounded-[.5rem] border border-Natural4 bg-white px-[.875rem] py-[.5rem] dark:border-DarkBG3 dark:bg-DarkBG2">
              <Image
                className="flex dark:hidden"
                src="/iconography/arrow-left.svg"
                alt="arrow left"
                width={20}
                height={20}
              />
              <Image
                className="hidden dark:flex"
                src="/iconography/arrow-left-white.svg"
                alt="arrow left"
                width={20}
                height={20}
              />
              <p className="text-[.875rem] font-bold leading-6 dark:text-Natural5">
                Previous
              </p>
            </div>
          </Link>
          {/* Page Numbers */}
          <div className="flex items-center gap-[.13rem] text-[.875rem] font-semibold leading-6 dark:text-Natural7">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
              return (
                <>
                  <Link href={handleClick(i)} key={i} scroll={false}>
                    <p
                      className={`flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[.5rem] p-[.75rem] ${
                        Number(pageNumber ?? 1) === i
                          ? "bg-Primary text-White"
                          : ""
                      }`}
                    >
                      {i}
                    </p>
                  </Link>
                </>
              );
            })}
          </div>
          {/* Next */}
          <Link href={handleClick(Number(pageNumber) + 1)} scroll={false}>
            <div className="flex items-center justify-center gap-[.5rem] rounded-[.5rem] border border-Natural4 bg-white px-[.875rem] py-[.5rem] dark:border-DarkBG3 dark:bg-DarkBG2">
              <p className="text-[.875rem] font-bold leading-6 dark:text-Natural5">
                Next
              </p>
              <Image
                className="flex dark:hidden"
                src="/iconography/arrow-right.svg"
                alt="arrow right"
                width={20}
                height={20}
              />
              <Image
                className="hidden dark:flex"
                src="/iconography/arrow-right-white.svg"
                alt="arrow right"
                width={20}
                height={20}
              />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PageSelection;
