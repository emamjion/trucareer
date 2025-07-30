"use client";

import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import SalaryChart from "@/components/salary-chart";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart3,
  Building2,
  DollarSign,
  Filter,
  MapPin,
  Search,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";

// Mock salary data
const salaryData = [
  {
    id: 1,
    jobTitle: "Software Engineer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    baseSalary: 125000,
    totalComp: 145000,
    experience: "3-5 years",
    skills: ["React", "Node.js", "Python"],
    industry: "Technology",
    companySize: "1000-5000",
    reportedDate: "2024-01-15",
    verified: true,
  },
  {
    id: 2,
    jobTitle: "Product Manager",
    company: "Global Finance Inc",
    location: "New York, NY",
    baseSalary: 135000,
    totalComp: 165000,
    experience: "5-7 years",
    skills: ["Product Strategy", "Analytics", "Agile"],
    industry: "Finance",
    companySize: "5000+",
    reportedDate: "2024-01-12",
    verified: true,
  },
  {
    id: 3,
    jobTitle: "Data Scientist",
    company: "HealthTech Innovations",
    location: "Boston, MA",
    baseSalary: 115000,
    totalComp: 135000,
    experience: "2-4 years",
    skills: ["Python", "Machine Learning", "SQL"],
    industry: "Healthcare",
    companySize: "500-1000",
    reportedDate: "2024-01-10",
    verified: false,
  },
  {
    id: 4,
    jobTitle: "UX Designer",
    company: "EcoEnergy Systems",
    location: "Austin, TX",
    baseSalary: 95000,
    totalComp: 110000,
    experience: "3-5 years",
    skills: ["Figma", "User Research", "Prototyping"],
    industry: "Energy",
    companySize: "100-500",
    reportedDate: "2024-01-08",
    verified: true,
  },
  {
    id: 5,
    jobTitle: "Software Engineer",
    company: "StartupXYZ",
    location: "Seattle, WA",
    baseSalary: 110000,
    totalComp: 140000,
    experience: "2-4 years",
    skills: ["JavaScript", "React", "AWS"],
    industry: "Technology",
    companySize: "50-100",
    reportedDate: "2024-01-05",
    verified: true,
  },
  {
    id: 6,
    jobTitle: "Marketing Manager",
    company: "RetailCorp",
    location: "Chicago, IL",
    baseSalary: 85000,
    totalComp: 100000,
    experience: "4-6 years",
    skills: ["Digital Marketing", "Analytics", "SEO"],
    industry: "Retail",
    companySize: "1000-5000",
    reportedDate: "2024-01-03",
    verified: false,
  },
];

const jobTitleStats = [
  {
    title: "Software Engineer",
    avgSalary: 118000,
    count: 2847,
    growth: "+12%",
  },
  { title: "Product Manager", avgSalary: 142000, count: 1523, growth: "+15%" },
  { title: "Data Scientist", avgSalary: 125000, count: 1876, growth: "+18%" },
  { title: "UX Designer", avgSalary: 98000, count: 945, growth: "+10%" },
  { title: "Marketing Manager", avgSalary: 92000, count: 1234, growth: "+8%" },
  { title: "DevOps Engineer", avgSalary: 135000, count: 756, growth: "+20%" },
];

const locationStats = [
  { location: "San Francisco, CA", avgSalary: 145000, count: 3245 },
  { location: "New York, NY", avgSalary: 135000, count: 2876 },
  { location: "Seattle, WA", avgSalary: 125000, count: 1987 },
  { location: "Boston, MA", avgSalary: 120000, count: 1654 },
  { location: "Austin, TX", avgSalary: 105000, count: 1432 },
  { location: "Chicago, IL", avgSalary: 95000, count: 1298 },
];

export default function SalariesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedExperience, setSelectedExperience] = useState("all");
  const [filteredData, setFilteredData] = useState(salaryData);

  const handleFilter = () => {
    let filtered = salaryData;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedIndustry !== "all") {
      filtered = filtered.filter((item) => item.industry === selectedIndustry);
    }

    if (selectedLocation !== "all") {
      filtered = filtered.filter((item) =>
        item.location.includes(selectedLocation)
      );
    }

    if (selectedExperience !== "all") {
      filtered = filtered.filter(
        (item) => item.experience === selectedExperience
      );
    }

    setFilteredData(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Browse <span className="text-primary">Salary</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover transparent salary data from real employees across
              industries and locations
            </p>

            {/* Search and Filter Bar */}
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Job title or company"
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select
                  value={selectedIndustry}
                  onValueChange={setSelectedIndustry}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Industries</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Energy">Energy</SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedLocation}
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="San Francisco">
                      San Francisco, CA
                    </SelectItem>
                    <SelectItem value="New York">New York, NY</SelectItem>
                    <SelectItem value="Seattle">Seattle, WA</SelectItem>
                    <SelectItem value="Boston">Boston, MA</SelectItem>
                    <SelectItem value="Austin">Austin, TX</SelectItem>
                    <SelectItem value="Chicago">Chicago, IL</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={selectedExperience}
                  onValueChange={setSelectedExperience}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="0-2 years">0-2 years</SelectItem>
                    <SelectItem value="2-4 years">2-4 years</SelectItem>
                    <SelectItem value="3-5 years">3-5 years</SelectItem>
                    <SelectItem value="5-7 years">5-7 years</SelectItem>
                    <SelectItem value="7+ years">7+ years</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleFilter} className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="browse" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse Salaries</TabsTrigger>
            <TabsTrigger value="by-role">By Job Role</TabsTrigger>
            <TabsTrigger value="by-location">By Location</TabsTrigger>
            <TabsTrigger value="trends">Salary Trends</TabsTrigger>
          </TabsList>

          {/* Browse Salaries Tab */}
          <TabsContent value="browse" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                Salary Reports ({filteredData.length})
              </h2>
              <Button variant="outline" className="gap-2 bg-transparent">
                <DollarSign className="h-4 w-4" />
                Add Salary
              </Button>
            </div>

            <div className="grid gap-6">
              {filteredData.map((salary) => (
                <Card
                  key={salary.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">
                            {salary.jobTitle}
                          </h3>
                          {salary.verified && (
                            <Badge
                              variant="secondary"
                              className="text-green-600"
                            >
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Building2 className="h-4 w-4" />
                            {salary.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {salary.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {salary.experience}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{salary.industry}</Badge>
                          <Badge variant="outline">
                            {salary.companySize} employees
                          </Badge>
                          {salary.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary mb-1">
                          ${salary.baseSalary.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          Base Salary
                        </div>
                        <div className="text-lg font-semibold">
                          ${salary.totalComp.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total Compensation
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Reported{" "}
                          {new Date(salary.reportedDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" size="lg">
                Load More Results
              </Button>
            </div>
          </TabsContent>

          {/* By Job Role Tab */}
          <TabsContent value="by-role" className="space-y-6">
            <h2 className="text-2xl font-bold">Average Salaries by Job Role</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobTitleStats.map((job, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-semibold text-lg">{job.title}</h3>
                      <Badge variant="secondary" className="text-green-600">
                        {job.growth}
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-primary mb-2">
                      ${job.avgSalary.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground text-sm mb-4">
                      Based on {job.count} reports
                    </div>
                    <Progress value={75} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>Entry Level</span>
                      <span>Senior Level</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* By Location Tab */}
          <TabsContent value="by-location" className="space-y-6">
            <h2 className="text-2xl font-bold">Average Salaries by Location</h2>

            <div className="grid gap-4">
              {locationStats.map((location, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <MapPin className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-semibold text-lg">
                            {location.location}
                          </h3>
                          <p className="text-muted-foreground">
                            {location.count} salary reports
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          ${location.avgSalary.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Average Salary
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Salary Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <h2 className="text-2xl font-bold">Salary Trends & Analytics</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Salary Growth by Industry
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SalaryChart />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Top Paying Skills
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      skill: "Machine Learning",
                      avgSalary: 145000,
                      growth: "+22%",
                    },
                    {
                      skill: "Cloud Architecture",
                      avgSalary: 140000,
                      growth: "+18%",
                    },
                    {
                      skill: "Data Engineering",
                      avgSalary: 135000,
                      growth: "+20%",
                    },
                    { skill: "DevOps", avgSalary: 130000, growth: "+15%" },
                    {
                      skill: "Product Management",
                      avgSalary: 125000,
                      growth: "+12%",
                    },
                  ].map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <div>
                        <div className="font-semibold">{skill.skill}</div>
                        <div className="text-sm text-muted-foreground">
                          ${skill.avgSalary.toLocaleString()} avg
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-green-600">
                        {skill.growth}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Market Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Market Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      15%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Average salary increase in tech
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      $125K
                    </div>
                    <div className="text-sm text-muted-foreground">
                      National average for tech roles
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      68%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Companies offering remote work
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
