"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowLeftIcon,
  ArrowRight,
  Briefcase,
  CheckCircle2,
  DollarSign,
  Lightbulb,
  Loader2,
  MapPin,
  MessageSquare,
  Shield,
  TrendingUp,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().optional(),
  isAnonymous: z.boolean().default(false),
  jobTitle: z.string().min(1, "Job title is required"),
  companyName: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  yearsOfExperience: z.string().min(1, "Years of experience is required"),
  currency: z.string().default("BDT"),
  startingSalary: z
    .string()
    .min(1, "Starting salary is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Must be a valid positive number"
    ),
  currentSalary: z
    .string()
    .min(1, "Current salary is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Must be a valid positive number"
    ),
  story: z.string().optional(),
  tips: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const currencies = [
  { value: "BDT", label: "BDT (৳)", symbol: "৳" },
  { value: "USD", label: "USD ($)", symbol: "$" },
  { value: "EUR", label: "EUR (€)", symbol: "€" },
  { value: "GBP", label: "GBP (£)", symbol: "£" },
  { value: "INR", label: "INR (₹)", symbol: "₹" },
];

const experienceOptions = [
  { value: "0-1", label: "0-1 years" },
  { value: "1-2", label: "1-2 years" },
  { value: "2-3", label: "2-3 years" },
  { value: "3-5", label: "3-5 years" },
  { value: "5-7", label: "5-7 years" },
  { value: "7-10", label: "7-10 years" },
  { value: "10+", label: "10+ years" },
];

const tabs = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "job", label: "Job Details", icon: Briefcase },
  { id: "salary", label: "Salary Info", icon: DollarSign },
  { id: "experience", label: "Your Story", icon: MessageSquare },
];

export default function ContributeSalary() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const { toast } = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: "BDT",
      isAnonymous: false,
    },
  });

  const isAnonymous = watch("isAnonymous");
  const selectedCurrency = watch("currency");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("Form submitted:", data);

    toast({
      title: "Success!",
      description:
        "Your salary information has been submitted successfully. Thank you for contributing!",
    });

    reset();
    setActiveTab("personal");
    setShowConfirmation(false);
    setIsSubmitting(false);
  };

  const handleNext = async () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      // Validate current tab before moving to next
      let isValid = true;

      if (activeTab === "personal") {
        // No required fields in personal tab
      } else if (activeTab === "job") {
        isValid = await trigger([
          "jobTitle",
          "companyName",
          "location",
          "yearsOfExperience",
        ]);
      } else if (activeTab === "salary") {
        isValid = await trigger(["startingSalary", "currentSalary"]);
      }

      if (isValid) {
        setActiveTab(tabs[currentIndex + 1].id);
      }
    }
  };

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex((tab) => tab.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="">
        {/* Header */}
        <Link href={"/"} className="group">
          <Button variant={"outline"} size={"sm"}>
            <ArrowLeftIcon className="group-hover:-translate-x-1 duration-150" />
            <span className="hidden md:block">Back Home</span>
          </Button>
        </Link>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-900 rounded-xl mb-4">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Contribute Your Salary Experience
          </h1>
          <p className=" text-slate-600 max-w-2xl mx-auto">
            Help others understand the salary landscape by sharing your
            experience. Your identity will be kept confidential and your
            contribution will help build transparency in the job market.
          </p>
        </div>

        <Card className="shadow-xl border-0 max-w-4xl mx-auto">
          <CardContent className="p-0">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="border-b bg-slate-50/50 px-6 py-4">
                <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="flex items-center gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white"
                      >
                        <Icon className="h-4 w-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="p-6">
                {/* Personal Information Tab */}
                <TabsContent value="personal" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <User className="h-6 w-6 text-slate-600" />
                      <div>
                        <h3 className=" font-semibold text-slate-900">
                          Personal Information
                        </h3>
                        <p className="text-slate-600">
                          Your personal details (optional and confidential)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                      <div className="space-y-1">
                        <Label
                          htmlFor="anonymous"
                          className="text-base font-medium text-slate-800"
                        >
                          Submit Anonymously
                        </Label>
                        <p className="text-sm text-slate-600">
                          Your name will not be stored or displayed
                        </p>
                        <div className="flex items-center gap-2 text-sm text-green-600">
                          <Shield className="h-4 w-4" />
                          <span>Your privacy is protected</span>
                        </div>
                      </div>
                      <Switch
                        id="anonymous"
                        checked={isAnonymous}
                        onCheckedChange={(checked) =>
                          setValue("isAnonymous", checked)
                        }
                      />
                    </div>

                    {!isAnonymous && (
                      <div className="space-y-2 animate-in slide-in-from-top-2 duration-300">
                        <Label
                          htmlFor="name"
                          className="text-slate-700 font-medium"
                        >
                          Full Name (Optional)
                        </Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          className="h-11"
                          {...register("name")}
                        />
                        {errors.name && (
                          <p className="text-sm text-red-600">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Job Information Tab */}
                <TabsContent value="job" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <Briefcase className="h-6 w-6 text-slate-600" />
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">
                          Job Information
                        </h3>
                        <p className="text-slate-600">
                          Details about your current or previous role
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="jobTitle"
                          className="text-slate-700 font-medium"
                        >
                          Job Title *
                        </Label>
                        <Input
                          id="jobTitle"
                          placeholder="e.g., Software Engineer, Marketing Manager"
                          className="h-11"
                          {...register("jobTitle")}
                        />
                        {errors.jobTitle && (
                          <p className="text-sm text-red-600">
                            {errors.jobTitle.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="companyName"
                          className="text-slate-700 font-medium"
                        >
                          Company Name *
                        </Label>
                        <Input
                          id="companyName"
                          placeholder="e.g., Google, Microsoft, Local Startup"
                          className="h-11"
                          {...register("companyName")}
                        />
                        {errors.companyName && (
                          <p className="text-sm text-red-600">
                            {errors.companyName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="location"
                          className="text-slate-700 font-medium"
                        >
                          Location *
                        </Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="location"
                            placeholder="e.g., Dhaka, Bangladesh"
                            className="h-11 pl-10"
                            {...register("location")}
                          />
                        </div>
                        {errors.location && (
                          <p className="text-sm text-red-600">
                            {errors.location.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="yearsOfExperience"
                          className="text-slate-700 font-medium"
                        >
                          Years of Experience *
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setValue("yearsOfExperience", value)
                          }
                        >
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Select experience range" />
                          </SelectTrigger>
                          <SelectContent>
                            {experienceOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.yearsOfExperience && (
                          <p className="text-sm text-red-600">
                            {errors.yearsOfExperience.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Salary Information Tab */}
                <TabsContent value="salary" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <DollarSign className="h-6 w-6 text-slate-600" />
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">
                          Salary Information
                        </h3>
                        <p className="text-slate-600">
                          Your compensation details (all amounts will be kept
                          confidential)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="currency"
                        className="text-slate-700 font-medium"
                      >
                        Currency
                      </Label>
                      <Select
                        value={selectedCurrency}
                        onValueChange={(value) => setValue("currency", value)}
                      >
                        <SelectTrigger className="h-11 w-full md:w-48">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem
                              key={currency.value}
                              value={currency.value}
                            >
                              {currency.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="startingSalary"
                          className="text-slate-700 font-medium"
                        >
                          Starting Salary *
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-400 text-sm">
                            {currencies.find(
                              (c) => c.value === selectedCurrency
                            )?.symbol || "৳"}
                          </span>
                          <Input
                            id="startingSalary"
                            type="number"
                            placeholder="50000"
                            className="h-11 pl-10"
                            {...register("startingSalary")}
                          />
                        </div>
                        {errors.startingSalary && (
                          <p className="text-sm text-red-600">
                            {errors.startingSalary.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="currentSalary"
                          className="text-slate-700 font-medium"
                        >
                          Current Salary *
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-400 text-sm">
                            {currencies.find(
                              (c) => c.value === selectedCurrency
                            )?.symbol || "৳"}
                          </span>
                          <Input
                            id="currentSalary"
                            type="number"
                            placeholder="80000"
                            className="h-11 pl-10"
                            {...register("currentSalary")}
                          />
                        </div>
                        {errors.currentSalary && (
                          <p className="text-sm text-red-600">
                            {errors.currentSalary.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Experience & Story Tab */}
                <TabsContent value="experience" className="space-y-6 mt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <MessageSquare className="h-6 w-6 text-slate-600" />
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">
                          Your Experience & Advice
                        </h3>
                        <p className="text-slate-600">
                          Share your journey and help others (optional)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="story"
                        className="flex items-center gap-2 text-slate-700 font-medium"
                      >
                        <MessageSquare className="h-4 w-4" />
                        Your Story (Optional)
                      </Label>
                      <Textarea
                        id="story"
                        placeholder="Share your career journey, challenges you faced, company culture, growth opportunities, or any other experiences that might help others..."
                        className="min-h-[120px] resize-none"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                            // Allow Ctrl+Enter or Cmd+Enter for new line
                            return;
                          } else if (e.key === "Enter" && !e.shiftKey) {
                            // Prevent form submission on Enter
                            e.preventDefault();
                          }
                        }}
                        {...register("story")}
                      />
                      <p className="text-xs text-slate-500">
                        Tell us about your experience at this company, career
                        progression, work-life balance, etc.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="tips"
                        className="flex items-center gap-2 text-slate-700 font-medium"
                      >
                        <Lightbulb className="h-4 w-4" />
                        Tips for Others (Optional)
                      </Label>
                      <Textarea
                        id="tips"
                        placeholder="What advice would you give to someone joining this role or company? Interview tips, skills to focus on, negotiation strategies..."
                        className="min-h-[120px] resize-none"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                            // Allow Ctrl+Enter or Cmd+Enter for new line
                            return;
                          } else if (e.key === "Enter" && !e.shiftKey) {
                            // Prevent form submission on Enter
                            e.preventDefault();
                          }
                        }}
                        {...register("tips")}
                      />
                      <p className="text-xs text-slate-500">
                        Share advice for job seekers, interview preparation, or
                        career growth tips.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {activeTab === "experience" && showConfirmation && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">
                          Ready to Submit?
                        </h4>
                        <p className="text-sm text-blue-700 mb-3">
                          Please review your information before submitting. Once
                          submitted, you won't be able to edit your response.
                        </p>
                        <div className="text-xs text-blue-600">
                          ✓ Your data will be kept confidential and secure
                          <br />✓ Your contribution helps build salary
                          transparency
                          <br />✓ You can submit anonymously if selected
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={activeTab === "personal"}
                    className="flex items-center gap-2 bg-transparent"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  {activeTab === "experience" ? (
                    <div className="flex items-center gap-3">
                      {!showConfirmation ? (
                        <Button
                          type="button"
                          onClick={() => setShowConfirmation(true)}
                          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                          Review & Submit
                        </Button>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowConfirmation(false)}
                            className="flex items-center gap-2"
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 "
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="h-4 w-4" />
                                Confirm & Submit
                              </>
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800"
                    >
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-slate-500 max-w-2xl mx-auto mt-6">
          <p>
            By submitting this form, you agree that your information will be
            used to help others understand salary ranges and career progression.
            Your personal information will be kept confidential and secure.
          </p>
        </div>
      </div>
    </div>
  );
}
