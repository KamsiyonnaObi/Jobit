import CompanyDetailCard from "@/components/CompanyDetailCard";
import SimilarCompanies from "@/components/SimilarCompanies";
import {
  getCompanies,
  getCompanyDetails,
  getQuery,
  getCompanyId,
} from "@/lib/jsearch";

const CompanyDetails = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { query: string };
}) => {
  const CompanyData: Promise<Job> = getCompanyDetails(params.id);
  const [CompanyDetails] = await Promise.all([CompanyData]);

  const moreCompany: Promise<Job> = getCompanies(
    CompanyDetails.data[0]?.job_state,
  );
  const [Companies] = await Promise.all([moreCompany]);

  const companyIdRequest = await getCompanyId(
    CompanyDetails.data[0]?.employer_name,
  );
  const companyId = companyIdRequest.data?.employers[0]?.value;

  const { query } = searchParams;
  const queryData: Promise<Job> = getQuery(query ?? "developer", companyId);

  const companyData = {
    logo: CompanyDetails.data[0]?.employer_logo,
    employer: CompanyDetails.data[0]?.employer_name,
    state: CompanyDetails.data[0]?.job_state,
    city: CompanyDetails.data[0]?.job_city,
    companyType: CompanyDetails.data[0]?.employer_company_type,
    companyLink: CompanyDetails.data[0]?.employer_website,
  };

  return (
    <div className="mx-6 mb-[4.5rem] mt-[1.37rem] flex flex-col lg:mx-20 lg:mb-11 lg:mt-[2.87rem] lg:flex-row lg:gap-10 2xl:mx-auto 2xl:max-w-[90rem]">
      <CompanyDetailCard
        logo={companyData?.logo}
        employer={companyData?.employer}
        companyType={companyData?.companyType}
        city={companyData?.city}
        state={companyData?.state}
        companyLink={companyData?.companyLink}
        jobId={params.id}
        queryData={queryData}
      />
      <aside className="lg:max-w-[25rem]">
        <h2 className="mb-[1.87rem] mt-[2.88rem] text-[1.375rem] font-bold not-italic leading-8 text-Black dark:text-White lg:mb-5 lg:mt-[4.25rem]">
          Similar Companies
        </h2>
        <div className="flex flex-col gap-6">
          {Companies.data.map((Companies, i) => (
            <div key={i}>
              <SimilarCompanies
                JobTitle={Companies?.employer_name}
                JobTitleSec={Companies?.employer_name}
                icon={Companies?.employer_logo}
                Follow={Companies?.job_apply_link}
              />
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default CompanyDetails;
