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
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchJobProfile from "./components/SearchJobProfile";

const BrowseSalaryPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [type, setType] = useState("salaries");

  /* 🔍 MAIN SEARCH HANDLER */
  const handleSearch = () => {
    if (!search.trim()) return;

    router.push(`/salaries/search?designation=${encodeURIComponent(search)}`);
  };

  return (
    <div>
      <Navigation />
      <main>
        {/* 🔷 HERO SEARCH BAR */}
        <div className="relative overflow-hidden bg-slate-100">
          <div className="flex items-center justify-between py-12 md:px-16 max-w-7xl mx-auto">
            <div className="flex-1 z-10">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                Search and Compare Salaries
              </h1>
              <p className="text-slate-600 mb-8">
                Compare salaries by designations and experience.
              </p>

              {/* 🔍 SEARCH + TYPE */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-2xl">
                <div className="relative flex-1">
                  <Search
                    onClick={handleSearch}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 cursor-pointer"
                  />
                  <Input
                    type="text"
                    placeholder="Search designation e.g. Frontend Developer Intern"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10 pr-4 py-2.5 rounded-lg"
                  />
                </div>

                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="sm:w-48 rounded-lg">
                    <SelectValue />
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
          </div>
        </div>

        {/* 🔽 LOCAL SEARCH + FILTER PAGE */}
        <SearchJobProfile />
      </main>
      <Footer />
    </div>
  );
};

export default BrowseSalaryPage;
