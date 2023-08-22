"use client";

import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import followerCounts from "@/lib/followerCounts";
import { useRouter } from "next/navigation";
import CompanyDetailJobCard from "./CompanyDetailJobCard";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { extractRequiredSkills } from "@/lib/jobRequiredSkills";
import { useState, useEffect } from "react";
import Link from "next/link";

type TypeProps = {
  logo: string;
  employer: string;
  companyType: string;
  city: string;
  state: string;
  companyLink: string;
  jobId: string;
  queryData: Promise<Job | null>;
};

const randomAvatars = [
  { url: "https://xsgames.co/randomusers/avatar.php?g=male", id: "maleAvatar" },
  {
    url: "https://xsgames.co/randomusers/avatar.php?g=female",
    id: "femaleAvatar",
  },
  {
    url: `https://randomuser.me/api/portraits/thumb/men/${Math.floor(
      Math.random() * 100,
    )}.jpg`,
    id: "maleAvatar2",
  },
  { url: "", id: "emptyAvatar" },
];

const CompanyDetailCard = ({
  logo,
  employer,
  companyType,
  city,
  state,
  companyLink,
  jobId,
  queryData,
}: TypeProps) => {
  // NOTE https://nextjs.org/docs/app/api-reference/functions/use-router
  const router = useRouter();
  const { toast } = useToast();

  const [query, setQuery] = useState("");

  const [jobResults, setJobResults] = useState<JobResult[]>([]);

  useEffect(() => {
    async function getJobs() {
      const jobs = await queryData;
      if (!jobs) return;
      setJobResults(jobs.data);
    }
    getJobs();
  }, [queryData]);

  city = city ?? "New York";
  state = state ?? "New York";
  logo = logo ?? "/iconography/CompanyLogo.svg";
  employer = employer ?? "Employer";
  companyType = companyType ?? "Contractor";
  companyLink = companyLink ?? "www.linkedin.com";
  jobId = jobId ?? "-";
  queryData = queryData ?? "-";

  const handleSearch = () => {
    return {
      pathname: `/companydetails/${jobId}`,
      query: { query },
    };
  };

  return (
    <main className="flex flex-1 flex-col">
      {/* Back button */}
      <Button
        onClick={() => router.back()}
        className="mb-[1.73rem] w-[4.625rem] gap-[0.375rem] rounded-[0.625rem] bg-Natural2 px-[0.63rem] py-[0.44rem]
          text-[0.8125rem] font-medium not-italic leading-[1.125rem] text-Natural6 hover:text-white dark:border-DarkBG3
          dark:bg-DarkBG3 dark:text-Natural6 lg:mb-9 lg:w-[4.625rem]"
      >
        <Image
          src="/iconography/ChevronLeft.svg"
          width={18}
          height={18}
          alt="Back button"
        />
        Back
      </Button>
      {/* Title, Logo, followers, city, state, follow button */}
      <Card className="border-0 bg-transparent shadow-none">
        {/* Company cover and logo */}
        <div
          className="relative h-[8.21875rem] w-full rounded-t-[1.25rem] bg-[url('/iconography/job-detail.svg')] bg-cover
            bg-left lg:h-[9.87rem]"
        >
          {/* // TODO fallback for company logo */}
          <img
            className="absolute left-3 top-[6.84rem] h-[2.875rem] w-[2.875rem] rounded-[0.625rem] border-[2.156px] border-Natural3 bg-White
              object-contain dark:border-Natural8 dark:bg-[#1717250f] lg:left-6 lg:top-[8rem] lg:h-16 lg:w-16 lg:border-[3px]"
            src={logo}
            alt="Company logo"
          />
        </div>
        {/* Card header */}
        <div className="flex flex-col dark:bg-DarkBG1 lg:flex-row lg:items-end lg:justify-between lg:pb-[3.19rem]">
          {/* Company name, location and follower counts */}
          <div className="pl-3 pt-[2.45875rem] lg:flex lg:flex-col lg:gap-[0.63rem] lg:pl-6 lg:pt-[5.64875rem]">
            <CardTitle className="text-[1.375rem] not-italic leading-8 lg:text-[2rem] lg:font-bold">
              {employer}
            </CardTitle>
            <CardDescription
              className="mt-2 flex flex-row items-center gap-[0.38rem] text-sm font-medium not-italic
              text-Natural7 dark:text-Natural6 lg:mt-0 lg:text-[1.125rem] lg:leading-6 lg:text-Natural8"
            >
              {employer}
              {/* Oval image */}
              <Image
                src="/iconography/Oval.svg"
                width={3}
                height={3}
                alt="Oval"
              />
              {city}, {state}
            </CardDescription>
            <CardDescription className="mt-1 flex flex-row items-center gap-[0.38rem] text-sm font-medium not-italic text-Natural6 lg:mt-0 lg:text-base">
              {companyType}
              {/* Oval image */}
              <Image
                src="/iconography/ovalGray.svg"
                width={3}
                height={3}
                alt="Oval"
              />
              {`${followerCounts(employer).toLocaleString()} Followers`}
            </CardDescription>
            <Separator className="my-5 lg:hidden" />
          </div>
          {/* Avatars and the follow button */}
          <div>
            <div className="flex flex-row -space-x-3 pb-4 pl-3 lg:mr-5">
              {randomAvatars.map((avatar) => (
                <Avatar key={avatar.id}>
                  <AvatarImage
                    src={avatar.url}
                    className="rounded-[5rem] border-2 border-solid border-White dark:border-Natural8"
                  />
                  <AvatarFallback className="rounded-[5rem] border-2 border-solid border-White dark:border-Natural8 dark:bg-Natural2">
                    <span className="text-xs font-bold text-Natural8">+99</span>
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <div className="mb-[1.63rem] mr-[0.63rem] pl-3 lg:mb-[0.62rem] lg:mr-5">
              <Button
                onClick={() => {
                  toast({
                    description: "Follow Functionality Coming Soon :)",
                  });
                }}
                variant="outline"
                className="flex w-full flex-row gap-[0.38rem] rounded-[0.625rem] border border-solid border-Primary text-Primary
                  hover:text-Primary dark:border-Primary dark:bg-DarkBG1 dark:hover:text-Primary"
              >
                <Image
                  src="/iconography/plus.svg"
                  width={18}
                  height={18}
                  alt="Follow plus icon"
                />
                <span className="text-[0.875rem] font-semibold not-italic leading-6">
                  Follow
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Search Job title */}
      <div className="rounded-[0.625rem] bg-white px-4 py-5 dark:bg-DarkBG2 lg:ml-6 lg:px-5 lg:pb-0 lg:pt-[1.88rem]">
        <div className="relative md:w-[28.75rem]">
          <span className="absolute left-[0.625rem] top-1/2 translate-y-[-50%] lg:left-[1.12rem]">
            <Image
              className="flex lg:h-[24px] lg:w-[24px]"
              src="/iconography/outline-search.svg"
              alt="Search icon"
              width={18}
              height={18}
            />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-11 w-full rounded-2xl border-0 bg-Natural3 px-[0.625rem] py-2 pl-[2.185rem] text-[0.8125rem] font-medium not-italic leading-[1.125rem] text-Natural6 focus:outline-none focus:ring-1 focus:ring-Primary dark:bg-DarkBG3 lg:h-[3.625rem] lg:pl-[3.62rem] lg:text-[0.875rem]
              lg:font-semibold lg:leading-6"
            type="text"
            placeholder="Search Job title or Keyword"
          />
          <Link
            href={handleSearch()}
            scroll={false}
            className="absolute inset-y-0 right-[0.62rem] top-2 flex h-[1.75rem] w-[4.5rem] items-center justify-center rounded-[0.625rem] bg-Primary px-[0.88rem] py-1
              text-[0.8125rem] font-semibold leading-5 text-White dark:bg-Primary dark:text-White lg:right-[1.12rem] lg:h-[2.625rem] lg:w-[4.9375rem]
              lg:px-[0.88rem] lg:py-[0.56rem] lg:text-[0.9375rem] lg:leading-6"
          >
            Search
          </Link>
        </div>

        <div className="py-5 text-base font-bold text-Black dark:text-White lg:pb-[1.25rem] lg:pt-[1.87rem] lg:text-[1.125rem] lg:font-bold lg:leading-7">
          Recently Posted Job
        </div>
        {/* Recently Posted Job Card */}
        <div className="grid grid-cols-1 gap-2 xl:grid-cols-2 xl:gap-[1.88rem]">
          {jobResults.length > 0 ? (
            jobResults
              .slice(0, 4)
              .map((demoData, i) => (
                <CompanyDetailJobCard
                  key={i}
                  logo={demoData?.employer_logo}
                  jobTitle={demoData?.job_title}
                  description={demoData?.job_description}
                  minSalary={demoData?.job_min_salary}
                  maxSalary={demoData?.job_max_salary}
                  salaryPeriod={demoData?.job_salary_period}
                  skills={extractRequiredSkills(
                    demoData?.job_description,
                  ).slice(0, 3)}
                  applyLink={demoData?.job_apply_link}
                />
              ))
          ) : (
            <div className="text-center">No Results</div>
          )}
        </div>

        {/* See all jobs button */}
        <Collapsible>
          <CollapsibleContent>
            <div className="mt-2 grid grid-cols-1 gap-2 xl:mt-[1.88rem] xl:grid-cols-2 xl:gap-[1.88rem]">
              {/* NOTE Change demoData */}
              {jobResults.length > 0 &&
                jobResults
                  .slice(5, 10)
                  .map((demoData, i) => (
                    <CompanyDetailJobCard
                      key={i}
                      logo={demoData?.employer_logo}
                      jobTitle={demoData?.job_title}
                      description={demoData?.job_description}
                      minSalary={demoData?.job_min_salary}
                      maxSalary={demoData?.job_max_salary}
                      salaryPeriod={demoData?.job_salary_period}
                      skills={extractRequiredSkills(
                        demoData?.job_description,
                      ).slice(0, 3)}
                      applyLink={demoData?.job_apply_link}
                    />
                  ))}
            </div>
          </CollapsibleContent>
          <div className="mb-[1.875rem] flex items-center justify-center lg:mb-[3.25rem] lg:mt-[3.75rem]">
            <CollapsibleTrigger>
              <Button
                className="hidden rounded-[0.625rem] border border-solid border-Natural5 px-[0.875rem] py-2 dark:border-DarkBG3 dark:bg-DarkBG3 lg:block"
                variant="outline"
              >
                <span className="text-[0.9375rem] font-semibold not-italic leading-6 text-Natural6">
                  See All Jobs
                </span>
              </Button>
            </CollapsibleTrigger>
          </div>
        </Collapsible>
      </div>
    </main>
  );
};

export default CompanyDetailCard;
