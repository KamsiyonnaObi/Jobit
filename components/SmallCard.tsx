"use client";
import React from "react";
import Image from "next/image";
import bookmark from "@/public/iconography/archive.svg";
import { calculateDaysLeft } from "@/lib/utils";

type Props = {
  icon: string;
  salary: number;
  jobTitle: string;
  jobLocation: string;
  salaryPeriod: string;
  jobCity: string;
  jobState: string;
  daysLeft: number;
};

const SmallCard = (props: Props) => {
  const daysLeft = calculateDaysLeft(props.daysLeft);

  return (
    <div className="flex flex-col items-start justify-center gap-5 rounded-lg bg-white p-[1.25rem] dark:bg-DarkBG2">
      <div className="flex w-full items-start gap-[.95rem] bg-white dark:bg-DarkBG2">
        <div className="w-[3rem] min-w-[3rem]">
          <img className="object-fill" src={props.icon} />
        </div>

        <div className="flex w-full flex-col items-start gap-[0.375rem] pr-0">
          <div
            className="font-manrope text-[1.125rem] font-bold not-italic leading-6 text-black
            dark:text-White"
          >
            {props.jobTitle}
          </div>

          <div className="w-full font-manrope text-[0.875rem] font-medium not-italic leading-5 text-Natural6">
            {props.jobCity}, {props.jobState}
          </div>
        </div>

        <div className="ml-auto flex items-start gap-[0.1875rem]">
          <div
            className="text-right font-manrope text-[0.875rem] font-semibold not-italic leading-6 text-black
            dark:text-White"
          >
            ${props.salary}
          </div>
          <div className="text-right font-manrope text-[0.875rem] font-normal not-italic leading-[1.375rem] text-Natural6">
            {"/"}
            {props.salaryPeriod}
          </div>
        </div>
      </div>
      <div
        className="flex w-full items-center justify-between bg-White
        dark:bg-DarkBG2"
      >
        <div className="w-[5.3125rem] font-manrope text-[0.875rem] font-medium not-italic leading-5 text-Natural6">
          {daysLeft} days left
        </div>
        <div className="flex items-center gap-[0.6875rem]">
          <button className="flex items-center justify-center gap-[0.4375rem] rounded-md border-[0.06rem] border-[#92929D20] p-2">
            <Image src={bookmark} width={18} height={18} alt="bookmark" />
          </button>
          <button
            onClick={() => alert("Testing")}
            className="flex items-center justify-center gap-[0.625rem] rounded bg-[#0BAB7C10] px-[0.875rem] py-[0.5rem]"
          >
            <div className="text-center font-manrope text-[0.875rem] font-medium not-italic leading-5 text-Primary">
              View
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
