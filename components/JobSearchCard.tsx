import { Button } from "./ui/button";
import Image from "next/image";
import { calculatePostDate } from "@/lib/utils";
import bookmark from "@/public/iconography/archive.svg";
import ImageErrorFallback from "@/components/ImageErrorFallback";
import { useToast } from "./ui/use-toast";

type Props = {
  employerName: string;
  jobTitle: string;
  jobDescription: string;
  salary: number | null;
  salaryPeriod: string | null;
  companyLogo: string;
  jobSkills: string[] | null;
  jobState: string;
  jobCity: string;
  postDate: number;
};

const JobSearchCard = (props: Props) => {
  const { toast } = useToast();
  const postDate = calculatePostDate(props.postDate);

  return (
    <div className="flex w-auto flex-col gap-5 rounded-[0.625rem] bg-white p-5 dark:bg-DarkBG2">
      <div className="flex justify-between">
        <div className="flex rounded">
          <div className="flex h-[45px] w-[45px] items-center justify-center rounded-[10px] bg-Natural2 p-2 dark:bg-DarkBG3 sm:h-[64px] sm:w-[64px]">
            <ImageErrorFallback src={props.companyLogo} card="jobSearchCard" />
          </div>
          <div className="flex flex-col pl-5">
            <h1 className="font-semibold text-gray-900 dark:text-white sm:text-lg">
              {props.jobTitle}
            </h1>
            <div className="flex flex-col sm:flex-row">
              <p className="text-[13px] font-medium leading-tight text-Natural7 sm:text-sm">
                {`${props.employerName}  `}
              </p>
              <p className="text-[13px] font-medium leading-tight text-Natural7 sm:text-sm">
                {`${props.jobCity ? "･" + props.jobCity + "," : ""} ${
                  props.jobState ? props.jobState : ""
                } ･ ${postDate} days ago`}
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            toast({
              description: "Follow Functionality Coming Soon :)",
            });
          }}
          className="flex max-h-[34px] w-fit items-center justify-center rounded-lg px-2 py-1 text-sm text-Natural6 hover:text-White dark:text-Natural6 dark:hover:bg-DarkBG3 dark:hover:text-White sm:bg-Natural3 sm:dark:bg-DarkBG3"
        >
          <p className="mr-[6px] line-clamp-1 hidden sm:block">Save job</p>
          <Image src={bookmark} alt="bookmark" />
        </Button>
      </div>

      <div>
        <p className="line-clamp-6 text-[13px] leading-snug text-Natural7 dark:text-Natural5 sm:line-clamp-2 sm:text-sm">
          {props.jobDescription}
        </p>
      </div>
      {/* Conditionally render skills */}
      <div className="flex gap-1">
        {props.jobSkills &&
          props.jobSkills.map((skill, index) => (
            <div className="flex gap-[5px]" key={index}>
              <p className="justify-start rounded bg-Natural3 px-2.5 py-[5px] text-[13px] text-Natural6 dark:bg-DarkBG3">
                {skill}
              </p>
            </div>
          ))}
      </div>

      {/* Conditionally render salaries */}
      <div className="flex flex-col justify-between gap-[30px] sm:flex-row sm:items-center">
        {props.salary ? (
          <div className="flex justify-start">
            <h3 className="text-black">
              <span className="text-base font-semibold dark:text-white sm:text-lg">{`$${props.salary}/`}</span>
              <span className="text-base text-Natural7 sm:text-lg">
                {props.salaryPeriod?.toLowerCase()}
              </span>
            </h3>
          </div>
        ) : (
          <span className="ml-2 text-sm font-medium not-italic text-Natural7 dark:text-White">
            -
          </span>
        )}
        <div className="flex justify-between gap-5">
          <Button className="h-[38px] w-[134px] items-center justify-center rounded-[10px] bg-Natural4 px-3.5 py-[9px] text-[13px] text-Natural7 hover:text-White dark:bg-DarkBG3  dark:text-Natural7 dark:hover:bg-DarkBG3 dark:hover:text-White sm:h-12 sm:w-[125px] sm:py-3 sm:text-[15px]">
            Message
          </Button>
          <Button className="h-[38px] w-[141px] items-center justify-center rounded-[10px] bg-Primary px-3 py-[9px] dark:bg-Primary dark:text-white sm:h-12 sm:w-[180px] sm:px-3.5 sm:py-3">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobSearchCard;
