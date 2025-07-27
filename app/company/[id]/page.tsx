import { Star, MapPin, Users, Building2, Camera, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ReviewModal from "@/components/review-modal"
import ReviewCard from "@/components/review-card"
import Image from "next/image"

// Mock data for company profile
const companyData = {
  id: 1,
  name: "TechCorp Solutions",
  logo: "/placeholder.svg?height=80&width=80",
  rating: 4.2,
  reviewCount: 1247,
  industry: "Technology",
  location: "San Francisco, CA",
  size: "1000-5000 employees",
  founded: "2010",
  website: "www.techcorp.com",
  description:
    "TechCorp Solutions is a leading software development company specializing in AI and machine learning solutions. We're committed to innovation and creating cutting-edge technology that transforms businesses worldwide.",
  ratings: {
    workLife: 4.1,
    culture: 4.3,
    salary: 3.9,
    management: 3.8,
    growth: 4.0,
  },
  photos: [
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
  ],
}

const reviews = [
  {
    id: 1,
    rating: 4,
    title: "Great place to work with amazing culture",
    pros: "Excellent work-life balance, supportive management, great benefits package, opportunities for growth",
    cons: "Sometimes projects can be demanding, limited remote work options",
    role: "Software Engineer",
    employment: "Current Employee",
    date: "2024-01-15",
    helpful: 23,
    location: "San Francisco, CA",
  },
  {
    id: 2,
    rating: 5,
    title: "Best company I've ever worked for",
    pros: "Innovative projects, collaborative team environment, competitive salary, excellent learning opportunities",
    cons: "Fast-paced environment might not suit everyone",
    role: "Product Manager",
    employment: "Current Employee",
    date: "2024-01-10",
    helpful: 18,
    location: "San Francisco, CA",
  },
  {
    id: 3,
    rating: 3,
    title: "Good company but room for improvement",
    pros: "Good compensation, interesting work, smart colleagues",
    cons: "Management could be more transparent, limited career advancement in some departments",
    role: "Data Scientist",
    employment: "Former Employee",
    date: "2023-12-20",
    helpful: 12,
    location: "San Francisco, CA",
  },
]

export default function CompanyProfile({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Company Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <Image
                src={companyData.logo || "/placeholder.svg"}
                alt={`${companyData.name} logo`}
                width={80}
                height={80}
                className="rounded-lg"
              />

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{companyData.name}</h1>
                    <div className="flex items-center gap-4 text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {companyData.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {companyData.size}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building2 className="h-4 w-4" />
                        {companyData.industry}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-2xl font-bold">{companyData.rating}</span>
                      </div>
                      <span className="text-muted-foreground">({companyData.reviewCount} reviews)</span>
                    </div>
                    <ReviewModal>
                      <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        Add Review
                      </Button>
                    </ReviewModal>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{companyData.description}</p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{companyData.industry}</Badge>
                  <Badge variant="secondary">Founded {companyData.founded}</Badge>
                  <Badge variant="secondary">{companyData.size}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ratings Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Employee Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {Object.entries(companyData.ratings).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                    <span className="text-sm font-bold">{value}</span>
                  </div>
                  <Progress value={value * 20} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="reviews" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
            <TabsTrigger value="salaries">Salaries</TabsTrigger>
            <TabsTrigger value="jobs">Jobs</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Employee Reviews</h2>
              <ReviewModal>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Plus className="h-4 w-4" />
                  Write Review
                </Button>
              </ReviewModal>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline">Load More Reviews</Button>
            </div>
          </TabsContent>

          <TabsContent value="photos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Office Photos</h2>
              <Button variant="outline" className="gap-2 bg-transparent">
                <Camera className="h-4 w-4" />
                Add Photo
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companyData.photos.map((photo, index) => (
                <Card key={index} className="overflow-hidden">
                  <Image
                    src={photo || "/placeholder.svg"}
                    alt={`Office photo ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="salaries" className="space-y-6">
            <h2 className="text-2xl font-bold">Salary Information</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center py-8">
                  Salary data will be available soon. Help us by sharing your salary information.
                </p>
                <div className="text-center">
                  <Button>Share Salary</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <h2 className="text-2xl font-bold">Open Positions</h2>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center py-8">
                  No open positions available at the moment. Check back later for new opportunities.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
