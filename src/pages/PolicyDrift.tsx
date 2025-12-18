import { mockPolicyChanges } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  FileText,
  GitCompare,
  TrendingUp,
} from 'lucide-react';

const getSeverityVariant = (severity: string) => {
  switch (severity) {
    case 'Low':
      return 'riskLow';
    case 'Medium':
      return 'riskMedium';
    case 'High':
      return 'riskHigh';
    default:
      return 'default';
  }
};

const getChangeTypeColor = (type: string) => {
  switch (type) {
    case 'added':
      return 'text-success';
    case 'modified':
      return 'text-warning';
    case 'removed':
      return 'text-destructive';
    default:
      return 'text-muted-foreground';
  }
};

const PolicyDrift = () => {
  const totalAffectedCases = mockPolicyChanges.reduce(
    (sum, change) => sum + change.affectedCases,
    0
  );
  const highSeverityCount = mockPolicyChanges.filter(
    (c) => c.severity === 'High'
  ).length;

  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Policy Drift Detection</h1>
          <p className="text-muted-foreground mt-1">
            Monitor policy changes and their impact on active cases
          </p>
        </div>
        <Button variant="outline">
          <Bell className="w-4 h-4 mr-2" />
          Configure Alerts
        </Button>
      </div>

      {/* Alert Banner */}
      {highSeverityCount > 0 && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-destructive/10">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">
                  {highSeverityCount} High-Severity Policy Change
                  {highSeverityCount > 1 ? 's' : ''} Detected
                </p>
                <p className="text-sm text-muted-foreground">
                  {totalAffectedCases} active cases may require review based on
                  recent policy updates
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Review Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <GitCompare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockPolicyChanges.length}</p>
                <p className="text-xs text-muted-foreground">Recent Changes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <FileText className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalAffectedCases}</p>
                <p className="text-xs text-muted-foreground">Cases Affected</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{highSeverityCount}</p>
                <p className="text-xs text-muted-foreground">High Severity</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-xs text-muted-foreground">
                  Compliance Rate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policy Changes List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-foreground">Recent Policy Changes</h2>
        {mockPolicyChanges.map((change) => (
          <Card key={change.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-muted">
                  <FileText className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {change.documentName}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-muted-foreground font-mono">
                          v{change.oldVersion}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-mono font-medium">
                          v{change.newVersion}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`capitalize ${getChangeTypeColor(
                          change.changeType
                        )}`}
                        variant="secondary"
                      >
                        {change.changeType}
                      </Badge>
                      <Badge variant={getSeverityVariant(change.severity)}>
                        {change.severity} Severity
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {change.summary}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-muted-foreground">
                        Changed:{' '}
                        <span className="font-medium text-foreground">
                          {change.changedDate}
                        </span>
                      </span>
                      <span className="text-muted-foreground">
                        Affected Cases:{' '}
                        <span className="font-medium text-foreground">
                          {change.affectedCases}
                        </span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Diff
                      </Button>
                      <Button variant="default" size="sm">
                        Review Cases
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PolicyDrift;
