const jSearchApiKey = process.env.X_RAPID_API_KEY;

const requestHeaders = new Headers();

requestHeaders.set("X-RapidAPI-Key", jSearchApiKey || "");
requestHeaders.set("X-RapidAPI-Host", "jsearch.p.rapidapi.com");

export async function getLatestJobs() {
  const res = await fetch(
    "https://jsearch.p.rapidapi.com/search?query=software%20Developer&page=1&num_pages=1&date_posted=today",
    { headers: requestHeaders },
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getRecommendedJobs() {
  const res = await fetch(
    "https://jsearch.p.rapidapi.com/search?query=Developer&page=1&num_pages=1&date_posted=today&remote_jobs_only=true",
    { headers: requestHeaders },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getJobDetails(id: string) {
  const url = `https://jsearch.p.rapidapi.com/job-details?job_id=${id}`;

  try {
    const res = await fetch(url, { headers: requestHeaders });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to Fetch Job Details");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getSimilarJobs(jobTitle: string) {
  const url = `https://jsearch.p.rapidapi.com/search?query=${jobTitle}`;

  try {
    const res = await fetch(url, { headers: requestHeaders });
    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to Fetch Job Details");
    }

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCompanyDetails(id: string) {
  const res = await fetch(
    `https://jsearch.p.rapidapi.com/job-details?job_id=${id}`,
    {
      headers: requestHeaders,
    },
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getQuery(query: string, companyId: string) {
  const res = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${query}&employer=${companyId}`,
    {
      headers: requestHeaders,
    },
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getCompanies(jobStates: string) {
  jobStates = jobStates ?? "New York";

  const res = await fetch(
    `https://jsearch.p.rapidapi.com/search?query=${jobStates}`,
    {
      headers: requestHeaders,
    },
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getEstimatedSalaries(
  jobTitle: string,
  location: string,
  radius: number,
) {
  const url = `https://jsearch.p.rapidapi.com/estimated-salary?job_title=${jobTitle}&location=${location}&radius=${radius}`;
  try {
    const res = await fetch(url, { headers: requestHeaders });
    // Recommendation: handle errors
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}
export async function getCompanyId(query: string) {
  const res = await fetch(
    `https://jsearch.p.rapidapi.com/search-filters?query=${query}`,
    {
      headers: requestHeaders,
    },
  );
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export async function getInitialJobsOnJobSearchPage(query: string = "") {
  const page = 1;
  const numPages = 10;

  let apiUrl = `https://jsearch.p.rapidapi.com/search?query=Developer%20in%20Canada&page=${page}&num_pages=${numPages}`;

  const filters = query.split(",");

  // Check for employment types
  const employmentTypes = ["FULLTIME", "PARTTIME", "CONTRACTOR", "INTERN"];
  if (filters.some((type) => employmentTypes.includes(type))) {
    const filteredTypes = filters.filter((type) =>
      employmentTypes.includes(type),
    );
    apiUrl += `&employment_types=${filteredTypes.join("%2C")}`;
  }

  // Check for "remote" keyword
  if (filters.includes("remote")) {
    apiUrl += "&remote_jobs_only=true";
  }

  // Check for job requirements
  const jobRequirements = [
    "under_3_years_experience",
    "more_than_3_years_experience",
    "no_experience",
    "no_degree",
  ];
  if (filters.some((requirements) => jobRequirements.includes(requirements))) {
    const filteredRequirements = filters.filter((requirements) =>
      jobRequirements.includes(requirements),
    );
    apiUrl += `&job_requirements=${filteredRequirements.join("%2C")}`;
  }

  // Check for date posted
  const datePostedOptions = ["all", "today", "3days", "week", "month"];
  if (filters.some((dateOptions) => datePostedOptions.includes(dateOptions))) {
    if (filters.includes("all")) {
      apiUrl += `&date_posted=all`;
    } else if (filters.includes("month")) {
      apiUrl += `&date_posted=month`;
    } else if (filters.includes("week")) {
      apiUrl += `&date_posted=week`;
    } else if (filters.includes("3days")) {
      apiUrl += `&date_posted=3days`;
    } else if (filters.includes("today")) {
      apiUrl += `&date_posted=today`;
    }
  }

  console.log(
    "What url are we getting for getInitialJobsOnJobSearchPage",
    apiUrl,
  );

  const res = await fetch(apiUrl, { headers: requestHeaders });

  if (!res.ok) {
    throw new Error("Failed to search for filtered jobs or initial jobs");
  }

  return res.json();
}

export async function findJobsOnJobSearchPage(
  query: string = "",
  searchQuery: string,
  employmentType: string = "",
) {
  const page = 1;
  const numPages = 10;
  const encodedString = encodeURIComponent(searchQuery);

  console.log(
    "Are we getting employment type from search bar?",
    employmentType,
  );

  let apiUrl = query
    ? `https://jsearch.p.rapidapi.com/search?query=${encodedString}&page=${page}&num_pages=${numPages}`
    : `https://jsearch.p.rapidapi.com/search?query=${encodedString}&page=${page}&num_pages=${numPages}&employment_types=${employmentType}`;

  const filters = query.split(",");

  // Check for employment types
  const employmentTypes = ["FULLTIME", "PARTTIME", "CONTRACTOR", "INTERN"];
  if (filters.some((type) => employmentTypes.includes(type))) {
    const filteredTypes = filters.filter((type) =>
      employmentTypes.includes(type),
    );
    apiUrl += `&employment_types=${filteredTypes.join("%2C")}`;
  }

  // Check for "remote" keyword
  if (filters.includes("remote")) {
    apiUrl += "&remote_jobs_only=true";
  }

  // Check for job requirements
  const jobRequirements = [
    "under_3_years_experience",
    "more_than_3_years_experience",
    "no_experience",
    "no_degree",
  ];
  if (filters.some((requirements) => jobRequirements.includes(requirements))) {
    const filteredRequirements = filters.filter((requirements) =>
      jobRequirements.includes(requirements),
    );
    apiUrl += `&job_requirements=${filteredRequirements.join("%2C")}`;
  }

  // Check for date posted
  const datePostedOptions = ["all", "today", "3days", "week", "month"];
  if (filters.some((dateOptions) => datePostedOptions.includes(dateOptions))) {
    if (filters.includes("all")) {
      apiUrl += `&date_posted=all`;
    } else if (filters.includes("month")) {
      apiUrl += `&date_posted=month`;
    } else if (filters.includes("week")) {
      apiUrl += `&date_posted=week`;
    } else if (filters.includes("3days")) {
      apiUrl += `&date_posted=3days`;
    } else if (filters.includes("today")) {
      apiUrl += `&date_posted=today`;
    }
  }

  console.log("What url are we getting for findJobsOnJobSearchPage", apiUrl);
  const res = await fetch(apiUrl, { headers: requestHeaders });

  if (!res.ok) {
    throw new Error("Failed to find jobs");
  }

  return res.json();
}
