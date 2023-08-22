"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";
import { Button } from "./ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
const inflect = require("i")();

const FilterSidebar = () => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filters = [
    "Employment Type",
    "Job Requirements",
    "Date Posted",
    "Remote",
  ];
  // Initialize an array to store the state and setters for each filter
  const [filterStates, setFilterStates] = useState(
    filters.map(() => ({
      isOpen: false,
    })),
  );

  // Filter 1: Employment Type
  const employmentType = new Map<string, string>([
    // NOTE Find jobs of particular employment types, specified as a comma delimited list of the following values:
    // NOTE  FULLTIME, CONTRACTOR, PARTTIME, INTERN.
    ["FULLTIME", "Full Time"],
    ["PARTTIME", "Part Time"],
    ["CONTRACTOR", "Contractor"],
    ["INTERN", "Internship"],
  ]);

  // Filter 2: Job Requirements
  const jobRequirements = new Map<string, string>([
    ["under_3_years_experience", inflect.titleize("under_3_years_experience")],
    ["more_than_3_years_experience", "More than 3 years experience"],
    ["no_experience", "No experience"],
    ["no_degree", "No degree"],
  ]);

  // Filter 3: Remote
  const remote = new Map<string, string>([["remote", "Remote Jobs Only"]]);

  // Filter 4: Date Posted
  const datePosted = new Map<string, string>([
    ["all", "All"],
    ["today", "Today"],
    ["3days", "Past 3 days"],
    ["week", "Past week"],
    ["month", "Past month"],
  ]);

  const getCheckboxesForFilter = (filter: string) => {
    switch (filter) {
      case "Employment Type":
        return employmentType;
      case "Job Requirements":
        return jobRequirements;
      case "Remote":
        // Add the checkboxes for the "Salary" filter here if available
        return remote;
      case "Date Posted":
        // Add the checkboxes for the "Location" filter here if available
        return datePosted;
      default:
        return new Map<string, string>();
    }
  };

  const handleOpenChange = (index: number, isOpen: boolean) => {
    // Create a copy of the filterStates array and update the isOpen value for the specific filter
    // NOTE One way to do this is to use the spread operator
    // const updatedFilterStates = [...filterStates];
    // updatedFilterStates[index].isOpen = isOpen;
    // setFilterStates(updatedFilterStates);

    // NOTE Another way to do this is to use the map function
    setFilterStates({
      ...filterStates,
      [index]: {
        isOpen,
      },
    });
  };

  return (
    <div className="hidden lg:flex lg:w-[15.56rem] lg:flex-col lg:gap-[1.88rem]">
      {filters.map((filter, i) => (
        <Filters
          key={i}
          heading={filter}
          checkboxes={getCheckboxesForFilter(filter)}
          setOpen={(prev) => handleOpenChange(i, prev)}
          isOpen={filterStates[i].isOpen}
          // Pass the selectedFilters and the setter function to the Filters component
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      ))}
    </div>
  );
};

export default FilterSidebar;

type FiltersProps = {
  checkboxes: Map<string, string>;
  setOpen: (value: boolean) => void;
  isOpen: boolean;
  heading: string;
  setSelectedFilters: (value: string[]) => void;
  selectedFilters: string[];
};

function Filters({
  checkboxes,
  setOpen,
  isOpen,
  heading,
  selectedFilters,
  setSelectedFilters,
}: FiltersProps) {
  const router = useRouter();
  const searchQuery = useAppSelector((state) => state.searchJobs.searchQuery);
  // const employmentType = useAppSelector(
  //   (state) => state.searchJobs.employmentType,
  // );

  // Function to handle checkbox click event
  const handleCheckboxClick = (checkboxes: string) => {
    if (selectedFilters.includes(checkboxes)) {
      // If the employmentType is already selected, remove it from the selected list
      setSelectedFilters(selectedFilters.filter((type) => type !== checkboxes));
    } else {
      // If the employmentType is not selected, add it to the selected list
      setSelectedFilters([...selectedFilters, checkboxes]);
    }
  };

  // Build the updated URL string with the correct query parameters
  let queryString = "";

  if (selectedFilters.length > 0) {
    queryString = selectedFilters
      .map((selectedFilter) => `${encodeURIComponent(selectedFilter)}`)
      .join("%2C");
  }

  // Use `asPath` to preserve the current URL path while updating the query parameters
  const updatedPath = `/jobsearch?query=${queryString}`;

  // NOTE When users click the find jobs button
  const userFindJobs = searchQuery
    ? updatedPath + `&searchQuery=${searchQuery}`
    : updatedPath;

  router.push(userFindJobs);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={() => setOpen(!isOpen)}
      className="flex flex-col"
    >
      <div className="flex flex-row items-center justify-between gap-[2.94rem]">
        <h4 className="line-clamp-1 text-[1.125rem] font-semibold not-italic leading-6 dark:text-White">
          {heading}
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="px-0">
            {isOpen ? (
              <Image
                src="/images/chevronUp.svg"
                alt="chevron"
                width="20"
                height="20"
              />
            ) : (
              <Image
                src="/iconography/chevron.svg"
                alt="chevron"
                width="20"
                height="20"
              />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className={`${isOpen && "mt-5"} flex flex-col gap-3`}>
        {Array.from(checkboxes.entries()).map((checkbox) => (
          <CollapsibleContent key={checkbox[0]}>
            <div className="flex justify-between">
              <div className="flex gap-[0.88rem]">
                <Checkbox
                  id={checkbox[0]}
                  onClick={() => handleCheckboxClick(checkbox[0])} // Call the handleCheckboxClick function when checkbox is clicked
                  // Set the checkbox checked status based on selected filters
                  checked={selectedFilters.includes(checkbox[0])}
                />
                <label
                  htmlFor={checkbox[0]}
                  className="text-sm font-medium not-italic text-Natural8 hover:text-Primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-Natural5 dark:hover:text-Primary"
                >
                  {checkbox[1]}
                </label>
              </div>
              {/* <Button
                variant="outline"
                size="icon"
                className="pointer-events-none flex h-[1.5rem] w-[2.19rem] content-center items-center rounded-[0.3125rem] border-0 bg-Natural2 px-[0.375rem] py-[0.125rem] hover:bg-transparent dark:bg-DarkBG3"
              >
                <span className="text-sm font-medium text-Natural8 dark:text-Natural2">
                  100
                </span>
              </Button> */}
            </div>
          </CollapsibleContent>
        ))}
      </div>
    </Collapsible>
  );
}
