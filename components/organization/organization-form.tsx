"use client";
import React, { useCallback, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { Button } from "../ui/button";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(6, {
    message: "Description must be at least 6 characters.",
  }),
  organizationEmail: z
    .string()
    .email({ message: "Please enter a valid email address" }),
  organizationWebsite: z.string().url({ message: "Please enter a valid url" }),
});
const OrganizationForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      organizationEmail: "",
      organizationWebsite: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const isLoading = useMemo(() => {
    return form.formState.isSubmitting;
  }, [form.formState.isSubmitting]);

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        const url = qs.stringifyUrl({
          url: "/api/create-organization",
        });
        const { data } = await axios.post(url, values);
        if (!data) {
          toast({ variant: "destructive", title: "Please try again" });
        }
        toast({
          title: "Organization Created Successfully",
        });
        form.reset();
        router.push("/view-organizations");
      } catch (error) {
        toast({
          title: "Try again after some time",
        });
      }
    },
    [toast, form, router]
  );

  return (
    <div className="w-full max-w-5xl  items-center  m-auto p-3 rounded-md justify-around flex flex-col md:flex-row gap-5 bg-zinc-400/15">
      <div className="aspect-square h-[350px] relative">
        <Image
          fill
          src={"/form.svg"}
          alt="form"
          className="w-full h-full object-contain"
        />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full p-4 "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-500 text-sm dark:text-zinc-300">
                  Organization Name
                </FormLabel>
                <FormControl>
                  <Input
                    className="py-7 px-3 outline-none focus:outline-none active:outline-none border-none"
                    placeholder="ABC industries"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-500 text-sm dark:text-zinc-300">
                  Organization Description
                </FormLabel>
                <FormControl>
                  <Input
                    className="py-7 px-3 outline-none focus:outline-none active:outline-none border-none"
                    placeholder="ABC Industries is good"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="organizationEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-500 text-sm dark:text-zinc-300">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="py-7 px-3 outline-none focus:outline-none active:outline-none border-none"
                    placeholder="abc@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="organizationWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-500 text-sm dark:text-zinc-300">
                  Website
                </FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    className="py-7 px-3 outline-none focus:outline-none active:outline-none border-none"
                    placeholder="abc.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full text-base font-medium group disabled:cursor-not-allowed"
            variant={"default"}
            disabled={isLoading}
          >
            {!isLoading ? (
              <>
                {" "}
                Create{" "}
                <ArrowRight className="w-5 h-5 ml-3 group-hover:-rotate-45  transition-all" />{" "}
              </>
            ) : (
              <Loader className="h-5 w-5 text-center animate-spin" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default OrganizationForm;
