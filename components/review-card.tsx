import { Star, ThumbsUp, ThumbsDown, MapPin, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Review {
  id: number
  rating: number
  title: string
  pros: string
  cons: string
  role: string
  employment: string
  date: string
  helpful: number
  location: string
}

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar>
              <AvatarFallback>
                {review.role
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{review.rating}/5</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">{review.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <Badge variant="outline">{review.role}</Badge>
                <Badge variant={review.employment === "Current Employee" ? "default" : "secondary"}>
                  {review.employment}
                </Badge>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {review.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(review.date)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-green-700 mb-2">Pros</h4>
          <p className="text-muted-foreground">{review.pros}</p>
        </div>

        <div>
          <h4 className="font-medium text-red-700 mb-2">Cons</h4>
          <p className="text-muted-foreground">{review.cons}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2">
              <ThumbsUp className="h-4 w-4" />
              Helpful ({review.helpful})
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <ThumbsDown className="h-4 w-4" />
              Not Helpful
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
