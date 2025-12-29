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
import { ArrowLeft, Lock, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Salary {
  _id: string;
  designation: string;
  location?: string;
  department?: string;
  experienceLevel?: string;
  employmentType?: string;
  totalMonthly?: number;
}

export default function SalarySearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ---------------- URL PARAMS ---------------- */
  const designation = searchParams.get("designation") || "";
  const experienceLevel = searchParams.get("experience") || "";
  const department = searchParams.get("department") || "";
  const location = searchParams.get("location") || "";
  const employmentType = searchParams.get("employmentType") || "";

  const [query, setQuery] = useState(designation);
  const [data, setData] = useState<Salary[]>([]);
  const [allOptions, setAllOptions] = useState({
    experience: [] as string[],
    department: [] as string[],
    location: [] as string[],
    employmentType: [] as string[],
  });
  const [loading, setLoading] = useState(false);

  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  /* ---------------- FETCH DATA ---------------- */
  useEffect(() => {
    if (!designation) return;

    const fetchData = async () => {
      setLoading(true);

      const params = new URLSearchParams({
        designation,
      });

      if (experienceLevel) params.set("experience", experienceLevel);
      if (department) params.set("department", department);
      if (location) params.set("location", location);
      if (employmentType) params.set("employmentType", employmentType);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/salary/search?${params}`
      );
      const json = await res.json();

      setData(json.data || []);

      /* 🔒 Freeze filter options once */
      if (!allOptions.experience.length) {
        const uniq = (key: keyof Salary) =>
          Array.from(
            new Set(json.data.map((d: Salary) => d[key]).filter(Boolean))
          ) as string[];

        setAllOptions({
          experience: uniq("experienceLevel"),
          department: uniq("department"),
          location: uniq("location"),
          employmentType: uniq("employmentType"),
        });
      }

      setLoading(false);
    };

    fetchData();
  }, [designation, experienceLevel, department, location, employmentType]);

  /* ---------------- APPLY FILTER ---------------- */
  const applyFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(key, value) : params.delete(key);
    router.push(`/salaries/search?${params.toString()}`);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/salaries/search?designation=${query}`);
  };

  /* ---------------- UI ---------------- */
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 space-y-8">
      <Link href="/salaries">
        <Button variant="outline">
          <ArrowLeft /> Back
        </Button>
      </Link>

      {/* SEARCH */}
      <div className="relative max-w-3xl">
        <Search
          onClick={handleSearch}
          className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search role e.g. Frontend Engineer"
          className="pl-12 py-6"
        />
      </div>

      {/* FILTER BAR */}
      {/* <div className="flex flex-wrap gap-3 bg-white p-4 rounded-xl shadow-sm sticky top-0 z-10">
        <Select
          value={experienceLevel || undefined}
          onValueChange={(v) => applyFilter("experience", v)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            {allOptions.experience.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={department || undefined}
          onValueChange={(v) => applyFilter("department", v)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent>
            {allOptions.department.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={location || undefined}
          onValueChange={(v) => applyFilter("location", v)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            {allOptions.location.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={employmentType || undefined}
          onValueChange={(v) => applyFilter("employmentType", v)}
        >
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Employment" />
          </SelectTrigger>
          <SelectContent>
            {allOptions.employmentType.map((v) => (
              <SelectItem key={v} value={v}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div> */}

      {/* RESULTS */}
      {designation && (
        <h1 className="text-2xl font-bold">{designation} Salaries</h1>
      )}

      {loading && <p>Loading salary data...</p>}

      <div className="grid gap-6">
        {data.map((item) => (
          <Card key={item._id}>
            <CardContent className="p-6 flex justify-between gap-6">
              <div>
                <h3 className="font-semibold text-lg">{item.designation}</h3>
                <div className="flex gap-2 flex-wrap mt-3">
                  {item.experienceLevel && (
                    <Badge>{item.experienceLevel}</Badge>
                  )}
                  {item.location && (
                    <Badge variant="outline">{item.location}</Badge>
                  )}
                  {item.employmentType && (
                    <Badge variant="outline">{item.employmentType}</Badge>
                  )}
                </div>
              </div>

              <div className="text-right min-w-[160px]">
                {isLoggedIn ? (
                  <>
                    <p className="text-2xl font-bold text-green-600">
                      ৳{item.totalMonthly?.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </>
                ) : (
                  <Button size="sm" onClick={() => router.push("/auth/login")}>
                    <Lock size={14} /> Login to view
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {!loading && data.length === 0 && designation && (
        <p className="text-muted-foreground">No salary data found</p>
      )}
    </section>
  );
}
