export const FormatSalaryRange = (
  minSalary: number,
  maxSalary: number,
  salaryPeriod: string,
): JSX.Element => {
  if (salaryPeriod.toLowerCase() === "hour") {
    return (
      <>
        <span className="text-base font-semibold text-Natural8 dark:text-White lg:text-[1.125rem] lg:leading-[1.5rem]">{`$${minSalary}-${maxSalary}`}</span>
        <span className="text-sm font-medium not-italic text-Natural7 lg:text-[1.125rem] lg:font-normal lg:leading-[1.5rem]">{`/${salaryPeriod.toLowerCase()}`}</span>
      </>
    );
  }

  const formattedMin = minSalary / 1000 + "k";
  const formattedMax = maxSalary / 1000 + "k";
  return (
    <>
      <span className="text-base font-semibold text-Natural8 dark:text-White lg:text-[1.125rem] lg:leading-[1.5rem]">{`$${formattedMin}-${formattedMax}`}</span>
      <span className="text-sm font-medium not-italic text-Natural7 lg:text-[1.125rem] lg:font-normal lg:leading-[1.5rem]">{`/${salaryPeriod.toLowerCase()}`}</span>
    </>
  );
};
