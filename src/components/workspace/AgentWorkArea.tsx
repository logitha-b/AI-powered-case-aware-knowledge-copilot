import { useState } from 'react';
import { useCase } from '@/contexts/CaseContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  CheckCircle,
  Clock,
  FileText,
  MessageSquare,
  Send,
  History,
} from 'lucide-react';

export const AgentWorkArea = () => {
  const { activeCase, cases, setActiveCase } = useCase();
  const [notes, setNotes] = useState('');

  const caseHistory = [
    {
      id: '1',
      action: 'Case assigned to agent',
      timestamp: '2024-01-15 09:00 AM',
      user: 'System',
    },
    {
      id: '2',
      action: 'Initial documentation reviewed',
      timestamp: '2024-01-15 10:30 AM',
      user: 'Sarah Mitchell',
    },
    {
      id: '3',
      action: 'Inspection scheduled',
      timestamp: '2024-01-16 02:15 PM',
      user: 'Sarah Mitchell',
    },
    {
      id: '4',
      action: 'Knowledge Copilot consulted for policy guidance',
      timestamp: '2024-01-18 11:00 AM',
      user: 'Sarah Mitchell',
    },
  ];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Case Selector */}
      <div className="p-4 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="text-xs text-muted-foreground font-medium mb-1 block">
              Active Case
            </label>
            <Select
              value={activeCase?.id}
              onValueChange={(value) => {
                const selected = cases.find((c) => c.id === value);
                if (selected) setActiveCase(selected);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a case" />
              </SelectTrigger>
              <SelectContent>
                {cases.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{c.caseNumber}</span>
                      <span className="text-muted-foreground">-</span>
                      <span className="text-muted-foreground">{c.type}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-5">
            <Button variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-1" />
              Documents
            </Button>
            <Button variant="enterprise" size="sm">
              <CheckCircle className="w-4 h-4 mr-1" />
              Complete Review
            </Button>
          </div>
        </div>
      </div>

      {/* Work Area Content */}
      <div className="flex-1 overflow-auto p-4">
        <Tabs defaultValue="notes" className="h-full flex flex-col">
          <TabsList className="w-fit">
            <TabsTrigger value="notes" className="gap-2">
              <MessageSquare className="w-4 h-4" />
              Case Notes
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <History className="w-4 h-4" />
              Activity Log
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="flex-1 mt-4">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Add Case Notes</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col gap-4">
                <Textarea
                  placeholder="Enter your case notes, observations, or decisions..."
                  className="flex-1 min-h-[200px] resize-none"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground">
                    Notes are automatically saved and timestamped
                  </p>
                  <Button size="sm">
                    <Send className="w-4 h-4 mr-1" />
                    Save Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="flex-1 mt-4 overflow-auto">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Case Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseHistory.map((item, index) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        {index < caseHistory.length - 1 && (
                          <div className="w-px h-full bg-border flex-1 mt-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="text-sm font-medium text-foreground">
                          {item.action}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {item.timestamp}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {item.user}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
