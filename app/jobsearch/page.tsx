import FetchJobSearchCard from "@/components/FetchJobSearchCard";
import FilterSidebar from "@/components/FilterSidebar";
import PageSelection from "@/components/PageSelection";
import SearchBar from "@/components/SearchBar";
import moment from "moment";
import Image from "next/image";
import {
  getInitialJobsOnJobSearchPage,
  findJobsOnJobSearchPage,
} from "@/lib/jsearch";

interface SearchParams {
  query?: string;
  searchQuery?: string;
  employmentType?: string;
}

const JobSearch = ({ searchParams }: { searchParams: SearchParams }) => {
  const currentDate = moment().format("dddd,  D MMM YYYY");
  const { query, searchQuery, employmentType } = searchParams;

  console.log("Am I getting searchQuery?", searchQuery);
  console.log("Am I getting query?", query);
  console.log("Am I getting employmentType?", employmentType);

  let jobData: Promise<Job> | null = null;

  if (searchQuery === undefined) {
    jobData = getInitialJobsOnJobSearchPage(query);
  } else {
    jobData = findJobsOnJobSearchPage(query, searchQuery, employmentType);
  }

  // const initialJobData: Promise<Job> = getInitialJobsOnJobSearchPage(query)
  // const findJobData: Promise<Job> = findJobsOnJobSearchPage(query);

  return (
    <div className="mx-[1.5rem] mb-[4.06rem] mt-[2.5rem] flex-col xl:mb-[3.62rem] xl:mt-[3.12rem]  2xl:mx-auto 2xl:max-w-[90rem]">
      {/* Heading */}
      <section>
        <h1 className="ml-[.13rem] text-[1.375rem] font-bold not-italic leading-8 dark:text-Natural4 xl:text-[2rem] xl:leading-10">
          Let’s find your dream job
        </h1>
        <h2 className="mt-[.25rem] text-base font-medium leading-6 text-Natural6 xl:mt-[.87rem] xl:text-xl xl:font-medium xl:leading-8">
          {currentDate}
        </h2>
      </section>
      {/* Main */}
      {/* Search Bar */}
      <section className="mt-[1.87rem] flex h-[20.43rem] w-auto flex-row md:h-[5rem] ">
        <SearchBar />
      </section>
      <section className="mt-[1.87rem] flex w-full gap-[5rem] xl:mt-[3.69rem]">
        {/*  Sidebar */}
        <section className="hidden h-[64.9rem] xl:flex">
          <FilterSidebar />
        </section>
        {/* Job Cards */}
        <div className="flex w-full flex-col gap-[2.25rem]">
          <div className="flex justify-between">
            <div className="flex gap-[.625rem]">
              <p className="text-base font-medium	leading-6 text-Natural6 xl:text-[1.125rem] xl:font-semibold">
                Showing:
              </p>
              <p className="text-base	font-semibold	leading-6	dark:text-white xl:text-[1.125rem] xl:font-semibold">
                10 Jobs
              </p>
            </div>
            <div className="flex items-center gap-[.625rem]">
              <p className="hidden text-[.875rem] font-semibold leading-6	text-Natural6 xl:flex">
                Sort by:
              </p>
              <p className="text-[.875rem] font-semibold leading-6	dark:text-Natural5	xl:font-bold">
                Relevance
              </p>
              <Image
                className="gap-[.5rem]"
                src="/iconography/chevron.svg"
                alt="chevron"
                width={16}
                height={16}
              />
            </div>
          </div>
          <section className="flex flex-col gap-[1.88rem] xl:gap-[1.38rem]">
            <FetchJobSearchCard jobPromise={jobData} />
          </section>
          <section className="h-[2.25rem] w-full">
            <PageSelection />
          </section>
        </div>
      </section>
      {/* Page Selector */}
    </div>
  );
};

export default JobSearch;
