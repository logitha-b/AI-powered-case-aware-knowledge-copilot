import { useCase } from '@/contexts/CaseContext';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Calendar,
  DollarSign,
  MapPin,
  AlertTriangle,
  User,
  FileText,
  Clock,
} from 'lucide-react';
import { format } from 'date-fns';

const getPriorityVariant = (priority: string) => {
  switch (priority) {
    case 'Low':
      return 'priorityLow';
    case 'Medium':
      return 'priorityMedium';
    case 'High':
      return 'priorityHigh';
    case 'Critical':
      return 'priorityCritical';
    default:
      return 'default';
  }
};

const getRiskVariant = (risk: string) => {
  switch (risk) {
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

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Open':
      return 'statusOpen';
    case 'In Progress':
      return 'statusInProgress';
    case 'Pending Review':
      return 'statusPending';
    case 'Escalated':
      return 'statusEscalated';
    case 'Resolved':
      return 'statusResolved';
    default:
      return 'default';
  }
};

export const CaseDetailsPanel = () => {
  const { activeCase } = useCase();

  if (!activeCase) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        <p>No case selected</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-auto p-4 space-y-4 scrollbar-thin">
      <Card className="border-l-4 border-l-primary">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium">
                Case ID
              </p>
              <CardTitle className="text-lg font-bold text-foreground">
                {activeCase.caseNumber}
              </CardTitle>
            </div>
            <Badge variant={getStatusVariant(activeCase.status)}>
              {activeCase.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground font-medium mb-1">
              Case Type
            </p>
            <p className="text-sm font-semibold text-foreground">
              {activeCase.type}
            </p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <Badge variant={getPriorityVariant(activeCase.priority)}>
                {activeCase.priority} Priority
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={getRiskVariant(activeCase.riskLevel)}>
                <AlertTriangle className="w-3 h-3 mr-1" />
                {activeCase.riskLevel} Risk
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Claimant:</span>
              <span className="font-medium">{activeCase.claimantName}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Jurisdiction:</span>
              <span className="font-medium">{activeCase.jurisdiction}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Value:</span>
              <span className="font-medium">
                ${activeCase.monetaryValue.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Opened:</span>
              <span className="font-medium">
                {format(new Date(activeCase.dateOpened), 'MMM d, yyyy')}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-muted-foreground">Updated:</span>
              <span className="font-medium">
                {format(new Date(activeCase.lastUpdated), 'MMM d, yyyy')}
              </span>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground font-medium">
                Description
              </span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {activeCase.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
