"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

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
  const searchParams = useSearchParams();
  const designation = searchParams.get("designation") || "";

  const [data, setData] = useState<Salary[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState(designation);

  const fetchData = async (value: string) => {
    setLoading(true);
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/salaries/search?designation=${encodeURIComponent(value)}`
    );
    const json = await res.json();
    setData(json.data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (designation) fetchData(designation);
  }, [designation]);

  const handleSearch = () => {
    if (!query.trim()) return;
    window.history.pushState(
      {},
      "",
      `/salary/search?designation=${encodeURIComponent(query)}`
    );
    fetchData(query);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
      {/* 🔍 SEARCH BAR */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search designation e.g. Frontend Engineer"
          className="pl-12"
        />
      </div>

      {/* 🧾 HEADER */}
      <h1 className="text-2xl font-semibold">
        Salary Results for{" "}
        <span className="text-orange-600">{designation}</span>
      </h1>

      {/* ⏳ LOADING */}
      {loading && <p>Loading salaries...</p>}

      {/* ❌ EMPTY */}
      {!loading && data.length === 0 && (
        <p className="text-muted-foreground">
          No salary data found for this designation
        </p>
      )}

      {/* 📊 LIST */}
      <div className="grid gap-4">
        {data.map((item) => (
          <Card key={item._id}>
            <CardContent className="p-5 flex justify-between">
              <div className="space-y-1">
                <h3 className="font-semibold">{item.companyName}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.designation} • {item.department}
                </p>

                <div className="flex gap-2 flex-wrap">
                  {item.experienceLevel && (
                    <Badge variant="secondary">{item.experienceLevel}</Badge>
                  )}
                  {item.employmentType && (
                    <Badge variant="outline">{item.employmentType}</Badge>
                  )}
                  {item.location && (
                    <Badge variant="outline">{item.location}</Badge>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-green-600">
                  ৳{item.totalMonthly ?? "N/A"}
                </p>
                <p className="text-xs text-muted-foreground">per month</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
