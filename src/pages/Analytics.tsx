import { mockAnalytics } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingDown,
  Clock,
  FileText,
  Brain,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

const COLORS = ['hsl(217, 71%, 45%)', 'hsl(200, 80%, 45%)', 'hsl(142, 71%, 35%)', 'hsl(38, 92%, 50%)', 'hsl(0, 72%, 51%)'];

const Analytics = () => {
  const pieData = mockAnalytics.topPolicies.map((p, i) => ({
    name: p.name,
    value: p.count,
    color: COLORS[i % COLORS.length],
  }));

  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manager Analytics Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Operational insights and performance metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Handling Time</p>
                <p className="text-2xl font-bold mt-1">
                  {mockAnalytics.averageHandlingTime}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    days
                  </span>
                </p>
                <div className="flex items-center gap-1 mt-2 text-success text-xs">
                  <ArrowDownRight className="w-3 h-3" />
                  <span>12% faster than last month</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <Clock className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Compliance Error Reduction
                </p>
                <p className="text-2xl font-bold mt-1">
                  {mockAnalytics.complianceErrorReduction}%
                </p>
                <div className="flex items-center gap-1 mt-2 text-success text-xs">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>Since AI implementation</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-success/10">
                <TrendingDown className="w-5 h-5 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Cases Processed</p>
                <p className="text-2xl font-bold mt-1">
                  {mockAnalytics.totalCasesProcessed.toLocaleString()}
                </p>
                <div className="flex items-center gap-1 mt-2 text-muted-foreground text-xs">
                  <span>This quarter</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-accent/10">
                <FileText className="w-5 h-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Knowledge Utilization
                </p>
                <p className="text-2xl font-bold mt-1">
                  {mockAnalytics.knowledgeUtilization}%
                </p>
                <div className="flex items-center gap-1 mt-2 text-primary text-xs">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>5% increase</span>
                </div>
              </div>
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="w-5 h-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Cases Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockAnalytics.casesOverTime}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="opened"
                    stackId="1"
                    stroke="hsl(200, 80%, 45%)"
                    fill="hsl(200, 80%, 45%)"
                    fillOpacity={0.3}
                    name="Opened"
                  />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    stackId="2"
                    stroke="hsl(142, 71%, 35%)"
                    fill="hsl(142, 71%, 35%)"
                    fillOpacity={0.3}
                    name="Resolved"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Risk Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockAnalytics.riskTrends}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="high"
                    stroke="hsl(0, 72%, 51%)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="High Risk"
                  />
                  <Line
                    type="monotone"
                    dataKey="medium"
                    stroke="hsl(38, 92%, 50%)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Medium Risk"
                  />
                  <Line
                    type="monotone"
                    dataKey="low"
                    stroke="hsl(142, 71%, 35%)"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    name="Low Risk"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-3 gap-6">
        <Card className="col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Most Referenced Policies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockAnalytics.topPolicies}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    className="text-xs"
                    width={120}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar
                    dataKey="count"
                    fill="hsl(217, 71%, 45%)"
                    radius={[0, 4, 4, 0]}
                    name="References"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Policy Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-1">
              {pieData.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground truncate max-w-[120px]">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
