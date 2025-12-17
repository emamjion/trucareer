"use client";
import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import SearchJobProfile from "./components/SearchJobProfile";

const BrowseSalaryPage = () => {
  return (
    <div>
      <Navigation />
      <main>
        {/* Search bar */}
        <div className="relative overflow-hidden bg-slate-100">
          <div className="flex items-center justify-between py-12 md:px-16 md:py-26 max-w-7xl mx-auto">
            {/* Left side content */}
            <div className="flex-1 z-10">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 tracking-tight">
                Search and Compare Salaries
              </h1>
              <p className=" text-slate-600 mb-8">
                Compare salaries by designations and experience.
              </p>

              {/* Search and filter section */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search Skills"
                    className="pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <Select defaultValue="salaries">
                  <SelectTrigger className="sm:w-48 rounded-lg border border-slate-200 bg-white text-slate-700 py-2.5">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salaries">Salaries</SelectItem>
                    <SelectItem value="entry-level">Entry Level</SelectItem>
                    <SelectItem value="mid-level">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* <div className="hidden lg:flex items-center justify-center absolute right-32 top-1/2 transform -translate-y-1/2 opacity-60">
              <div className="relative w-48 h-48">
                <div className="absolute inset-0 rounded-full bg-blue-200 opacity-40"></div>
                <div className="absolute inset-6 rounded-full bg-blue-300 opacity-50"></div>
                <div className="absolute inset-12 rounded-full bg-blue-400 opacity-60"></div>
              </div>
            </div> */}
          </div>
        </div>

        <SearchJobProfile />
      </main>
      <Footer />
    </div>
  );
};

export default BrowseSalaryPage;
