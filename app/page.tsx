import CareerAdviceSection from "@/components/career-advice-section";
import CompanyCard from "@/components/company-card";
import CompanyComparison from "@/components/company-comparison";
import Footer from "@/components/footer";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Building2, Star, TrendingUp, Users } from "lucide-react";

const featuredCompanies = [
  {
    id: 1,
    name: "TechCorp Solutions",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.2,
    reviewCount: 1247,
    industry: "Technology",
    location: "San Francisco, CA",
    description:
      "Leading software development company specializing in AI and machine learning solutions.",
  },
  {
    id: 2,
    name: "Global Finance Inc",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 3.8,
    reviewCount: 892,
    industry: "Finance",
    location: "New York, NY",
    description:
      "Premier financial services company with global reach and innovative solutions.",
  },
  {
    id: 3,
    name: "HealthTech Innovations",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.5,
    reviewCount: 634,
    industry: "Healthcare",
    location: "Boston, MA",
    description:
      "Revolutionary healthcare technology company improving patient outcomes worldwide.",
  },
  {
    id: 4,
    name: "EcoEnergy Systems",
    logo: "/placeholder.svg?height=60&width=60",
    rating: 4.1,
    reviewCount: 456,
    industry: "Energy",
    location: "Austin, TX",
    description:
      "Sustainable energy solutions company focused on renewable technologies.",
  },
];

const stats = [
  { icon: Building2, label: "Companies", value: "50K+" },
  { icon: Users, label: "Reviews", value: "2M+" },
  { icon: TrendingUp, label: "Salaries", value: "500K+" },
  { icon: Award, label: "Jobs", value: "100K+" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <HeroSection />

      {/* Featured Companies */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Companies</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover what it's really like to work at these top-rated
              companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCompanies.map((company) => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Companies
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get comprehensive insights to make the best career decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Real Employee Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get honest insights from current and former employees about
                  company culture, management, and work environment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Salary Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access comprehensive salary data and compensation packages to
                  negotiate better offers and plan your career.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Building2 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Company Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Detailed company information including ratings, photos,
                  benefits, and insider tips from employees.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Companies by Industry */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Top Companies by Industry
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the best-rated companies across different industries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                industry: "Technology",
                companies: 1250,
                avgRating: 4.2,
                icon: "💻",
              },
              {
                industry: "Finance",
                companies: 890,
                avgRating: 3.9,
                icon: "💰",
              },
              {
                industry: "Healthcare",
                companies: 670,
                avgRating: 4.1,
                icon: "🏥",
              },
              {
                industry: "Education",
                companies: 540,
                avgRating: 4.0,
                icon: "🎓",
              },
              {
                industry: "Retail",
                companies: 780,
                avgRating: 3.7,
                icon: "🛍️",
              },
              {
                industry: "Manufacturing",
                companies: 450,
                avgRating: 3.8,
                icon: "🏭",
              },
            ].map((industry, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">
                    {industry.industry}
                  </h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p>{industry.companies} companies</p>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {industry.avgRating} avg rating
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Reviews */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent Reviews</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See what employees are saying about their workplaces
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                company: "TechCorp Solutions",
                rating: 4,
                title: "Great work-life balance",
                excerpt:
                  "Amazing company culture and supportive management. Really enjoying my time here...",
                role: "Software Engineer",
                date: "2 days ago",
              },
              {
                company: "Global Finance Inc",
                rating: 5,
                title: "Excellent growth opportunities",
                excerpt:
                  "The learning curve is steep but the opportunities for advancement are incredible...",
                role: "Financial Analyst",
                date: "3 days ago",
              },
              {
                company: "HealthTech Innovations",
                rating: 4,
                title: "Meaningful work environment",
                excerpt:
                  "Working on projects that actually make a difference in people's lives is very fulfilling...",
                role: "Product Manager",
                date: "5 days ago",
              },
            ].map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{review.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                    {review.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-medium">{review.company}</span>
                    <Badge variant="outline">{review.role}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              View All Reviews
            </Button>
          </div>
        </div>
      </section>

      {/* Salary Insights */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Salary Insights</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get transparent salary information to make informed career
              decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                role: "Software Engineer",
                avgSalary: "$95,000",
                range: "$70K - $130K",
                growth: "+8%",
              },
              {
                role: "Product Manager",
                avgSalary: "$110,000",
                range: "$85K - $150K",
                growth: "+12%",
              },
              {
                role: "Data Scientist",
                avgSalary: "$105,000",
                range: "$80K - $140K",
                growth: "+15%",
              },
              {
                role: "UX Designer",
                avgSalary: "$85,000",
                range: "$65K - $115K",
                growth: "+10%",
              },
            ].map((salary, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2">{salary.role}</h3>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {salary.avgSalary}
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">
                    {salary.range}
                  </p>
                  <Badge variant="secondary" className="text-green-600">
                    {salary.growth} growth
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button size="lg">Explore All Salaries</Button>
          </div>
        </div>
      </section>

      {/* <JobSearchSection /> */}

      <CompanyComparison />

      <CareerAdviceSection />

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from professionals who found their dream jobs using our
              platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Software Engineer at TechCorp",
                content:
                  "CareerInsight helped me understand the company culture before I applied. The reviews were spot-on and helped me prepare for the interview process.",
                avatar: "SJ",
              },
              {
                name: "Michael Chen",
                role: "Product Manager at StartupXYZ",
                content:
                  "The salary insights were incredibly valuable during my negotiation. I was able to get a 20% increase thanks to the data provided here.",
                avatar: "MC",
              },
              {
                name: "Emily Rodriguez",
                role: "UX Designer at DesignCo",
                content:
                  "I love how transparent the reviews are. It gave me confidence to make the right career move and I couldn't be happier with my new role.",
                avatar: "ER",
              },
            ].map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto text-center p-8">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold">
                Ready to Find Your Next Opportunity?
              </h2>
              <p className="text-muted-foreground text-lg">
                Join thousands of professionals who trust our platform for
                career insights
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="px-8">
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 bg-transparent"
                >
                  Browse Companies
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
