import { useState } from 'react';
import { useCase } from '@/contexts/CaseContext';
import { mockKnowledgeItems } from '@/data/mockData';
import { KnowledgeItem, Citation } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  AlertTriangle,
  BookOpen,
  Brain,
  ChevronDown,
  ExternalLink,
  FileText,
  Gavel,
  AlertCircle,
  CheckCircle,
  Shield,
  Sparkles,
} from 'lucide-react';

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'policy':
      return <FileText className="w-4 h-4" />;
    case 'regulation':
      return <Gavel className="w-4 h-4" />;
    case 'sop':
      return <BookOpen className="w-4 h-4" />;
    case 'compliance':
      return <Shield className="w-4 h-4" />;
    case 'exception':
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'policy':
      return 'Policy';
    case 'regulation':
      return 'Regulation';
    case 'sop':
      return 'SOP';
    case 'compliance':
      return 'Compliance';
    case 'exception':
      return 'Exception';
    default:
      return type;
  }
};

const getConfidenceColor = (score: number) => {
  if (score >= 90) return 'bg-success';
  if (score >= 70) return 'bg-warning';
  return 'bg-destructive';
};

const getImpactVariant = (impact: string) => {
  switch (impact) {
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

const CitationBadge = ({
  citation,
  onClick,
}: {
  citation: Citation;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="citation-badge"
    title={`${citation.documentName} - ${citation.sectionId}`}
  >
    <FileText className="w-3 h-3" />
    {citation.sectionId}
  </button>
);

const KnowledgeCard = ({
  item,
  onViewCitation,
}: {
  item: KnowledgeItem;
  onViewCitation: (citation: Citation) => void;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card className="animate-slide-up border-l-4 border-l-primary/50">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="pb-2 cursor-pointer hover:bg-muted/30 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 flex-1">
                <div className="p-1.5 rounded-md bg-primary/10 text-primary mt-0.5">
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-[10px]">
                      {getTypeLabel(item.type)}
                    </Badge>
                    <Badge variant={getImpactVariant(item.complianceImpact)}>
                      {item.complianceImpact} Impact
                    </Badge>
                    {item.requiresReview && (
                      <Badge variant="warning" className="gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Review Required
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-sm font-semibold mt-2 leading-tight">
                    {item.title}
                  </CardTitle>
                </div>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            {/* Confidence Score */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Confidence Score</span>
                <span className="font-semibold">{item.confidenceScore}%</span>
              </div>
              <div className="confidence-bar">
                <div
                  className={`confidence-fill ${getConfidenceColor(
                    item.confidenceScore
                  )}`}
                  style={{ width: `${item.confidenceScore}%` }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="text-sm text-foreground whitespace-pre-line leading-relaxed">
              {item.content}
            </div>

            {/* Citations */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground font-medium">
                Sources & Citations
              </p>
              <div className="flex flex-wrap gap-2">
                {item.citations.map((citation) => (
                  <CitationBadge
                    key={citation.id}
                    citation={citation}
                    onClick={() => onViewCitation(citation)}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export const KnowledgeCopilot = () => {
  const { activeCase } = useCase();
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(
    null
  );

  if (!activeCase) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center text-muted-foreground">
          <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="font-medium">No Active Case</p>
          <p className="text-sm">Select a case to view relevant knowledge</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <h2 className="font-semibold text-foreground">Knowledge Copilot</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          AI-powered insights for{' '}
          <span className="font-medium text-foreground">
            {activeCase.type}
          </span>{' '}
          in{' '}
          <span className="font-medium text-foreground">
            {activeCase.jurisdiction}
          </span>
        </p>
      </div>

      {/* Context Banner */}
      <div className="px-4 py-3 bg-enterprise-highlight border-b border-border">
        <div className="flex items-start gap-2">
          <Brain className="w-4 h-4 text-accent mt-0.5" />
          <div>
            <p className="text-xs font-medium text-foreground">
              Context Analysis Complete
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Found {mockKnowledgeItems.length} relevant items based on case
              type, jurisdiction, and risk factors
            </p>
          </div>
        </div>
      </div>

      {/* Knowledge Items */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-3">
          {mockKnowledgeItems.map((item) => (
            <KnowledgeCard
              key={item.id}
              item={item}
              onViewCitation={setSelectedCitation}
            />
          ))}
        </div>
      </ScrollArea>

      {/* Citation Dialog */}
      <Dialog
        open={!!selectedCitation}
        onOpenChange={() => setSelectedCitation(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              Source Document
            </DialogTitle>
            <DialogDescription>
              Verifiable citation with full provenance
            </DialogDescription>
          </DialogHeader>

          {selectedCitation && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Document Name
                  </p>
                  <p className="text-sm font-medium">
                    {selectedCitation.documentName}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Version</p>
                  <p className="text-sm font-medium">
                    {selectedCitation.policyVersion}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Page Number
                  </p>
                  <p className="text-sm font-medium">
                    Page {selectedCitation.pageNumber}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Section ID
                  </p>
                  <p className="text-sm font-medium">
                    {selectedCitation.sectionId}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">
                    Last Updated
                  </p>
                  <p className="text-sm font-medium">
                    {selectedCitation.lastUpdated}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">
                  Relevant Excerpt
                </p>
                <div className="p-4 bg-muted rounded-lg border-l-4 border-l-primary">
                  <p className="text-sm italic leading-relaxed">
                    "{selectedCitation.excerpt}"
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedCitation(null)}
                >
                  Close
                </Button>
                <Button>
                  <ExternalLink className="w-4 h-4 mr-1" />
                  View Source PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
