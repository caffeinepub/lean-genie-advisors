import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useActor } from "@/hooks/useActor";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { HttpAgent } from "@icp-sdk/core/agent";
import { useQuery } from "@tanstack/react-query";
import { Loader2, LogOut, ShieldCheck, Users } from "lucide-react";
import { useState } from "react";
import { loadConfig } from "./config";
import { StorageClient } from "./utils/StorageClient";

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ResumeLink({ fileId }: { fileId: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (url) {
      window.open(url, "_blank");
      return;
    }
    setLoading(true);
    try {
      const config = await loadConfig();
      const agent = new HttpAgent({ host: config.backend_host });
      if (config.backend_host?.includes("localhost")) {
        await agent.fetchRootKey().catch(() => {});
      }
      const storageClient = new StorageClient(
        config.bucket_name,
        config.storage_gateway_url,
        config.backend_canister_id,
        config.project_id,
        agent,
      );
      const directUrl = await storageClient.getDirectURL(fileId);
      setUrl(directUrl);
      window.open(directUrl, "_blank");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="text-sm font-medium text-aqua-600 underline underline-offset-2 hover:text-aqua-800 disabled:opacity-50"
    >
      {loading ? "Loading..." : "Download"}
    </button>
  );
}

export default function AdminPanel() {
  const { identity, login, clear, isLoggingIn, isLoginError } =
    useInternetIdentity();
  const { actor, isFetching } = useActor();

  const { data: applications, isLoading } = useQuery<any[]>({
    queryKey: ["career-applications"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getAllCareerApplications(0n, 100n);
    },
    enabled: !!actor && !isFetching && !!identity,
  });

  const { data: appCount } = useQuery<bigint>({
    queryKey: ["career-application-count"],
    queryFn: async () => {
      if (!actor) return 0n;
      return (actor as any).getCareerApplicationCount();
    },
    enabled: !!actor && !isFetching && !!identity,
  });

  if (!identity) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-white p-10 shadow-sm text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-aqua-50 border border-aqua-100">
            <ShieldCheck className="h-7 w-7 text-aqua-600" />
          </div>
          <h1 className="mb-2 font-display text-2xl font-bold text-foreground">
            Admin Access
          </h1>
          <p className="mb-8 text-sm text-muted-foreground font-body">
            Sign in to review career applications.
          </p>
          <Button
            data-ocid="admin.login_button"
            onClick={() => login()}
            disabled={isLoggingIn}
            className="w-full rounded-full font-body font-semibold"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Login with Internet Identity"
            )}
          </Button>
          {isLoginError && (
            <p
              data-ocid="admin.login.error_state"
              className="mt-4 text-xs text-destructive"
            >
              Login failed. Please try again.
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-white/90 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-aqua-600">
              <ShieldCheck className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold text-foreground">
              Admin Panel
            </span>
            <span className="hidden sm:inline font-body text-sm text-muted-foreground">
              — Lean Genie Advisors
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block font-body text-xs text-muted-foreground">
              {identity.getPrincipal().toString().slice(0, 16)}…
            </span>
            <Button
              data-ocid="admin.logout_button"
              variant="outline"
              size="sm"
              onClick={() => clear()}
              className="rounded-full font-body border-border"
            >
              <LogOut className="mr-2 h-3.5 w-3.5" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-12">
        {/* Stats */}
        <div className="mb-10 flex items-center gap-4">
          <div className="flex items-center gap-3 rounded-2xl border border-border bg-white p-5 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-aqua-50 border border-aqua-100">
              <Users className="h-5 w-5 text-aqua-600" />
            </div>
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-aqua-600">
                Total Applicants
              </p>
              <p className="font-display text-3xl font-bold text-foreground">
                {appCount !== undefined ? Number(appCount) : "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Applications table */}
        <div className="rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
          <div className="border-b border-border px-6 py-4">
            <h2 className="font-display text-xl font-bold text-foreground">
              Career Applications
            </h2>
          </div>

          {isLoading || isFetching ? (
            <div
              data-ocid="admin.applications.loading_state"
              className="flex items-center justify-center gap-3 py-20 text-muted-foreground"
            >
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="font-body text-sm">Loading applications...</span>
            </div>
          ) : !applications || applications.length === 0 ? (
            <div
              data-ocid="admin.applications.empty_state"
              className="py-20 text-center"
            >
              <Users className="mx-auto mb-4 h-10 w-10 text-muted-foreground/40" />
              <p className="font-body text-sm text-muted-foreground">
                No applications yet.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="admin.applications.table">
                <TableHeader>
                  <TableRow className="bg-slate-50">
                    <TableHead className="font-body font-semibold text-xs uppercase tracking-wider">
                      #
                    </TableHead>
                    <TableHead className="font-body font-semibold text-xs uppercase tracking-wider">
                      Full Name
                    </TableHead>
                    <TableHead className="font-body font-semibold text-xs uppercase tracking-wider">
                      Phone
                    </TableHead>
                    <TableHead className="font-body font-semibold text-xs uppercase tracking-wider">
                      Email
                    </TableHead>
                    <TableHead className="font-body font-semibold text-xs uppercase tracking-wider">
                      Applied Date
                    </TableHead>
                    <TableHead className="font-body font-semibold text-xs uppercase tracking-wider">
                      Resume
                    </TableHead>
                    <TableHead className="font-body font-semibold text-xs uppercase tracking-wider">
                      Cover Note
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {applications.map((app, index) => (
                    <TableRow
                      key={String(app.id)}
                      data-ocid={`admin.applications.item.${index + 1}`}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <TableCell className="font-body text-sm text-muted-foreground">
                        {index + 1}
                      </TableCell>
                      <TableCell className="font-body text-sm font-medium text-foreground">
                        {app.fullName}
                      </TableCell>
                      <TableCell className="font-body text-sm text-muted-foreground">
                        {app.phone}
                      </TableCell>
                      <TableCell className="font-body text-sm text-muted-foreground">
                        {app.email}
                      </TableCell>
                      <TableCell className="font-body text-sm text-muted-foreground">
                        {formatDate(app.appliedAt)}
                      </TableCell>
                      <TableCell>
                        <ResumeLink fileId={app.resumeFileId} />
                      </TableCell>
                      <TableCell className="max-w-xs">
                        {app.coverNote ? (
                          <p className="font-body text-sm text-muted-foreground line-clamp-2">
                            {app.coverNote}
                          </p>
                        ) : (
                          <span className="font-body text-xs text-muted-foreground/50 italic">
                            None
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
