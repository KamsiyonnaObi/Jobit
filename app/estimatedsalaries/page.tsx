import moment from "moment";
import Charts from "@/components/Charts";
import SalariesInputs from "@/components/SalariesInputs";
import { getEstimatedSalaries } from "@/lib/jsearch";

const EstimatedSalaries = async ({
  searchParams,
}: {
  searchParams: { jobTitle: string; location: string; radius: number };
}) => {
  const { jobTitle, location, radius } = searchParams;

  const estSalariesData = await getEstimatedSalaries(
    jobTitle,
    location,
    radius,
  );

  const currentDate = moment().format("dddd,  D MMM YYYY");

  type DataItem = {
    location: string;
    job_title: string;
    publisher_name: string;
    publisher_link: string;
    min_salary: number;
    max_salary: number;
    median_salary: number;
    salary_period: string;
    salary_currency: string;
  };
  const data: DataItem[] = [
    {
      location: "Tucson, AZ",
      job_title: "Front End Web Developer",
      publisher_name: "Glassdoor",
      publisher_link:
        "https://www.glassdoor.com/Salary/Simpleview-Front-End-Web-Developer-Tucson-Salaries-EJI_IE117244.0,10_KO11,34_IL.35,41_IM869.htm",
      min_salary: 65278,
      max_salary: 101496,
      median_salary: 81397,
      salary_period: "YEAR",
      salary_currency: "USD",
    },
    {
      location: "Tempe, AZ",
      job_title: "Web Developer",
      publisher_name: "Indeed",
      publisher_link:
        "https://www.indeed.com/cmp/Arizona-State-University/salaries/Web-Developer/Tempe-AZ",
      min_salary: 33000,
      max_salary: 104000,
      median_salary: 66063.695,
      salary_period: "YEAR",
      salary_currency: "USD",
    },
    {
      location: "Phoenix, AZ",
      job_title: "Web Developer",
      publisher_name: "Salary.com",
      publisher_link:
        "https://www.salary.com/research/company/tempe-arizona/web-developer-salary?cjid=12587012",
      min_salary: 67870.44831441,
      max_salary: 86579.80388094,
      median_salary: 77274.16501626,
      salary_period: "YEAR",
      salary_currency: "USD",
    },
  ];

  return (
    <>
      <div className="mx:mb-[5.75rem] mx-[1.5rem] mb-[4rem] mt-[2.5rem] lg:mt-[3.5rem] 2xl:mx-auto 2xl:max-w-[90rem]">
        <section>
          <h1 className="ml-[.13rem] text-[1.375rem] font-bold not-italic leading-8 dark:text-Natural4 lg:text-[2rem] lg:leading-10">
            Estimated Salaries
          </h1>
          <h2 className="mt-[.25rem] text-base font-medium leading-6 text-Natural6 lg:mt-[.87rem] lg:text-xl lg:font-medium lg:leading-8">
            {currentDate}
          </h2>
        </section>
        <div className="mt-[2.5rem] flex-row lg:flex lg:w-full">
          <section className="lg:h-[20.75rem] lg:w-1/2">
            <SalariesInputs />
          </section>
          <section className="mt-[2.5rem] lg:ml-[5.63rem] lg:mt-[-6.5rem] lg:h-[26.5rem] lg:w-1/2">
            <Charts data={estSalariesData?.data ?? data} />
          </section>
        </div>
      </div>
    </>
  );
};

export default EstimatedSalaries;
