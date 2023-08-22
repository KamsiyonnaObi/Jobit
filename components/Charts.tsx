"use client";

import React from "react";

import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
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

type Props = {
  data: DataItem[];
};

const Charts = ({ data }: Props) => {
  const publisherName = data.map((item) => item.publisher_name);
  const minSalary = data.map((item) => item.min_salary);
  const maxSalary = data.map((item) => item.max_salary);
  const medianSalary = data.map((item) => item.median_salary);

  const options: ApexOptions = {
    chart: {
      id: "basic-bar",

      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "category",
      categories: publisherName,
      labels: {
        show: true,
        style: {
          fontFamily: "Manrope, sans-serif",
          fontSize: "10px",
          colors: ["#92929D"],
          fontWeight: 500,
        },
      },
    },
    yaxis: {
      min: 0,
      forceNiceScale: true,
      labels: {
        formatter: function (value: number) {
          const formatValue = value + "k " + data[0].salary_currency;
          return formatValue;
        },
        style: {
          fontFamily: "Manrope, sans-serif",
          fontSize: "9px",
          colors: ["#44444F"],
          fontWeight: 500,
        },
      },
    },
    colors: ["#FDDD8C", "#0BAB7C", "#FFBBD7"],
    legend: {
      position: "top",
      fontSize: "13px",
      fontFamily: "Manrope, sans-serif",
      horizontalAlign: "left",
      markers: {
        width: 8,
        height: 8,
        radius: 8,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        borderRadiusApplication: "end",
        columnWidth: "23%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          yaxis: {
            labels: {
              formatter: function (value: number) {
                const formatValue =
                  value / 1000 + "k " + data[0].salary_currency;
                return formatValue;
              },
              style: {
                fontSize: "8px",
              },
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 5,
              columnWidth: "30%",
            },
          },
          legend: {
            fontSize: "10px",
          },
        },
      },
    ],
  };

  const series = [
    { name: "Minimun Salary", data: minSalary },
    { name: "Maximum Salary", data: maxSalary },
    { name: "Median Salary", data: medianSalary },
  ];

  return (
    <div className="flex flex-col">
      <div className="pl-[21px] font-bold leading-[22px] sm:text-[22px] sm:leading-[32px]">
        <h3>
          {data[0] ? (
            <>
              Estimated Salary <span className="font-normal">for</span>{" "}
              {data[0].job_title} <span className="font-normal">in</span>{" "}
              {data[0].location}
            </>
          ) : (
            "No Data available."
          )}
        </h3>
      </div>
      <div>
        <Chart options={options} series={series} type="bar" />
      </div>
    </div>
  );
};

export default Charts;
