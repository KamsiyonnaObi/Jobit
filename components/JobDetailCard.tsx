import Image from "next/image";
import React from "react";
import { calculatePostDate } from "@/lib/utils";
type Props = {
  employerName?: string;
  employerLogo?: String;
  qualifications?: string[];
  jobRequiredSkills: string[];
  jobEmploymentType?: string;
  jobTitle?: string;
  jobApplyLink?: string;
  jobDescription?: string;
  jobCity?: string;
  jobState?: string;
  estimatedSalaries?: number;
  jobRequiredExperience?: number | string;
  postDate: number;
  workLevel: string;
  aboutTheCompany: string;
  followers: number;
  jobId: string;
};

const JobDetailCard = ({
  employerName,
  employerLogo,
  qualifications,
  jobRequiredSkills,
  jobEmploymentType,
  jobTitle,
  jobApplyLink,
  jobDescription,
  jobCity,
  jobState,
  estimatedSalaries,
  jobRequiredExperience,
  postDate,
  workLevel,
  aboutTheCompany,
  followers,
  jobId,
}: Props) => {
  jobRequiredExperience = jobRequiredExperience
    ? `Minimum ${jobRequiredExperience} Year(s)`
    : `N/A`;

  //  calc days left
  const calcPostDate = calculatePostDate(postDate);

  return (
    <>
      {/* Box */}
      {/* Change width to full after when done */}
      <main className="max-w-[53.8rem] font-manrope">
        {/* Contents */}
        <div className="pt-5">
          {/* Top Images */}
          <section className="relative mx-[1.25rem]">
            {/* Company Logo */}
            <div className="absolute bottom-[-14px] left-[10px] h-[2.88rem] w-[2.88rem] shrink-0 lg:bottom-[-41px] lg:left-[20px] lg:h-[4rem] lg:w-[4rem]">
              <img
                className="rounded-lg object-contain outline outline-2 outline-white"
                src={"/iconography/CompanyLogo.svg"}
                alt="company logo"
              />
            </div>
            {/* Cover Photo */}
            <div className="h-[150px] max-w-[820px] lg:h-[192px]">
              <Image
                className="h-[150px] rounded-t-xl object-none object-left lg:h-[192px]"
                src="/iconography/job-detail.svg"
                alt="cover"
                width={820}
                height={192}
              />
            </div>
          </section>
          {/* Heading */}
          <section className="ml-[1.87rem] mr-[1.38rem] mt-[1.75rem] lg:mt-[4.5rem]">
            <section className="lg:mt-[1.94rem]">
              {/* Job Title */}
              <div className="flex  items-center">
                <h1 className="flex flex-auto items-center gap-[1.25rem] text-base font-semibold leading-6 dark:text-white	lg:text-2xl	lg:font-bold lg:leading-8">
                  {jobTitle}
                  <Image
                    className="hidden lg:block"
                    src="/iconography/uiHut-icon-ic_Saved.svg"
                    alt="uiHunt"
                    width={20}
                    height={20}
                  />
                </h1>

                <Image
                  className="mr-[2.6rem] lg:hidden"
                  src="/iconography/uiHut-icon-ic_Saved.svg"
                  alt="uiHunt"
                  width={20}
                  height={20}
                />
                <Image
                  className="lg:hidden"
                  src="/iconography/more-vertical.svg"
                  alt="more-vertical"
                  width={24}
                  height={24}
                />
              </div>
              {/* Sub Title */}
              <section className="flex lg:justify-between">
                <section className="lg:flex">
                  <h2 className="text-[.812rem]	font-medium leading-[1.125rem] text-Natural7 lg:flex lg:text-xs	lg:font-semibold	lg:leading-6">
                    {employerName}
                  </h2>
                  <div className="mx-[.31rem] hidden align-middle lg:flex">
                    <Image
                      src="/iconography/oval.svg"
                      alt="oval"
                      width={3}
                      height={3}
                    />
                  </div>
                  <div className="mt-[.037rem] flex gap-[.31rem] text-center	text-[.812rem] font-medium leading-[1.125rem] text-Natural7 lg:text-xs	lg:font-semibold	lg:leading-6">
                    <h3>
                      {jobCity}
                      {jobState}
                    </h3>
                    <div className="flex align-middle">
                      <Image
                        src="/iconography/oval.svg"
                        alt="oval"
                        width={3}
                        height={3}
                      />
                    </div>
                    <h3 className="text-center	text-[.812rem] font-medium leading-[1.125rem] text-Natural7 lg:text-xs	lg:font-semibold	lg:leading-6">
                      {`${calcPostDate} days ago`}
                    </h3>
                  </div>
                </section>
                <section className="mt-[-2rem] hidden items-center lg:flex">
                  <a
                    className="w-[8.5rem] rounded-[.625rem] bg-Primary px-[.875rem] py-[.625rem] text-center text-[.9375rem] font-semibold	leading-6 text-white lg:mr-[.96rem]"
                    href={jobApplyLink}
                  >
                    Apply Now
                  </a>
                  <a
                    className="w-[8.5rem] rounded-[.625rem] border border-solid px-[.875rem] py-[.625rem] text-center text-[.9375rem] font-semibold leading-6 lg:text-Natural7"
                    href={`/companydetails/${jobId}`}
                  >
                    Message
                  </a>
                  <div className="px-[.62rem] py-[.69rem]">
                    <Image
                      src="/iconography/more-vertical.svg"
                      alt="more-vertical"
                      width={24}
                      height={24}
                    />
                  </div>
                </section>
              </section>
              {/* Four specs */}
              <section className="mt-[1.75rem]">
                <span className="grid grid-cols-2 rounded-[.325rem] bg-Natural3 dark:bg-[#21212B] lg:grid-cols-4 lg:gap-[2.5rem] lg:rounded-[1.25rem] lg:text-base">
                  <div className="min-w-[6.5rem] p-[.62rem] sm:w-auto">
                    <h3 className="text-[.812rem] font-medium leading-5	text-Natural6 lg:text-[.875rem] lg:font-semibold lg:leading-6">
                      Experience
                    </h3>
                    <p className="text-[.875rem] font-semibold leading-6 text-Natural8 dark:text-white lg:text-base">
                      {jobRequiredExperience}
                    </p>
                  </div>
                  <div className="min-w-[6.5rem] p-[.62rem] sm:w-auto">
                    <h3 className="text-[.812rem] font-medium leading-5	text-Natural6  lg:text-[.875rem] lg:font-semibold lg:leading-6">
                      Work Level
                    </h3>
                    <p className="text-[.875rem] font-semibold leading-6 text-Natural8 dark:text-white lg:text-base">
                      {workLevel}
                    </p>
                  </div>
                  <div className="min-w-[6.5rem] border-t  border-Natural5 p-[.62rem] dark:border-DarkBG2 sm:w-auto lg:border-none">
                    <h3 className="text-[.812rem] font-medium leading-5	text-Natural6 lg:text-[.875rem] lg:font-semibold lg:leading-6">
                      Employee Type
                    </h3>
                    <p className="text-[.875rem] font-semibold leading-6 text-Natural8 dark:text-white lg:text-base">
                      {jobEmploymentType}
                    </p>
                  </div>
                  <div className="min-w-[6.5rem] border-t   border-Natural5 p-[.62rem] dark:border-DarkBG2 sm:w-auto lg:border-none">
                    <h3 className="text-[.812rem] font-medium leading-5	text-Natural6 lg:text-[.875rem] lg:font-semibold lg:leading-6">
                      Offer Salary
                    </h3>

                    <p className="text-[.875rem] font-semibold leading-6 text-Natural8 dark:text-white lg:text-base">
                      {estimatedSalaries ? `$${estimatedSalaries}` : `N/A`}
                    </p>
                  </div>
                </span>
              </section>
              {/* Mobile Buttons */}
              <section className="mt-[.88rem] flex gap-[.625rem] lg:hidden">
                <a
                  className="w-[8.5rem] rounded-[.625rem] bg-Primary px-[.875rem] py-[.625rem] text-center text-[.9375rem] font-semibold	leading-6 text-white"
                  href={jobApplyLink}
                >
                  Apply Now
                </a>
                <button className="w-[8.5rem] rounded-[.625rem] border border-solid px-[.875rem] py-[.625rem] text-center text-[.9375rem] font-semibold leading-6 text-Natural7">
                  Message
                </button>
              </section>
            </section>
            {/* About the job */}
            <section className="mt-[1.88rem]">
              <h2 className="text-base font-bold	leading-6 dark:text-white lg:text-lg">
                About The Job
              </h2>
              <p className="pt-[.62rem] text-[.875rem] font-normal leading-[1.375rem] text-Natural7 dark:text-Natural5 lg:text-base lg:leading-6">
                {jobDescription}
              </p>
            </section>
            {/* Responsibilities */}
            <section className="mb-[1.87rem] mt-[3.62rem]">
              {jobRequiredSkills && (
                <>
                  <h2 className="text-base font-bold leading-6 dark:text-white lg:text-lg">
                    Responsibilities
                  </h2>
                  {jobRequiredSkills.map((jobSkill, idx) => (
                    <div className="flex flex-row pt-[.75rem]" key={idx}>
                      <Image
                        className="mt-2 h-[.5rem] stroke-2"
                        src="/iconography/Oval (2).svg"
                        alt="oval"
                        width={8}
                        height={8}
                      />
                      <p className="pl-[.63rem] text-base font-medium leading-6 text-Natural7 dark:text-Natural5 lg:text-base lg:leading-6">
                        {jobSkill}
                      </p>
                    </div>
                  ))}
                </>
              )}
            </section>
            {/* Qualifications and Skill Sets */}
            <section className="mt-[1.87rem]">
              <h2 className="text-base font-bold	leading-6 dark:text-white lg:text-lg">
                Qualifications and Skill Sets
              </h2>
              {qualifications?.length ? (
                qualifications.map((qualificationDescription, idx) => (
                  <div className="flex flex-row pt-[.75rem]" key={idx}>
                    <Image
                      className="mt-2 h-[.5rem] stroke-2"
                      src="/iconography/Oval (2).svg"
                      alt="oval"
                      width={8}
                      height={8}
                    />
                    <p className="pl-[.63rem] text-base font-medium leading-6 text-Natural7 dark:text-Natural5 lg:text-base lg:leading-6">
                      {qualificationDescription}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex flex-row pt-[.75rem]">
                  <Image
                    className="mt-2 h-[.5rem] stroke-2"
                    src="/iconography/Oval (2).svg"
                    alt="oval"
                    width={8}
                    height={8}
                  />
                  <p className="pl-[.63rem] text-base font-medium leading-6 text-Natural7 dark:text-Natural5 lg:text-base lg:leading-6">
                    N/A
                  </p>
                </div>
              )}
            </section>
            {/* About The Company */}
            <section className="mt-[1.87rem]">
              <h2 className="mb-[1.25rem] text-base font-bold leading-6 dark:text-white lg:text-lg">
                About The Company
              </h2>
              <span className="w-full lg:flex lg:items-center lg:justify-between">
                <span className="flex">
                  <div className="mt-[.5rem] h-[2.13rem] w-[2.13rem] lg:mt-[.25rem] lg:h-[3.13rem] lg:w-[3.13rem]">
                    <img
                      className="rounded-[.33rem] object-contain	outline outline-2 outline-white lg:outline-none"
                      src={"/iconography/CompanyLogo.svg"}
                      alt="oval"
                    />
                  </div>
                  <div className="ml-[1.25rem] flex flex-col items-start gap-[.125rem]">
                    <h3 className="text-base font-semibold leading-6 dark:text-Natural2 lg:text-lg	lg:font-bold">
                      {employerName}
                    </h3>
                    <p className="text-[.9375rem] font-medium	leading-6 text-Natural7 lg:text-base">
                      {followers}
                    </p>
                  </div>
                </span>
                <button className="mr-[2.88rem] mt-[.88rem] flex h-[2rem] w-[11.1875rem] items-center justify-center gap-[.375rem] rounded-[.625rem]	border  border-Primary px-[.4375rem] py-[.625rem] lg:w-[5.13rem]">
                  <Image
                    className="shrink-0"
                    src="/iconography/plus.svg"
                    alt="oval"
                    width={18}
                    height={18}
                  />
                  <p className="text-[.8125rem] font-medium	leading-[1.125rem] text-Primary">
                    Follow
                  </p>
                </button>
              </span>
              <p className="mb-[1.87rem] mt-[1.25rem] text-base	font-normal	leading-6 text-Natural7 dark:text-Natural5 lg:text-base lg:leading-6">
                {aboutTheCompany}
              </p>
            </section>
          </section>
        </div>
      </main>
    </>
  );
};

export default JobDetailCard;
