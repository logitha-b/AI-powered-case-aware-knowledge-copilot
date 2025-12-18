import { CaseDetailsPanel } from '@/components/workspace/CaseDetailsPanel';
import { AgentWorkArea } from '@/components/workspace/AgentWorkArea';
import { KnowledgeCopilot } from '@/components/workspace/KnowledgeCopilot';

const Workspace = () => {
  return (
    <div className="h-full flex">
      {/* Left Panel - Case Details */}
      <div className="w-80 border-r border-border bg-card flex-shrink-0">
        <CaseDetailsPanel />
      </div>

      {/* Center Panel - Agent Work Area */}
      <div className="flex-1 bg-card">
        <AgentWorkArea />
      </div>

      {/* Right Panel - Knowledge Copilot */}
      <div className="w-[420px] border-l border-border bg-card flex-shrink-0">
        <KnowledgeCopilot />
      </div>
    </div>
  );
};

export default Workspace;
