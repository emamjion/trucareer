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
  { key: "experienceLevel", label: "Experience" },
  { key: "department", label: "Department" },
  { key: "location", label: "Location" },
  { key: "employmentType", label: "Employment" },
  { key: "industry", label: "Industry" },
  { key: "qualification", label: "Qualification" },
];

export default function SearchJobProfile() {
  const [allData, setAllData] = useState<Salary[]>([]);
  const [selectedDesignation, setSelectedDesignation] = useState<string>("");
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState<Record<string, string>>({});

  /* 🔁 FETCH ALL SALARIES */
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/salary/salaries`)
      .then((res) => res.json())
      .then((json) => {
        const data = json.data || [];
        setAllData(data);
        setSelectedDesignation(data?.[0]?.designation || "");
      });
  }, []);

  /* 🔍 DESIGNATION SEARCH (LOCAL) */
  const filteredDesignations = useMemo(() => {
    const designations = Array.from(new Set(allData.map((i) => i.designation)));

    if (!search.trim()) return designations;

    return designations.filter((d) =>
      d.toLowerCase().includes(search.toLowerCase())
    );
  }, [allData, search]);

  /* 🧠 FILTERED DATA */
  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      if (selectedDesignation && item.designation !== selectedDesignation)
        return false;

      for (const key in filters) {
        if (filters[key] && item[key as keyof Salary] !== filters[key]) {
          return false;
        }
      }

      return true;
    });
  }, [allData, selectedDesignation, filters]);

  /* 📌 FILTER OPTIONS */
  const filterOptions = (field: keyof Salary) =>
    Array.from(
      new Set(allData.map((i) => i[field]).filter(Boolean))
    ) as string[];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <div className="flex flex-wrap gap-3">
        {FILTER_FIELDS.map(({ key, label }) => (
          <Select
            key={key}
            value={filters[key] || ""}
            onValueChange={(v) =>
              setFilters((prev) => ({
                ...prev,
                [key]: v,
              }))
            }
          >
            <SelectTrigger className="w-44">
              <SelectValue placeholder={label} />
            </SelectTrigger>
            <SelectContent>
              {filterOptions(key).map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
      </div>

      {/* 🔍 LOCAL SEARCH (FILTER DESIGNATIONS) */}
      <div className="relative max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          placeholder="Search designation inside list..."
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
            {role}
          </button>
        ))}

        {filteredDesignations.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No designation matched your search
          </p>
        )}
      </div>

      {/* 📊 SALARY LIST */}
      <div className="border rounded-lg divide-y bg-white">
        {filteredData.map((item) => (
          <div
            key={item._id}
            className="p-5 flex justify-between items-start gap-6"
          >
            <div>
              {/* <h3 className="font-semibold">{item.companyName}</h3> */}
              <h3 className="font-semibold">{item.designation}</h3>
              <p className="text-sm text-muted-foreground">
                {item.designation}
                {item.department && ` • ${item.department}`}
              </p>

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
    </div>
  );
}
