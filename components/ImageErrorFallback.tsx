"use client";

import { useState } from "react";

export default function ImageErrorFallback({
  src,
  card,
}: {
  src: string;
  card?: string;
}) {
  const [error, setError] = useState(false);

  let width = 48;
  let height = 48;
  const defaultSrc = "/images/companyPlaceholderLogo.png";
  const alt = "Company Placeholder logo";
  const className = "object-contain";

  if (card === "companyDetailJobCard" || card === "jobSearchCard") {
    width = 36;
    height = 36;
  }

  if (!src || error) {
    return (
      <img
        src={defaultSrc}
        width={width}
        height={height}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <img
      src={src}
      width={width}
      height={height}
      alt="Company Logo"
      className={className}
      onError={() => setError(true)}
    />
  );
}
