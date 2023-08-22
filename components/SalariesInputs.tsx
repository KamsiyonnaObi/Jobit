"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import {
  setJobTitle,
  setLocation,
  setRadius,
} from "@/redux/feature/salariesInputs/salariesInputsSlice";

const formSchema = z.object({
  jobTitle: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9 ]+$/, { message: "Invalid job title." })
    .nonempty({ message: "Job title is required." })
    .max(50, { message: "Job title must be fewer characters long than 50." })
    .min(1, { message: "Job title must be at least 1 character." }),
  location: z
    .string()
    .trim()
    .nonempty({ message: "Location is required." })
    .regex(/^[\w, -]+$/, {
      message: "Invalid location.",
    }),
  radius: z
    .string()
    .trim()
    .regex(/^(?:\d+|)$/, {
      message: "Invalid radius. Only numbers are allowed",
    }),
});

const SalariesInputs = () => {
  const location = useAppSelector((state) => state.salariesInputs.location);
  const jobTitle = useAppSelector((state) => state.salariesInputs.jobTitle);
  const radius = useAppSelector((state) => state.salariesInputs.radius);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle: jobTitle ?? "",
      location: location ?? "",
      radius: radius ?? "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // ✅ This will be type-safe and validated.
    router.push(
      `/estimatedsalaries?jobTitle=${values.jobTitle}&location=${values.location}&radius=${values.radius}`,
    );
    dispatch(setLocation(values.location));
    dispatch(setJobTitle(values.jobTitle));
    dispatch(setRadius(values.radius));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[0.875rem] font-semibold leading-6 text-Natural6 dark:text-Natural5 lg:text-[0.9375rem]">
                Job Title
              </FormLabel>
              <FormControl>
                <Input
                  className="mt-2 rounded-[0.625rem] border-b border-solid border-[#e2e2ea99] bg-Natural2 py-3 pl-5 pr-0 text-[0.8125rem] 
                    font-bold not-italic leading-6 text-Natural8 dark:border-Natural8 dark:bg-DarkBG2 dark:text-Natural7"
                  placeholder="Developer"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-[3.56rem]">
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel className="text-[0.875rem] font-semibold leading-6 text-Natural6 dark:text-Natural5 lg:text-[0.9375rem]">
                  Location
                </FormLabel>
                <FormControl>
                  <Input
                    className="mt-2 w-full rounded-[0.625rem] border-b border-solid border-[#e2e2ea99] bg-Natural2 py-3 pl-5 pr-0 text-[0.8125rem] 
                      font-bold not-italic leading-6 text-Natural8 dark:border-Natural8 dark:bg-DarkBG2 dark:text-Natural7"
                    placeholder="Austin, TX"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="radius"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormLabel className="text-[0.875rem] font-semibold leading-6 text-Natural6 dark:text-Natural5 lg:text-[0.9375rem]">
                  Radius
                </FormLabel>
                <FormControl>
                  <Input
                    className="mt-2 w-full rounded-[0.625rem] border-b border-solid border-[#e2e2ea99] bg-Natural2 py-3 pl-5 pr-0 text-[0.8125rem] 
                      font-bold not-italic leading-6 text-Natural8 dark:border-Natural8 dark:bg-DarkBG2 dark:text-Natural7"
                    placeholder="200"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="hidden" />
      </form>
    </Form>
  );
};

export default SalariesInputs;
