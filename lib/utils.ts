import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* {Calculate Days left for job posting} */
export function calculateDaysLeft(expTime: number): number {
  if (!expTime) {
    return 0;
  }
  const expDate = new Date(expTime * 1000); // Convert to milliseconds
  const currentDate = new Date();

  const timeDiff = expDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysLeft;
}

/* {Calculate Days since job posting} */
export function calculatePostDate(expTime: number): number {
  if (!expTime) {
    return 0;
  }
  const postDate = new Date(expTime * 1000); // Convert to milliseconds
  const currentDate = new Date();

  const timeDiff = currentDate.getTime() - postDate.getTime();
  const daysPosted = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  return daysPosted;
}
