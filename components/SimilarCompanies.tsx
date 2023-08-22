import React from "react";
import Image from "next/image";
import plus from "@/public/iconography/Fbuttonplus.svg";
import Link from "next/link";
import ImageErrorFallback from "@/components/ImageErrorFallback";
// All notations/comments below are intended for informative purposes for testing

// Job title sec means secondary title
type Props = {
  icon: string;
  JobTitle: string;
  JobTitleSec: string;
  Follow: string;
};

const SimilarCompanies = ({ icon, JobTitle, JobTitleSec, Follow }: Props) => {
  icon = icon ?? "/iconography/CompanyLogo.svg";
  JobTitle = JobTitle ?? "Tech Company";
  JobTitle = JobTitle ?? "Tech Company";
  Follow = Follow ?? "www.linkedin.com";

  return (
    <div className="rounded-[0.625rem] bg-white p-[1.25rem] shadow-[0_6px_14px_0_rgba(23,23,37,0.02)] dark:bg-DarkBG2">
      <div className="flex w-full flex-row items-center justify-between gap-[0.69rem]">
        <div className="flex items-center gap-[0.62rem] lg:gap-[0.9375rem]">
          {/* Apple Icon Test Below  */}
          <ImageErrorFallback src={icon} card={"similarCompany"} />
          {/* Flex section for Company Title and Secondary Title Below */}
          <div className="flex flex-col items-start gap-[0.375rem]">
            <p className="line-clamp-1 flex-initial text-[1rem] font-medium not-italic leading-6 text-black dark:text-White lg:text-[1.125rem] lg:font-semibold">
              {JobTitle}
            </p>
            <p className="line-clamp-1 flex-initial text-[0.875rem] font-medium not-italic leading-5 text-Natural6">
              {JobTitleSec}
            </p>
          </div>
        </div>
        {/* Button code below. Incase of image sizing error with button check below  */}
        <Link
          className="flex h-[1.875rem] w-[5.25rem] flex-none items-center justify-center gap-[0.375rem] rounded-[0.625rem] border border-solid border-[#0BAB7C] 
            p-[0.38rem_0.62rem] lg:h-[2.25rem]"
          href={Follow}
        >
          <Image src={plus} width={18} height={18} alt="plus" />
          {/* Button Text Code Below  */}
          <span className="text-[0.8125rem] font-medium not-italic text-Primary lg:text-[0.875rem] lg:font-semibold lg:leading-6">
            Follow
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SimilarCompanies;
