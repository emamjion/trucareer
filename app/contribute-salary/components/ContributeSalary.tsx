"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2, Loader2, MapPin } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

/* ---------------- ZOD SCHEMA ---------------- */
const formSchema = z.object({
  companyName: z.string().min(1, "Company name required"),
  designation: z.string().min(1, "Designation required"),
  location: z.string().min(1, "Location required"),

  experienceLevel: z.enum(["Entry", "Mid", "Senior", "Lead", "Manager"]),
  experience: z.string().min(1, "Experience required"),

  totalMonthly: z.string().refine((v) => !isNaN(Number(v)), "Invalid salary"),
  whichYearsSalary: z.string(),

  minimumIncrement: z.string().optional(),
  // yearsOfIncrement: z.string().optional(),

  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]),
  employmentType: z.enum(["Full-time", "Part-time", "Contract", "Internship"]),
  department: z.string().optional(),

  // storyTitle: z.string().min(1, "Story title required"),
  storyDescription: z.string().optional(),

  isAnonymous: z.boolean().default(true),
});

type FormData = z.infer<typeof formSchema>;

const EXPERIENCE_OPTIONS = Array.from({ length: 16 }, (_, i) => i.toString());

const DEPARTMENTS = [
  "Executive Leadership",
  "Administration",
  "Human Resources (HR) & People Operations",
  "Finance & Accounting",
  "Information Technology (IT)",
  "Engineering & Development",
  "Product Development",
  "Product Management",
  "Operations",
  "Business Development",
  "Sales & Marketing",
  "Customer Service & Support",
  "Research & Development (R&D)",
  "Legal & Compliance",
  "Supply Chain & Procurement",
  "Quality Assurance (QA)",
  "Risk Management",
  "Public Relations (PR) & Corporate Communications",
  "Facilities & Maintenance",
  "Logistics & Distribution",
  "Data Science & Analytics",
  "Design & User Experience (UX/UI)",
  "Security (Physical & Cybersecurity)",
  "Project Management",
];

const CURRENT_YEAR = new Date().getFullYear();
const SALARY_YEARS = Array.from({ length: CURRENT_YEAR - 2019 }, (_, i) =>
  (2020 + i).toString()
);

function ComboBox({
  value,
  onChange,
  options,
  placeholder,
}: {
  value?: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
          />
          <CommandEmpty>No result found.</CommandEmpty>
          <CommandGroup className="max-h-60 overflow-auto">
            {options.map((opt) => (
              <CommandItem key={opt} value={opt} onSelect={() => onChange(opt)}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === opt ? "opacity-100" : "opacity-0"
                  )}
                />
                {opt}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

/* ---------------- COMPONENT ---------------- */
export default function ContributeSalary() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isAnonymous: true,
    },
  });

  /* ---------------- SUBMIT ---------------- */
  const onSubmit = async (data: FormData) => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        type: "story",
        companyName: data.companyName,
        designation: data.designation,
        location: data.location,

        experienceLevel: data.experienceLevel,
        experience: data.experience,

        totalMonthly: Number(data.totalMonthly),
        whichYearsSalary: Number(data.whichYearsSalary),
        minimumIncrement: Number(data.minimumIncrement || 0),
        // yearsOfIncrement: Number(data.yearsOfIncrement || 0),

        gender: data.gender,
        employmentType: data.employmentType,
        department: data.department,

        // storyTitle: data.storyTitle,
        storyDescription: data.storyDescription,

        isAnonymous: data.isAnonymous,
      };

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/admin/create-salary`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      toast.success(result?.message || "Salary contiributed successfully");

      reset();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <Link href="/" className="inline-flex mb-6">
        <Button variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </Link>

      <Card className="max-w-4xl mx-auto pt-6">
        <CardContent className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-center">
              Contribute Your Salary Story
            </h1>
            <p className="text-center mt-2 text-gray-600">
              Help others understand the salary landscape by sharing your
              experience. Your identity will be kept confidential and your
              contribution will help build transparency in the job market.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* ANONYMOUS */}
            <div className="flex items-center justify-between border p-4 rounded-lg">
              <div>
                <Label className="font-medium">Submit Anonymously</Label>
                <p className="text-sm text-slate-500">
                  Your identity will not be shared
                </p>
              </div>
              <Switch
                checked={watch("isAnonymous")}
                onCheckedChange={(v) => setValue("isAnonymous", v)}
              />
            </div>

            {/* JOB INFO */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Company Name" {...register("companyName")} />
              <Input placeholder="Designation" {...register("designation")} />
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  className="pl-9"
                  placeholder="Location"
                  {...register("location")}
                />
              </div>

              <Select
                onValueChange={(v) => setValue("experienceLevel", v as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Entry">Entry</SelectItem>
                  <SelectItem value="Mid">Mid</SelectItem>
                  <SelectItem value="Senior">Senior</SelectItem>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                </SelectContent>
              </Select>

              <div className="space-y-2">
                {/* <Label>Years of Experience</Label> */}
                <ComboBox
                  value={watch("experience")}
                  onChange={(v) => setValue("experience", v)}
                  options={EXPERIENCE_OPTIONS}
                  placeholder="Select experience"
                />
              </div>
              <Input
                placeholder="Monthly Salary"
                {...register("totalMonthly")}
              />
            </div>

            {/* SALARY INFO */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                {/* <Label>Salary Year</Label> */}
                <ComboBox
                  value={watch("whichYearsSalary")}
                  onChange={(v) => setValue("whichYearsSalary", v)}
                  options={SALARY_YEARS}
                  placeholder="Select salary year"
                />
              </div>

              <Input
                placeholder="Minimum Increment (%)"
                {...register("minimumIncrement")}
              />
              {/* <Input
                placeholder="Years of Increment"
                {...register("yearsOfIncrement")}
              /> */}
            </div>

            {/* META */}
            <div className="grid md:grid-cols-3 gap-4">
              <Select onValueChange={(v) => setValue("gender", v as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                  <SelectItem value="Prefer not to say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(v) => setValue("employmentType", v as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Employment Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Internship">Internship</SelectItem>
                </SelectContent>
              </Select>

              <div className="space-y-2">
                {/* <Label>Department</Label> */}
                <ComboBox
                  value={watch("department")}
                  onChange={(v) => setValue("department", v)}
                  options={DEPARTMENTS}
                  placeholder="Select department"
                />
              </div>
            </div>

            {/* STORY */}
            <div className="space-y-3">
              {/* <Input placeholder="Story Title" {...register("storyTitle")} /> */}
              <Textarea
                placeholder="Share your experience..."
                className="min-h-[120px]"
                {...register("storyDescription")}
              />
            </div>

            {/* SUBMIT */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Submit Salary Story
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
