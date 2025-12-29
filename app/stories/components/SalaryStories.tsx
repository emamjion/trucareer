"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { useEffect, useState } from "react";

interface SalaryStory {
  _id: string;
  designation: string;
  companyName: string;
  department: string;
  location: string;
  experience: string;
  totalMonthly: number;
  minimumIncrement: number;
  storyTitle?: string;
  storyDescription?: string;
  pros?: string[];
  cons?: string[];
  isAnonymous: boolean;
  createdAt: string;
  type: string;
}

const experienceRanges = [
  "All",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
];
const locations = [
  "All",
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Sylhet",
  "Khulna",
];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "salary-high", label: "Highest Salary" },
  { value: "salary-low", label: "Lowest Salary" },
];

const ITEMS_PER_PAGE = 5;

export default function SalaryStories() {
  const [stories, setStories] = useState<SalaryStory[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const fetchStories = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/admin/salaries`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();
      console.log("data: ", json);
      setStories(json.data.filter((d: SalaryStory) => d.type === "story"));
      setLoading(false);
    };

    fetchStories();
  }, []);

  /* Reset page on filter change */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedExperience, selectedLocation, sortBy]);

  /* ---------------- HELPERS ---------------- */
  const formatSalary = (n: number) => `৳${n.toLocaleString()}`;

  const toggleCard = (id: string) => {
    const copy = new Set(expandedCards);
    copy.has(id) ? copy.delete(id) : copy.add(id);
    setExpandedCards(copy);
  };

  /* ---------------- FILTER + SORT ---------------- */
  const filteredStories = stories
    .filter((s) => {
      const search =
        s.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.companyName.toLowerCase().includes(searchTerm.toLowerCase());

      const exp =
        selectedExperience === "All" || s.experience === selectedExperience;

      const loc =
        selectedLocation === "All" ||
        s.location.toLowerCase().includes(selectedLocation.toLowerCase());

      return search && exp && loc;
    })
    .sort((a, b) => {
      if (sortBy === "newest")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortBy === "oldest")
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      if (sortBy === "salary-high") return b.totalMonthly - a.totalMonthly;
      if (sortBy === "salary-low") return a.totalMonthly - b.totalMonthly;
      return 0;
    });

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStories = filteredStories.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Salary Stories</h1>
        <p className="text-gray-600">
          Real salary experiences from professionals across Bangladesh
        </p>
      </div>

      {/* Search + Filters */}
      <div className="space-y-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            className="pl-10"
            placeholder="Search job or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Select
            value={selectedExperience}
            onValueChange={setSelectedExperience}
          >
            <SelectTrigger>
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              {experienceRanges.map((e) => (
                <SelectItem key={e} value={e}>
                  {e === "All" ? "All Experience" : `${e} years`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stories */}
      <div className="space-y-4">
        {paginatedStories.map((s) => (
          <Card key={s._id}>
            <CardContent className="p-0">
              <div
                className="p-6 flex justify-between cursor-pointer hover:bg-gray-50"
                onClick={() => toggleCard(s._id)}
              >
                <div>
                  <h3 className="text-xl font-semibold">{s.designation}</h3>
                  <div className="mt-2 font-bold text-2xl">
                    {formatSalary(s.totalMonthly)}
                  </div>

                  <div className="flex gap-4 mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {s.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {s.location}
                    </span>
                    <Badge variant="outline">{s.experience} yrs</Badge>
                  </div>
                </div>

                <Button variant="ghost" size="icon">
                  {expandedCards.has(s._id) ? <Minus /> : <Plus />}
                </Button>
              </div>

              {expandedCards.has(s._id) && (
                <div className="border-t bg-gray-50 p-6 space-y-4">
                  {s.storyTitle && (
                    <h4 className="font-semibold">{s.storyTitle}</h4>
                  )}
                  {s.storyDescription && (
                    <p className="bg-white p-4 rounded border">
                      {s.storyDescription}
                    </p>
                  )}

                  {s.pros?.length ? (
                    <div>
                      <h4 className="font-semibold">Pros</h4>
                      <ul className="list-disc pl-5">
                        {s.pros.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {s.cons?.length ? (
                    <div>
                      <h4 className="font-semibold">Cons</h4>
                      <ul className="list-disc pl-5">
                        {s.cons.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="flex justify-between text-sm text-gray-500 pt-4 border-t">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {s.isAnonymous ? "Anonymous" : "User"}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(s.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
