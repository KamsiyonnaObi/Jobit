import { Suspense } from "react";
import { getJobDetails } from "@/lib/jsearch";

import SimilarJobCardsRender from "@/components/SimilarJobCardsRender";
import Loader from "@/components/Loaders";
import JobDetailCard from "@/components/JobDetailCard";

import chevron from "@/public/iconography/ChevronLeft.svg";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";

const JobDetails = async ({ params }: { params: { id: string } }) => {
  const currentDate = moment().format("dddd,  D MMM YYYY");
  const jobDetailsData = getJobDetails(params.id);

  const [jobDetails] = await Promise.all([jobDetailsData]);

  // Round down salary to nearest 100
  function roundDown(number: number) {
    return Math.floor(number / 100) * 100;
  }

  // calc experience in years
  function expInYears(number: number) {
    return Math.floor(number / 12);
  }

  return (
    <main className=" mx-6 max-w-[1440px] items-center sm:mx-20 lg:mx-auto">
      {/* Heading */}
      <section className="mb-[30px] ml-[-.25] mt-10 sm:mt-[3rem]">
        <h1 className="text-[1.375rem] font-bold not-italic leading-8 dark:text-Natural4 sm:text-[2rem] sm:leading-10">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Let's find your dream job
        </h1>
        {/* Date */}
        <h2 className=" flex font-medium text-Natural6 sm:text-lg sm:font-semibold sm:leading-6 xl:pt-[.88rem]">
          {currentDate}
        </h2>
      </section>

      {/* Search  */}

      <SearchBar />

      {/* Job Details */}
      <div className="flex flex-row flex-wrap gap-10">
        <section className="mt-8 w-full lg:w-[calc(66%-20px)]">
          <span className="flex items-center sm:mb-[23px] ">
            <Link
              href="/"
              className="hidden items-center gap-2 rounded-[0.625rem] bg-Natural4 px-[.62rem] py-[.44rem] text-xs font-medium leading-[18px] text-Natural7 dark:border-DarkBG3 dark:bg-DarkBG2 sm:flex"
            >
              <div className="">
                <Image src={chevron} alt="back logo" width={18} height={18} />
              </div>
              Back
            </Link>
          </span>
          <div className=" rounded-[10px] bg-white dark:bg-DarkBG2">
            <JobDetailCard
              aboutTheCompany={"anything"}
              followers={100000}
              jobRequiredSkills={
                jobDetails.data[0]?.job_highlights?.Responsibilities
              }
              postDate={jobDetails.data[0]?.job_posted_at_timestamp}
              workLevel="tuesday"
              employerLogo={jobDetails.data[0]?.employer_logo}
              employerName={jobDetails.data[0]?.employer_name}
              estimatedSalaries={roundDown(
                jobDetails.data[0]?.estimated_salaries[0]?.median_salary,
              )}
              jobApplyLink={jobDetails.data[0]?.job_apply_link}
              jobCity={jobDetails.data[0]?.job_city}
              jobDescription={jobDetails.data[0]?.job_description}
              jobEmploymentType={jobDetails.data[0]?.job_employment_type}
              jobRequiredExperience={expInYears(
                jobDetails.data[0]?.job_required_experience
                  ?.required_experience_in_months,
              )}
              jobState={jobDetails.data[0]?.job_state}
              jobTitle={jobDetails.data[0]?.job_title}
              qualifications={
                jobDetails.data[0]?.job_highlights?.Qualifications
              }
              jobId={params.id}
            />
          </div>
        </section>

        {/* Similar Jobs */}
        <section className="order-last mt-[2.19rem] lg:w-[calc(33%-20px)] xl:order-none ">
          <span className="flex justify-between">
            <h3 className="text-[18px] font-bold leading-8 dark:text-White">
              Similar Jobs
            </h3>
          </span>

          {/* Similar Job Cards */}

          <Suspense fallback={<Loader type="SmallCard" amount={10} />}>
            <SimilarJobCardsRender id={params.id} />
          </Suspense>
        </section>
      </div>
    </main>
  );
};

export default JobDetails;
