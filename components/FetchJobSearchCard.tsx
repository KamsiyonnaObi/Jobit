"use client";

import React, { useEffect, useState } from "react";
import JobSearchCard from "./JobSearchCard";
import { extractRequiredSkills } from "@/lib/jobRequiredSkills";
import { Skeleton } from "./ui/skeleton";

const FetchJobSearchCard = ({ jobPromise }: { jobPromise: Promise<Job> }) => {
  const [jobs, setJobs] = useState<JobResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // TODO the numbers for checkboxes
  // const numberOfCheckBoxes = jobs.reduce((acc, job) => {
  //   if (job.job_is_remote) {
  //     return acc + 1;
  //   } else {
  //     return acc;
  //   }
  //   if (job.job_employment_type === "FULLTIME") {
  //     return acc + 1;
  //   }
  // }, 0);

  useEffect(() => {
    async function getJobs() {
      const job = await jobPromise;
      setJobs(job.data);
      setIsLoading(false);
    }
    setIsLoading(true);
    setJobs([]);
    getJobs();
  }, [jobPromise]);

  if (isLoading) {
    return (
      // TODO: Add a skeleton for the job search card
      <div className="mt-6 flex flex-col gap-8">
        {[...Array(10 ?? 1)].map((_, i) => (
          <>
            <Skeleton key={i} className="h-[17.75rem] w-full" />
          </>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[1.38rem]">
      {jobs.slice(0, 10).map((job, i) => (
        <JobSearchCard
          key={i}
          employerName={job.employer_name}
          jobTitle={job.job_title}
          jobDescription={job.job_description}
          salary={job.job_min_salary}
          salaryPeriod={job.job_salary_period}
          companyLogo={job.employer_logo}
          jobSkills={extractRequiredSkills(job.job_description).slice(0, 3)}
          jobState={job.job_state}
          jobCity={job.job_city}
          postDate={job.job_posted_at_timestamp}
        />
      ))}
    </div>
  );
};

export default FetchJobSearchCard;
