import React from "react";
import SmallCard from "./SmallCard";
import { getJobDetails, getSimilarJobs } from "@/lib/jsearch";

type Props = { id: string };

const SimilarJobCardsRender = async ({ id }: Props) => {
  const jobDetailsData = getJobDetails(id);

  const [jobDetails] = await Promise.all([jobDetailsData]);

  const similarJobDetails = await getSimilarJobs(jobDetails.data[0]?.job_title);

  return (
    <>
      {similarJobDetails &&
        similarJobDetails.data.map(
          (similarJob: Job["data"][0], idx: number) => (
            <div
              className="mt-[2.06rem] flex-row gap-3"
              key={similarJob.job_id}
            >
              <SmallCard
                daysLeft={similarJob.job_offer_expiration_timestamp}
                icon={similarJob.employer_logo}
                jobCity={similarJob.job_city}
                jobLocation="downtown"
                jobState={similarJob.job_state}
                jobTitle={similarJob.job_title}
                salary={70}
                salaryPeriod="year"
              />
            </div>
          ),
        )}
    </>
  );
};

export default SimilarJobCardsRender;
