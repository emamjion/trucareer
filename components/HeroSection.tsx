import { Award, Building2, Search, TrendingUp, Users } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
const stats = [
  { icon: Building2, label: "Companies", value: "50K+" },
  { icon: Users, label: "Reviews", value: "2M+" },
  { icon: TrendingUp, label: "Salaries", value: "500K+" },
  { icon: Award, label: "Jobs", value: "100K+" },
];

const HeroSection = () => {
  return (
    <section className="hero-section py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            Find Your Dream Job with{" "}
            <span className="text-white">Real Reviews</span>
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Get insider insights on company culture, salaries, and work-life
            balance from real employees. Make informed career decisions.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search companies, jobs, or salaries..."
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button size="lg" className="h-12 px-8">
              Search
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-2 text-white" />
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-white">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
