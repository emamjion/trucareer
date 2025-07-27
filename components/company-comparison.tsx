import { Star, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const comparisonData = [
  {
    name: "TechCorp Solutions",
    logo: "/placeholder.svg?height=50&width=50",
    overallRating: 4.2,
    workLife: 4.1,
    culture: 4.3,
    salary: 3.9,
    growth: 4.0,
    reviewCount: 1247,
    industry: "Technology",
  },
  {
    name: "Global Finance Inc",
    logo: "/placeholder.svg?height=50&width=50",
    overallRating: 3.8,
    workLife: 3.6,
    culture: 3.9,
    salary: 4.2,
    growth: 3.7,
    reviewCount: 892,
    industry: "Finance",
  },
  {
    name: "HealthTech Innovations",
    logo: "/placeholder.svg?height=50&width=50",
    overallRating: 4.5,
    workLife: 4.4,
    culture: 4.6,
    salary: 4.1,
    growth: 4.3,
    reviewCount: 634,
    industry: "Healthcare",
  },
]

export default function CompanyComparison() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Compare Top Companies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how leading companies stack up across different metrics
          </p>
        </div>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Company Comparison
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-semibold">Company</th>
                    <th className="text-center p-4 font-semibold">Overall Rating</th>
                    <th className="text-center p-4 font-semibold">Work-Life Balance</th>
                    <th className="text-center p-4 font-semibold">Culture</th>
                    <th className="text-center p-4 font-semibold">Salary</th>
                    <th className="text-center p-4 font-semibold">Growth</th>
                    <th className="text-center p-4 font-semibold">Reviews</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((company, index) => (
                    <tr key={index} className="border-t hover:bg-muted/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={company.logo || "/placeholder.svg"}
                            alt={`${company.name} logo`}
                            className="w-10 h-10 rounded-lg"
                          />
                          <div>
                            <div className="font-semibold">{company.name}</div>
                            <Badge variant="outline" className="text-xs">
                              {company.industry}
                            </Badge>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{company.overallRating}</span>
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-medium">{company.workLife}</span>
                          <Progress value={company.workLife * 20} className="w-16 h-1" />
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-medium">{company.culture}</span>
                          <Progress value={company.culture * 20} className="w-16 h-1" />
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-medium">{company.salary}</span>
                          <Progress value={company.salary * 20} className="w-16 h-1" />
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <span className="font-medium">{company.growth}</span>
                          <Progress value={company.growth * 20} className="w-16 h-1" />
                        </div>
                      </td>
                      <td className="p-4 text-center">
                        <span className="text-muted-foreground">{company.reviewCount}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button size="lg">Compare More Companies</Button>
        </div>
      </div>
    </section>
  )
}
