"use client";

export default function SalaryChart() {
  const data = [
    { industry: "Technology", growth: 15, color: "bg-blue-500" },
    { industry: "Finance", growth: 8, color: "bg-green-500" },
    { industry: "Healthcare", growth: 12, color: "bg-purple-500" },
    { industry: "Energy", growth: 6, color: "bg-orange-500" },
    { industry: "Retail", growth: 4, color: "bg-red-500" },
  ];

  const maxGrowth = Math.max(...data.map((d) => d.growth));

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{item.industry}</span>
            <span className="text-sm text-muted-foreground">
              +{item.growth}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full ${item.color}`}
              style={{ width: `${(item.growth / maxGrowth) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
