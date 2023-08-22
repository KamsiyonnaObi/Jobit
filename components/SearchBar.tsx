"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import briefcase from "@/public/iconography/outline-briefcase.svg";
import search from "@/public/iconography/outline-search.svg";
import pin from "@/public/iconography/outline-pin.svg";
import { useAppDispatch } from "@/redux/hooks";
import {
  setEmploymentType,
  setSearchQuery,
} from "@/redux/feature/searchJobs/searchJobs";

type Props = {};

const SearchBar = (props: Props) => {
  const router = useRouter();
  // const searchQuery = useAppSelector((state) => state.searchJobs.searchQuery);
  const dispatch = useAppDispatch();

  const initialFormData = {
    keywords: "",
    location: "",
    jobType: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (formData: typeof initialFormData) => {
    const queryString = formData.keywords + " in " + formData.location;

    dispatch(setSearchQuery(queryString));
    dispatch(setEmploymentType(formData.jobType));

    formData.jobType
      ? router.push(
          `/jobsearch?searchQuery=${queryString}&employmentType=${formData.jobType}`,
        )
      : router.push(`/jobsearch?searchQuery=${queryString}`);
  };

  return (
    <div className="w-full rounded-[20px] bg-white px-1.5 py-4 shadow dark:bg-DarkBG2">
      <div className="flex flex-col gap-[11px] px-4 text-sm font-bold text-Natural6 md:flex-row md:justify-between">
        {/* Content */}
        <div className="flex flex-row items-center  border-b border-Natural2  py-3 md:border-none md:py-0">
          {/* Search */}
          <div className="flex h-[28px] w-[28px]">
            <Image src={search} alt="search" />
          </div>
          <Input
            name="keywords"
            className="h-5  border-none py-0 placeholder:text-Natural6 dark:bg-transparent md:h-6 md:px-0"
            placeholder="Job Title, Company, or Keywords"
            onChange={handleInputChange}
            value={formData.keywords}
            required
          />
        </div>
        <div className="flex flex-row items-center border-b border-Natural2  py-3 md:border-none md:py-0">
          {/* Location */}
          <div className="flex h-[28px] w-[28px]">
            <Image src={pin} alt="location" />
          </div>

          <Input
            name="location"
            className="h-5 border-none py-0 placeholder:text-Natural6 dark:bg-transparent"
            placeholder="Select Location"
            onChange={handleInputChange}
            value={formData.location}
          />
        </div>
        <div className="flex flex-row items-center justify-between border-b border-Natural2  py-3 md:border-none md:py-0">
          {/* Job Type */}
          <div className="flex flex-row items-center">
            {/* Icon, Job Type */}
            <div className="flex h-[28px] w-[28px]">
              <Image src={briefcase} alt="briefcase" />
            </div>
            <select
              name="jobType"
              className="h-5 border-none py-0 placeholder:text-Natural6 dark:bg-transparent"
              value={formData.jobType}
              onChange={handleInputChange}
            >
              <option value="">Job Type</option>
              <option value="Fulltime">Full Time</option>
              <option value="Parttime">Part Time</option>
              <option value="Contractor">Contractor</option>
              <option value="Intern">Intern</option>
            </select>
          </div>
        </div>

        <Button
          type="submit"
          onClick={() => handleFormSubmit(formData)}
          className="h-12 min-w-fit rounded-lg bg-Primary px-[19px] py-3 text-center text-[15px] font-semibold text-white dark:bg-Primary dark:text-white"
        >
          Find Jobs
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
