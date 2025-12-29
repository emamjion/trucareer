"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface Salary {
  _id: string;
  companyName: string;
  designation: string;
  location?: string;
  experience?: string;
  experienceLevel?: string;
  department?: string;
  employmentType?: string;
  industry?: string;
  qualification?: string;
  totalMonthly?: number;
}

const FILTER_FIELDS: {
  key: keyof Salary;
  label: string;
}[] = [
  { key: "experience", label: "Experience" },
  { key: "department", label: "Department" },
  { key: "location", label: "Location" },
  { key: "employmentType", label: "Employment" },
  { key: "industry", label: "Industry" },
  { key: "qualification", label: "Qualification" },
];

const PAGE_SIZE = 6;
const EXPERIENCE_RANGE = Array.from({ length: 16 }, (_, i) => i.toString());

export default function SearchJobProfile() {
  const [allData, setAllData] = useState<Salary[]>([]);
  const [selectedDesignation, setSelectedDesignation] = useState("ALL");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/salary/salaries`)
      .then((res) => res.json())
      .then((json) => {
        setAllData(json.data || []);
      });
  }, []);

  const renderOptionLabel = (field: keyof Salary, value: string) => {
    if (field === "experience") {
      return value === "0" || value === "1"
        ? `${value} year`
        : `${value} years`;
    }

    return value;
  };

  const designations = useMemo(() => {
    const unique = Array.from(new Set(allData.map((i) => i.designation)));
    return ["ALL", ...unique];
  }, [allData]);

  /* 🔍 SEARCH DESIGNATION TABS */
  const filteredDesignations = useMemo(() => {
    if (!search.trim()) return designations;
    return designations.filter((d) =>
      d.toLowerCase().includes(search.toLowerCase())
    );
  }, [designations, search]);

  /* 🧠 FILTERED DATA */
  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      if (
        selectedDesignation !== "ALL" &&
        item.designation !== selectedDesignation
      ) {
        return false;
      }

      for (const key in filters) {
        if (filters[key] && item[key as keyof Salary] !== filters[key]) {
          return false;
        }
      }

      return true;
    });
  }, [allData, selectedDesignation, filters]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedDesignation, filters]);

  const filterOptions = (field: keyof Salary) => {
    if (field === "experience") {
      return EXPERIENCE_RANGE;
    }

    return Array.from(
      new Set(allData.map((i) => i[field]).filter(Boolean))
    ) as string[];
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      {/* 🎛️ FILTERS */}
      <div className="flex flex-wrap gap-3">
        {FILTER_FIELDS.map(({ key, label }) => (
          <Select
            key={key}
            value={filters[key] || ""}
            onValueChange={(v) => setFilters((prev) => ({ ...prev, [key]: v }))}
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              {filterOptions(key).map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {renderOptionLabel(key, opt)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      {/* 🔍 SEARCH DESIGNATION */}
      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search designation..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* 🧭 DESIGNATION TABS */}
      <div className="flex flex-wrap gap-3">
        {filteredDesignations.map((role) => (
          <button
            key={role}
            onClick={() => setSelectedDesignation(role)}
            className={`px-4 py-2 rounded-full border text-sm transition ${
              selectedDesignation === role
                ? "bg-orange-100 border-orange-400 text-orange-700"
                : "bg-white hover:bg-slate-100"
            }`}
          >
            {role === "ALL" ? "All" : role}
          </button>
        ))}
      </div>

      {/* 📊 SALARY LIST */}
      <div className="border rounded-lg divide-y bg-white">
        {filteredData.slice(0, visibleCount).map((item) => (
          <div
            key={item._id}
            className="p-5 flex justify-between items-start gap-6"
          >
            <div>
              <h3 className="font-semibold">{item.designation}</h3>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {item.department}
                </p>
                <span>•</span>
                <p className="text-sm text-muted-foreground">
                  {item.experience == "1" || item.experience == "0"
                    ? item.experience + " year of experience"
                    : item.experience + " years of experience"}{" "}
                </p>
              </div>

              <div className="mt-2 flex gap-2 flex-wrap text-xs text-slate-600">
                {item.experienceLevel && <span>{item.experienceLevel}</span>}
                {item.employmentType && <span>• {item.employmentType}</span>}
                {item.location && <span>• {item.location}</span>}
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-lg text-green-600">
                ৳{item.totalMonthly ?? "N/A"}
              </p>
              <p className="text-xs text-muted-foreground">per month</p>
            </div>
          </div>
        ))}

        {filteredData.length === 0 && (
          <p className="p-6 text-center text-muted-foreground">
            No salary data found
          </p>
        )}
      </div>

      {/* 👇 SEE MORE / SEE LESS */}
      {filteredData.length > PAGE_SIZE && (
        <div className="flex justify-center gap-4">
          {visibleCount < filteredData.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className="px-6 py-2 rounded-md border text-sm font-medium hover:bg-slate-100"
            >
              See more
            </button>
          )}

          {visibleCount > PAGE_SIZE && (
            <button
              onClick={() => setVisibleCount(PAGE_SIZE)}
              className="px-6 py-2 rounded-md border text-sm font-medium hover:bg-slate-100"
            >
              See less
            </button>
          )}
        </div>
      )}
    </div>
  );
}
