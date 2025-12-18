import { useState } from 'react';
import { mockPolicyDocuments } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Search,
  Upload,
  FileText,
  Gavel,
  BookOpen,
  Filter,
  Eye,
  Download,
  Database,
} from 'lucide-react';

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'policy':
      return <FileText className="w-4 h-4" />;
    case 'regulation':
      return <Gavel className="w-4 h-4" />;
    case 'sop':
      return <BookOpen className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const PolicyExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string>('all');

  const filteredDocuments = mockPolicyDocuments.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesJurisdiction =
      jurisdictionFilter === 'all' || doc.jurisdiction === jurisdictionFilter;
    return matchesSearch && matchesType && matchesJurisdiction;
  });

  const jurisdictions = [
    ...new Set(mockPolicyDocuments.map((d) => d.jurisdiction)),
  ];

  return (
    <div className="h-full overflow-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Policy Knowledge Explorer</h1>
          <p className="text-muted-foreground mt-1">
            Browse, search, and manage your policy knowledge base
          </p>
        </div>
        <Button variant="enterprise">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockPolicyDocuments.length}</p>
                <p className="text-xs text-muted-foreground">Total Documents</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <FileText className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockPolicyDocuments.filter((d) => d.type === 'policy').length}
                </p>
                <p className="text-xs text-muted-foreground">Policies</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Gavel className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockPolicyDocuments.filter((d) => d.type === 'regulation').length}
                </p>
                <p className="text-xs text-muted-foreground">Regulations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <BookOpen className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockPolicyDocuments.filter((d) => d.type === 'sop').length}
                </p>
                <p className="text-xs text-muted-foreground">SOPs</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Semantic search across all documents..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="policy">Policies</SelectItem>
                <SelectItem value="regulation">Regulations</SelectItem>
                <SelectItem value="sop">SOPs</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={jurisdictionFilter}
              onValueChange={setJurisdictionFilter}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Jurisdiction" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Jurisdictions</SelectItem>
                {jurisdictions.map((j) => (
                  <SelectItem key={j} value={j}>
                    {j}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Document Library</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Chunks</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-muted">
                        {getTypeIcon(doc.type)}
                      </div>
                      <span className="font-medium">{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize">
                      {doc.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {doc.version}
                  </TableCell>
                  <TableCell>{doc.jurisdiction}</TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">
                      {doc.chunkCount} chunks
                    </span>
                  </TableCell>
                  <TableCell>{doc.lastUpdated}</TableCell>
                  <TableCell>
                    <Badge
                      variant={doc.status === 'active' ? 'success' : 'secondary'}
                    >
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PolicyExplorer;
