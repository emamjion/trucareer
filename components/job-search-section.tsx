import { Search, MapPin, Briefcase, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const featuredJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    salary: "$120K - $160K",
    type: "Full-time",
    posted: "2 days ago",
    skills: ["React", "Node.js", "TypeScript"],
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "Global Finance Inc",
    location: "New York, NY",
    salary: "$110K - $140K",
    type: "Full-time",
    posted: "1 day ago",
    skills: ["Product Strategy", "Analytics", "Agile"],
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "UX Designer",
    company: "HealthTech Innovations",
    location: "Boston, MA",
    salary: "$85K - $110K",
    type: "Full-time",
    posted: "3 days ago",
    skills: ["Figma", "User Research", "Prototyping"],
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "EcoEnergy Systems",
    location: "Austin, TX",
    salary: "$100K - $130K",
    type: "Full-time",
    posted: "1 week ago",
    skills: ["Python", "Machine Learning", "SQL"],
    logo: "/placeholder.svg?height=40&width=40",
  },
]

export default function JobSearchSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Find Your Next Opportunity</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover job openings at companies with great reviews and competitive salaries
          </p>
        </div>

        {/* Job Search Bar */}
        <Card className="mb-12">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Job title or keyword" className="pl-10" />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Location" className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">Search Jobs</Button>
            </div>
          </CardContent>
        </Card>

        {/* Featured Jobs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredJobs.map((job) => (
            <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={job.logo || "/placeholder.svg"}
                    alt={`${job.company} logo`}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                    <p className="text-muted-foreground mb-2">{job.company}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        {job.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {job.posted}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="font-semibold text-primary text-lg">{job.salary}</p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <Button className="w-full">Apply Now</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            View All Jobs
          </Button>
        </div>
      </div>
    </section>
  )
}
