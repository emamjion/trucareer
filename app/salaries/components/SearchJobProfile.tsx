import { Filter, Search } from "lucide-react";
import React, { useState } from "react";

interface SalaryItem {
  company: string;
  logo: string;
  role: string;
  experience: string;
  salary: string;
  range: string;
}

interface SalaryData {
  [key: string]: SalaryItem[];
}

const jobRoles: string[] = [
  "Software Engineer",
  "Senior Software Engineer",
  "Software Developer",
  "Team Lead",
  "Senior Associate",
  "Deputy Manager",
  "Senior Engineer",
  "Executive Accountant",
  "Accountant",
  "Technical Lead",
  "Senior Consultant",
  "Analyst",
  "Sales Executive",
  "Senior Analyst",
  "Associate Consultant",
  "Project Manager",
  "System Engineer",
  "Softwaretest Engineer",
  "Business Analyst",
  "Data Analyst",
];

const salaryData: SalaryData = {
  "Software Engineer": [
    {
      company: "Tech Mahindra",
      logo: "T",
      role: "Software Engineer Salary",
      experience: "1 - 6 years exp. (26.2k salaries)",
      salary: "$5.2 Lakhs",
      range: "$3.5 L/yr - $8.6 L/yr",
    },
    {
      company: "HCLTech",
      logo: "H",
      role: "Software Engineer Salary",
      experience: "0 - 5 years exp. (25.2k salaries)",
      salary: "$4.7 Lakhs",
      range: "$2.6 L/yr - $7.6 L/yr",
    },
  ],
  "Senior Software Engineer": [
    {
      company: "Infosys",
      logo: "I",
      role: "Senior Software Engineer Salary",
      experience: "4 - 10 years exp. (18.5k salaries)",
      salary: "$9.5 Lakhs",
      range: "$6.5 L/yr - $15.2 L/yr",
    },
    {
      company: "TCS",
      logo: "T",
      role: "Senior Software Engineer Salary",
      experience: "5 - 12 years exp. (20.1k salaries)",
      salary: "$8.8 Lakhs",
      range: "$5.8 L/yr - $14.5 L/yr",
    },
  ],
  "Software Developer": [
    {
      company: "Wipro",
      logo: "W",
      role: "Software Developer Salary",
      experience: "1 - 5 years exp. (15.3k salaries)",
      salary: "$4.9 Lakhs",
      range: "$3.2 L/yr - $8.1 L/yr",
    },
  ],
};

export default function SearchJobProfile() {
  const [selectedRole, setSelectedRole] = useState<string>("Software Engineer");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const currentSalaries: SalaryItem[] = salaryData[selectedRole] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8 md:px-16">
        {/* Filter Section */}
        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-gray-600">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter salaries by</span>
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Department</option>
            <option>Engineering</option>
            <option>Sales</option>
            <option>Marketing</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Experience</option>
            <option>0-2 years</option>
            <option>3-5 years</option>
            <option>6+ years</option>
          </select>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Salary Comparison
          </h1>
          <p className="text-gray-500 text-sm">
            Compare salaries between highest paying companies
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Job Profiles"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
            />
          </div>
        </div>

        {/* Job Role Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex flex-wrap gap-3 mb-4">
            {jobRoles.slice(0, 7).map((role: string) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedRole === role
                    ? "bg-orange-100 text-gray-900 border border-orange-200"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mb-4">
            {jobRoles.slice(7, 14).map((role: string) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedRole === role
                    ? "bg-orange-100 text-gray-900 border border-orange-200"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {jobRoles.slice(14).map((role: string) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedRole === role
                    ? "bg-orange-100 text-gray-900 border border-orange-200"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Salary Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200 px-6 py-4">
            <div className="text-sm font-medium text-gray-600">
              Company Name
            </div>
            <div className="text-sm font-medium text-gray-600 text-right">
              Avg Annual Salary
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {currentSalaries.length > 0 ? (
              currentSalaries.map((item: SalaryItem, index: number) => (
                <div
                  key={index}
                  className="grid grid-cols-2 px-6 py-5 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xl flex-shrink-0">
                      {item.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {item.company}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">{item.role}</p>
                      <p className="text-xs text-gray-500">{item.experience}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {item.salary}
                    </div>
                    <div className="text-sm text-gray-500">{item.range}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center text-gray-500">
                No salary data available for {selectedRole}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
