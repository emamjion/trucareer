"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Lock, Search } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface Salary {
  _id: string;
  companyName: string;
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

  const designationParam = searchParams.get("designation") || "";

  const experienceParam = searchParams.get("experience") || "";
  const departmentParam = searchParams.get("department") || "";
  const locationParam = searchParams.get("location") || "";
  const employmentParam = searchParams.get("employmentType") || "";

  const [query, setQuery] = useState(designationParam);
  const [data, setData] = useState<Salary[]>([]);
  const [loading, setLoading] = useState(false);

  const isLoggedIn =
    typeof window !== "undefined" && !!localStorage.getItem("token");

  /* ---------------- FETCH DATA ---------------- */
  const fetchData = async (designation: string) => {
    if (!designation.trim()) return;

    setLoading(true);

    const params = new URLSearchParams({
      designation,
      experience: experienceParam,
      department: departmentParam,
      location: locationParam,
      employmentType: employmentParam,
    });

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_BACKEND_URL
      }/salary/search?${params.toString()}`
    );

    const json = await res.json();
    setData(json.data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (designationParam) fetchData(designationParam);
    else setData([]);
  }, [
    designationParam,
    experienceParam,
    departmentParam,
    locationParam,
    employmentParam,
  ]);

  /* ---------------- FILTER OPTIONS ---------------- */
  const filterOptions = useMemo(() => {
    const getUnique = (key: keyof Salary) =>
      Array.from(new Set(data.map((d) => d[key]).filter(Boolean))) as string[];

    return {
      experience: getUnique("experienceLevel"),
      department: getUnique("department"),
      location: getUnique("location"),
      employment: getUnique("employmentType"),
    };
  }, [data]);

  const applyFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    value ? params.set(key, value) : params.delete(key);
    router.push(`/salaries/search?${params.toString()}`);
  };

  const handleSearch = () => {
    if (!query.trim()) return;
    router.push(`/salaries/search?designation=${encodeURIComponent(query)}`);
  };

  /* ---------------- UI ---------------- */
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 space-y-10">
      <Link href={'/salaries'}>
        <Button>
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <div className="space-y-10">
        {/* 🔍 SEARCH BAR */}
        <div className="relative max-w-3xl">
          <Search
            onClick={handleSearch}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search role e.g. Frontend Engineer Intern"
            className="pl-12 py-6 text-base"
          />
        </div>

        {/* 🎛 FILTER BAR */}
        <div className="flex flex-wrap gap-3 bg-white p-4 rounded-xl shadow-sm sticky top-0 z-10">
          {filterOptions.experience.length > 0 && (
            <select
              onChange={(e) => applyFilter("experience", e.target.value)}
              className="border px-4 py-2 rounded-full text-sm"
            >
              <option value="">Experience</option>
              {filterOptions.experience.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          )}

          {filterOptions.department.length > 0 && (
            <select
              onChange={(e) => applyFilter("department", e.target.value)}
              className="border px-4 py-2 rounded-full text-sm"
            >
              <option value="">Department</option>
              {filterOptions.department.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          )}

          {filterOptions.location.length > 0 && (
            <select
              onChange={(e) => applyFilter("location", e.target.value)}
              className="border px-4 py-2 rounded-full text-sm"
            >
              <option value="">Location</option>
              {filterOptions.location.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          )}

          {filterOptions.employment.length > 0 && (
            <select
              onChange={(e) => applyFilter("employmentType", e.target.value)}
              className="border px-4 py-2 rounded-full text-sm"
            >
              <option value="">Employment</option>
              {filterOptions.employment.map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          )}
        </div>

        {/* 🧾 TITLE */}
        {designationParam && (
          <h1 className="text-2xl font-bold">{designationParam} Salaries</h1>
        )}

        {/* ⏳ LOADING */}
        {loading && <p>Loading salary data...</p>}

        {/* 📊 RESULTS */}
        <div className="grid gap-6">
          {data.map((item) => (
            <Card
              key={item._id}
              className="hover:shadow-md transition rounded-xl"
            >
              <CardContent className="p-6 flex justify-between gap-6">
                <div>
                  {/* <h3 className="font-semibold text-lg">{item.companyName}</h3> */}
                  <h3 className="font-semibold text-lg">{item.designation}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.designation}{" "}
                    {item.department && ` • ${item.department}`}
                  </p>

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

                {/* 💰 SALARY */}
                <div className="relative text-right min-w-[160px]">
                  {isLoggedIn ? (
                    <>
                      <p className="text-2xl font-bold text-green-600">
                        ৳{item.totalMonthly?.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">per month</p>
                    </>
                  ) : (
                    <>
                      <div className="blur-sm text-2xl font-bold">৳•••••</div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                          size="sm"
                          onClick={() => router.push("/auth/login")}
                          className="flex gap-2"
                        >
                          <Lock size={14} /> Login to view
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!loading && data.length === 0 && designationParam && (
          <p className="text-muted-foreground">No salary data found</p>
        )}
      </div>
    </section>
  );
}
