import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Target, TrendingUp, Users } from "lucide-react";

const careerArticles = [
  {
    id: 1,
    title: "How to Negotiate Your Salary Like a Pro",
    excerpt:
      "Learn the essential strategies for successful salary negotiations and get the compensation you deserve.",
    category: "Salary",
    readTime: "5 min read",
    image:
      "https://www.workitdaily.com/media-library/man-starts-his-new-job.jpg?id=27287891&width=1200&height=800&quality=85&coordinates=0%2C0%2C0%2C0?height=200&width=300",
    author: "Sarah Johnson",
    date: "Jan 15, 2024",
  },
  {
    id: 2,
    title: "Building a Strong Professional Network",
    excerpt:
      "Discover effective networking strategies that can accelerate your career growth and open new opportunities.",
    category: "Networking",
    readTime: "7 min read",
    image:
      "https://ccitraining.edu/wp-content/uploads/2025/04/how-to-get-an-office-job.png?height=200&width=300",
    author: "Michael Chen",
    date: "Jan 12, 2024",
  },
  {
    id: 3,
    title: "Mastering the Art of Job Interviews",
    excerpt:
      "Get insider tips on how to ace your next job interview and make a lasting impression on employers.",
    category: "Interview",
    readTime: "6 min read",
    image:
      "https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg?height=200&width=300",
    author: "Emily Rodriguez",
    date: "Jan 10, 2024",
  },
];

const careerTips = [
  {
    icon: Target,
    title: "Set Clear Career Goals",
    description:
      "Define your short-term and long-term career objectives to stay focused and motivated.",
  },
  {
    icon: TrendingUp,
    title: "Continuously Upskill",
    description:
      "Stay relevant in your field by learning new technologies and developing in-demand skills.",
  },
  {
    icon: Users,
    title: "Build Meaningful Relationships",
    description:
      "Cultivate professional relationships that can provide mentorship and career opportunities.",
  },
  {
    icon: BookOpen,
    title: "Stay Industry Informed",
    description:
      "Keep up with industry trends and news to make informed career decisions.",
  },
];

export default function CareerAdviceSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Career Advice & Resources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get expert advice and insights to accelerate your career growth
          </p>
        </div>

        {/* Career Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {careerTips.map((tip, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <tip.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">{tip.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {tip.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Latest Articles */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">
            Latest Career Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {careerArticles.map((article) => (
              <Card
                key={article.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {article.readTime}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>By {article.author}</span>
                    <span>{article.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}
