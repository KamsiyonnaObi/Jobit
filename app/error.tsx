"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="outline content-center rounded bg-Natural5 my-32 mx-auto w-[500px] p-2">
        <div className="text-center">
          <h1 className="text-black content-center text-xl bg-Natural5 p-2">
            {" "}
            Something Went Wrong{" "}
          </h1>
          <p>Please click below to refresh the page.</p>
          <button
            className="text-white rounded bg-Primary p-2"
            onClick={() => reset()}
          >
            {" "}
            Reload Page
          </button>
        </div>
      </div>
    </div>
  );
}
