"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building,
  Clock,
  MapPin,
  Minus,
  Plus,
  Search,
  User,
} from "lucide-react";
import { useState } from "react";

// Mock data
const salaryStories = [
  {
    id: 1,
    jobTitle: "Senior Software Engineer",
    companyName: "Tech Solutions Ltd",
    location: "Dhaka, Bangladesh",
    yearsOfExperience: "5-7",
    currency: "BDT",
    startingSalary: 80000,
    currentSalary: 150000,
    story:
      "Started as a junior developer and worked my way up. The company has great learning opportunities and supportive management. Work-life balance is decent, though sometimes we have tight deadlines. The tech stack is modern and they invest in employee training.",
    tips: "Focus on learning new technologies and don't be afraid to ask questions. Negotiate your salary based on market rates and your contributions. Build good relationships with your team members.",
    isAnonymous: true,
    submittedAt: "2024-01-15",
  },
  {
    id: 2,
    jobTitle: "Marketing Manager",
    companyName: "Digital Marketing Pro",
    location: "Chittagong, Bangladesh",
    yearsOfExperience: "3-5",
    currency: "BDT",
    startingSalary: 45000,
    currentSalary: 85000,
    story:
      "Great company culture with lots of creative freedom. Management trusts the team to deliver results. Remote work options available. Good growth opportunities for those who show initiative.",
    tips: "Build a strong portfolio and stay updated with digital marketing trends. Certifications in Google Ads and Facebook Marketing really help in salary negotiations.",
    isAnonymous: true,
    submittedAt: "2024-01-14",
  },
  {
    id: 3,
    jobTitle: "Data Analyst",
    companyName: "FinTech Innovations",
    location: "Dhaka, Bangladesh",
    yearsOfExperience: "2-3",
    currency: "BDT",
    startingSalary: 55000,
    currentSalary: 75000,
    story:
      "Fast-paced environment with lots of learning opportunities. The company is growing rapidly and there's room for career advancement. Good benefits package including health insurance and annual bonuses.",
    tips: "Learn SQL, Python, and data visualization tools like Tableau. Understanding business context is as important as technical skills. Don't hesitate to present your findings to stakeholders.",
    isAnonymous: false,
    name: "Sarah Ahmed",
    submittedAt: "2024-01-13",
  },
  {
    id: 4,
    jobTitle: "UI/UX Designer",
    companyName: "Creative Agency BD",
    location: "Dhaka, Bangladesh",
    yearsOfExperience: "3-5",
    currency: "BDT",
    startingSalary: 40000,
    currentSalary: 90000,
    story:
      "Amazing creative environment with talented designers. Clients are mostly international which gives exposure to global design trends. Flexible working hours and good work-life balance.",
    tips: "Build a strong portfolio showcasing diverse projects. Stay updated with design trends and tools. Learn basic front-end development to better collaborate with developers.",
    isAnonymous: true,
    submittedAt: "2024-01-12",
  },
  {
    id: 5,
    jobTitle: "DevOps Engineer",
    companyName: "Cloud Systems Inc",
    location: "Dhaka, Bangladesh",
    yearsOfExperience: "5-7",
    currency: "BDT",
    startingSalary: 90000,
    currentSalary: 180000,
    story:
      "High-demand role with excellent compensation. Company invests heavily in cloud infrastructure and latest tools. Challenging work but very rewarding. Great team collaboration and knowledge sharing culture.",
    tips: "Get certified in AWS/Azure/GCP. Learn Infrastructure as Code tools like Terraform. Understanding both development and operations is crucial. Automation skills are highly valued.",
    isAnonymous: true,
    submittedAt: "2024-01-11",
  },
  {
    id: 6,
    jobTitle: "Product Manager",
    companyName: "E-commerce Giant",
    location: "Dhaka, Bangladesh",
    yearsOfExperience: "7-10",
    currency: "BDT",
    startingSalary: 120000,
    currentSalary: 250000,
    story:
      "Leading product strategy for multiple product lines. Great exposure to business strategy and user research. Company has strong product culture and data-driven decision making. Excellent growth opportunities.",
    tips: "Develop strong analytical and communication skills. Understand your users deeply through research. Learn to work with cross-functional teams. Business acumen is as important as technical knowledge.",
    isAnonymous: true,
    submittedAt: "2024-01-10",
  },
];

const experienceRanges = [
  "All",
  "0-1",
  "1-2",
  "2-3",
  "3-5",
  "5-7",
  "7-10",
  "10+",
];
const locations = [
  "All",
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "salary-high", label: "Highest Salary" },
  { value: "salary-low", label: "Lowest Salary" },
];

export default function SalaryStorie() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const formatSalary = (amount: number, currency: string) => {
    const symbol = currency === "BDT" ? "৳" : currency === "USD" ? "$" : "€";
    return `${symbol}${amount.toLocaleString()}`;
  };

  const calculateGrowth = (starting: number, current: number) => {
    const growth = ((current - starting) / starting) * 100;
    return Math.round(growth);
  };

  const toggleCard = (id: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const filteredStories = salaryStories
    .filter((story) => {
      const matchesSearch =
        story.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesExperience =
        selectedExperience === "All" ||
        story.yearsOfExperience === selectedExperience;
      const matchesLocation =
        selectedLocation === "All" ||
        story.location.toLowerCase().includes(selectedLocation.toLowerCase());
      return matchesSearch && matchesExperience && matchesLocation;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.submittedAt).getTime() -
            new Date(a.submittedAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.submittedAt).getTime() -
            new Date(b.submittedAt).getTime()
          );
        case "salary-high":
          return b.currentSalary - a.currentSalary;
        case "salary-low":
          return a.currentSalary - b.currentSalary;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">
              Salary Stories
            </h1>
            <p className="text-gray-600">
              Real salary experiences from professionals across Bangladesh
            </p>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by job title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-11 border-gray-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                value={selectedExperience}
                onValueChange={setSelectedExperience}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Experience Level" />
                </SelectTrigger>
                <SelectContent>
                  {experienceRanges.map((range) => (
                    <SelectItem key={range} value={range}>
                      {range === "All" ? "All Experience" : `${range} years`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location === "All" ? "All Locations" : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Stories List */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-medium text-black">
              {filteredStories.length}
            </span>{" "}
            salary stories
          </p>
        </div>

        <div className="space-y-4">
          {filteredStories.map((story) => (
            <Card
              key={story.id}
              className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-0">
                {/* Main Card Header */}
                <div
                  className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleCard(story.id)}
                >
                  <div className="flex-1">
                    {/* Job Title */}
                    <h3 className="text-xl font-semibold text-black mb-2">
                      {story.jobTitle}
                    </h3>

                    {/* Salary Info */}
                    <div className="flex items-center gap-6 mb-3">
                      <div>
                        <span className="text-2xl font-bold text-black">
                          {formatSalary(story.currentSalary, story.currency)}
                        </span>
                        <span className="text-gray-500 ml-2">current</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <span>
                          Started at{" "}
                          {formatSalary(story.startingSalary, story.currency)}
                        </span>
                        <span className="ml-2 font-medium text-black">
                          (+
                          {calculateGrowth(
                            story.startingSalary,
                            story.currentSalary
                          )}
                          %)
                        </span>
                      </div>
                    </div>

                    {/* Company & Location */}
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span>{story.companyName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{story.location}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs border-gray-300"
                      >
                        {story.yearsOfExperience} years
                      </Badge>
                    </div>
                  </div>

                  {/* Plus/Minus Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-4 h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    {expandedCards.has(story.id) ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Expanded Content */}
                {expandedCards.has(story.id) && (
                  <div className="border-t border-gray-200 bg-gray-50">
                    <div className="p-6 space-y-6">
                      {/* Salary Details */}
                      <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded border border-gray-200">
                        <div className="text-center">
                          <div className="text-lg font-semibold text-black">
                            {formatSalary(story.startingSalary, story.currency)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Starting Salary
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-black">
                            +
                            {calculateGrowth(
                              story.startingSalary,
                              story.currentSalary
                            )}
                            %
                          </div>
                          <div className="text-sm text-gray-500">Growth</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-black">
                            {formatSalary(story.currentSalary, story.currency)}
                          </div>
                          <div className="text-sm text-gray-500">
                            Current Salary
                          </div>
                        </div>
                      </div>

                      {/* Story */}
                      {story.story && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-black">
                            Experience
                          </h4>
                          <p className="text-gray-700 leading-relaxed bg-white p-4 rounded border border-gray-200">
                            {story.story}
                          </p>
                        </div>
                      )}

                      {/* Tips */}
                      {story.tips && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-black">Advice</h4>
                          <p className="text-gray-700 leading-relaxed bg-white p-4 rounded border border-gray-200">
                            {story.tips}
                          </p>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>
                            {story.isAnonymous
                              ? "Anonymous"
                              : story.name || "Anonymous"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>
                            {new Date(story.submittedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-lg font-semibold text-black mb-2">
              No stories found
            </h3>
            <p className="text-gray-600">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
