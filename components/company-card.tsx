import { Star, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

interface Company {
  id: number
  name: string
  logo: string
  rating: number
  reviewCount: number
  industry: string
  location: string
  description: string
}

interface CompanyCardProps {
  company: Company
}

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/company/${company.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <Image
              src={company.logo || "/placeholder.svg"}
              alt={`${company.name} logo`}
              width={48}
              height={48}
              className="rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg mb-1 truncate">{company.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{company.rating}</span>
                <span className="text-muted-foreground text-sm">({company.reviewCount})</span>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{company.description}</p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{company.location}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {company.industry}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
