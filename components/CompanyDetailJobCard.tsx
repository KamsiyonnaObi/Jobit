"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { FormatSalaryRange } from "@/components/FormatSalaryRage";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ImageErrorFallback from "@/components/ImageErrorFallback";

type TypeProps = {
  logo: string;
  jobTitle: string;
  description: string;
  minSalary: number | null;
  maxSalary: number | null;
  salaryPeriod: string | null;
  skills: string[];
  applyLink: string;
};

const CompanyDetailJobCard = ({
  logo,
  jobTitle,
  description,
  minSalary,
  maxSalary,
  salaryPeriod,
  skills,
  applyLink,
}: TypeProps) => {
  const { toast } = useToast();

  logo = logo ?? "/iconography/CompanyLogo.svg";

  return (
    <Card className="flex flex-col gap-5 rounded-[0.625rem] border-0 bg-white shadow-custom dark:bg-DarkBG3 dark:shadow-none lg:gap-[1.38rem]">
      {/* Company logo, job title, skills */}
      <CardHeader className="flex flex-row justify-between px-5 pb-0 pt-5">
        <div className="flex flex-row gap-3 lg:gap-5">
          <div
            className="flex h-12 w-12 shrink-0 items-center rounded-[0.47rem] border-[0.14rem] border-Natural3 
                    bg-Natural3 p-[0.35rem] dark:border-Natural8 dark:bg-[#1717250f] lg:rounded-[0.625rem] lg:border-[3px]"
          >
            <ImageErrorFallback src={logo} card="companyDetailJobCard" />
          </div>
          <div className="flex flex-col gap-1 lg:gap-[0.62rem]">
            <CardTitle className="line-clamp-1 text-base font-semibold not-italic text-Black dark:text-White lg:text-[1.125rem]">
              {jobTitle}
            </CardTitle>
            {/* Skills */}
            <div className="flex flex-row flex-wrap gap-[0.31rem]">
              {skills.map((skill: string) => (
                <CardDescription
                  key={skill}
                  className="rounded-[0.3125rem] bg-Natural3 px-[0.38rem] py-[0.06rem] text-center text-[0.8125rem] font-normal not-italic leading-[1.375rem] dark:bg-DarkBG2 lg:px-[0.62rem] lg:py-[0.19rem] lg:text-Natural6 "
                >
                  {skill}
                </CardDescription>
              ))}
            </div>
          </div>
        </div>
        {/* ic-More button */}
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Image
                src="/iconography/ic_More.svg"
                alt="More button"
                width={16}
                height={16}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-DarkBG2">
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    description: "Save job Functionality Coming Soon :)",
                  });
                }}
              >
                <Image
                  src="/iconography/uiHut-icon-ic_Saved.svg"
                  width={17}
                  height={17}
                  alt="Save job"
                />
                <span className="ml-1 dark:text-white">Save Job</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-0">
        <p className="line-clamp-4 h-[5.3125rem] text-[0.875rem] font-normal not-italic leading-[1.375rem] text-Natural7 dark:text-Natural6 lg:line-clamp-3 lg:h-[4.4375rem] lg:text-base">
          {description}
        </p>
      </CardContent>
      <CardFooter className="flex flex-row justify-between px-5 pb-5">
        <p>
          {minSalary && maxSalary && salaryPeriod ? (
            FormatSalaryRange(minSalary, maxSalary, salaryPeriod)
          ) : (
            <span className="ml-2 text-sm font-medium not-italic text-Natural7 dark:text-White">
              -
            </span>
          )}
        </p>
        <Button className="rounded-[0.625rem] bg-[#0bab7c1a] px-[0.875rem] py-2 text-[0.8125rem] font-semibold not-italic leading-5 text-Primary dark:bg-[#0bab7c1a] dark:text-Primary lg:text-[0.9375rem] lg:leading-6">
          <a target="_blank" href={applyLink}>
            Apply now
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyDetailJobCard;
