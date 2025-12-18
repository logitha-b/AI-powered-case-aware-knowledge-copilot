import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  AlertTriangle,
  CheckCircle,
  Shield,
  Play,
  RefreshCw,
  Info,
  XCircle,
} from 'lucide-react';

interface SimulationResult {
  overallRisk: 'low' | 'medium' | 'high';
  complianceScore: number;
  findings: {
    type: 'pass' | 'warning' | 'fail';
    title: string;
    description: string;
  }[];
  recommendation: string;
}

const WhatIf = () => {
  const [caseType, setCaseType] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [monetaryValue, setMonetaryValue] = useState('');
  const [decision, setDecision] = useState('');
  const [skipManualReview, setSkipManualReview] = useState(false);
  const [expeditedProcessing, setExpeditedProcessing] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const runSimulation = () => {
    setIsSimulating(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResult: SimulationResult = {
        overallRisk: skipManualReview ? 'high' : expeditedProcessing ? 'medium' : 'low',
        complianceScore: skipManualReview ? 62 : expeditedProcessing ? 78 : 94,
        findings: [
          {
            type: skipManualReview ? 'fail' : 'pass',
            title: 'Manual Review Requirement',
            description: skipManualReview
              ? 'Skipping manual review violates SOP-HC-003 for claims above $50,000'
              : 'Manual review process compliant with internal policy',
          },
          {
            type: expeditedProcessing && Number(monetaryValue) > 100000 ? 'warning' : 'pass',
            title: 'Processing Timeline',
            description: expeditedProcessing && Number(monetaryValue) > 100000
              ? 'Expedited processing for high-value claims requires manager approval'
              : 'Processing timeline within acceptable parameters',
          },
          {
            type: 'pass',
            title: 'Jurisdiction Compliance',
            description: 'Decision aligns with jurisdictional requirements',
          },
          {
            type: skipManualReview ? 'fail' : 'pass',
            title: 'Audit Trail Requirements',
            description: skipManualReview
              ? 'Insufficient documentation for regulatory audit requirements'
              : 'Documentation meets audit standards',
          },
        ],
        recommendation: skipManualReview
          ? 'HIGH RISK: This decision path may expose the organization to regulatory penalties and potential litigation. Manual review is strongly recommended.'
          : expeditedProcessing && Number(monetaryValue) > 100000
          ? 'MODERATE RISK: Consider obtaining manager approval before proceeding with expedited processing for this high-value claim.'
          : 'LOW RISK: This decision path appears compliant with all relevant policies and regulations. Proceed with standard documentation.',
      };
      
      setResult(mockResult);
      setIsSimulating(false);
    }, 1500);
  };

  const resetSimulation = () => {
    setResult(null);
    setCaseType('');
    setJurisdiction('');
    setMonetaryValue('');
    setDecision('');
    setSkipManualReview(false);
    setExpeditedProcessing(false);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'high':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="h-full overflow-auto p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">What-If Compliance Checker</h1>
          <p className="text-muted-foreground mt-1">
            Simulate decisions and preview compliance outcomes before finalizing
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Simulation Input */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Simulation Parameters
              </CardTitle>
              <CardDescription>
                Configure the scenario you want to test
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Case Type</Label>
                  <Select value={caseType} onValueChange={setCaseType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flood">Flood Insurance Claim</SelectItem>
                      <SelectItem value="auto">Auto Insurance Claim</SelectItem>
                      <SelectItem value="health">Health Benefits Appeal</SelectItem>
                      <SelectItem value="workers">Workers Compensation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Jurisdiction</Label>
                  <Select value={jurisdiction} onValueChange={setJurisdiction}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select jurisdiction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fl">Florida, USA</SelectItem>
                      <SelectItem value="ca">California, USA</SelectItem>
                      <SelectItem value="tx">Texas, USA</SelectItem>
                      <SelectItem value="ny">New York, USA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Monetary Value ($)</Label>
                <Input
                  type="number"
                  placeholder="Enter claim value"
                  value={monetaryValue}
                  onChange={(e) => setMonetaryValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Proposed Decision</Label>
                <Textarea
                  placeholder="Describe the decision you want to simulate..."
                  value={decision}
                  onChange={(e) => setDecision(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Skip Manual Review</Label>
                    <p className="text-xs text-muted-foreground">
                      Bypass the standard review process
                    </p>
                  </div>
                  <Switch
                    checked={skipManualReview}
                    onCheckedChange={setSkipManualReview}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Expedited Processing</Label>
                    <p className="text-xs text-muted-foreground">
                      Fast-track this decision
                    </p>
                  </div>
                  <Switch
                    checked={expeditedProcessing}
                    onCheckedChange={setExpeditedProcessing}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  className="flex-1"
                  onClick={runSimulation}
                  disabled={isSimulating || !caseType || !jurisdiction}
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Simulating...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Simulation
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={resetSimulation}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Simulation Results */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Analysis</CardTitle>
              <CardDescription>
                Preview the outcome of your proposed decision
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!result ? (
                <div className="h-[400px] flex items-center justify-center text-center">
                  <div className="space-y-3">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                      <Info className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      Configure your scenario and click "Run Simulation" to see
                      compliance analysis
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  {/* Overall Score */}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Overall Risk Level
                      </p>
                      <p
                        className={`text-2xl font-bold capitalize ${getRiskColor(
                          result.overallRisk
                        )}`}
                      >
                        {result.overallRisk}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Compliance Score
                      </p>
                      <p
                        className={`text-2xl font-bold ${getScoreColor(
                          result.complianceScore
                        )}`}
                      >
                        {result.complianceScore}%
                      </p>
                    </div>
                  </div>

                  {/* Findings */}
                  <div className="space-y-3">
                    <p className="text-sm font-medium">Compliance Checks</p>
                    {result.findings.map((finding, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg border border-border"
                      >
                        {finding.type === 'pass' && (
                          <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                        )}
                        {finding.type === 'warning' && (
                          <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
                        )}
                        {finding.type === 'fail' && (
                          <XCircle className="w-5 h-5 text-destructive mt-0.5" />
                        )}
                        <div>
                          <p className="text-sm font-medium">{finding.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {finding.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendation */}
                  <div
                    className={`p-4 rounded-lg border-l-4 ${
                      result.overallRisk === 'high'
                        ? 'bg-destructive/5 border-l-destructive'
                        : result.overallRisk === 'medium'
                        ? 'bg-warning/5 border-l-warning'
                        : 'bg-success/5 border-l-success'
                    }`}
                  >
                    <p className="text-sm font-medium mb-1">AI Recommendation</p>
                    <p className="text-sm text-muted-foreground">
                      {result.recommendation}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WhatIf;
