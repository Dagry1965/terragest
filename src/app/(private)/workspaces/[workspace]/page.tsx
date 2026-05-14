import { notFound } from "next/navigation";

import {
  ERPWorkspaceDashboard,
} from "@/components/erp/workspace/ERPWorkspaceDashboard";

import {
  ERPWorkspaceRegistry,
} from "@/runtime/workspaces/ERPWorkspaceRegistry";

import {
  ERPWorkspaceContextResolver,
} from "@/runtime/workspaces/ERPWorkspaceContextResolver";

interface WorkspacePageProps {
  params: Promise<{
    workspace: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function WorkspacePage({
  params,
}: WorkspacePageProps) {

  const { workspace } = await params;

  const currentWorkspace =
    ERPWorkspaceRegistry.find(
      (item) => item.key === workspace
    );

  if (!currentWorkspace) {
    notFound();
  }

  const context =
    ERPWorkspaceContextResolver.resolveWorkspaceContext(
      currentWorkspace
    );

  return (
    <ERPWorkspaceDashboard
      context={context}
    />
  );
}