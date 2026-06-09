import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import {
  Check,
  Download,
  Calendar,
  FileText,
  Clock,
  ChevronRight,
  AlertCircle,
} from "lucide-react";

const filingSteps = [
  { title: "Connect data sources", completed: true, date: "Dec 10, 2025" },
  { title: "Review transactions", completed: true, date: "Dec 12, 2025" },
  { title: "Generate tax report", completed: true, date: "Dec 15, 2025" },
  { title: "Download reports", completed: false, date: null },
  { title: "Book consultation (optional)", completed: false, date: null },
];

export default function Filing() {
  return (
    <AppShell>
      <div className="p-6 max-w-[1200px] mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground" data-testid="text-filing-title">Filing</h1>
          <p className="text-sm text-muted-foreground mt-1">Track your filing progress and download reports</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6" data-testid="card-filing-checklist">
            <h2 className="text-lg font-bold text-foreground mb-6">Filing Checklist</h2>
            <div className="space-y-4">
              {filingSteps.map((step, i) => (
                <div key={i} className="flex items-start gap-3" data-testid={`filing-step-${i}`}>
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      step.completed ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.completed ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <span className="text-[10px] font-bold">{i + 1}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${
                        step.completed ? "text-foreground line-through opacity-60" : "text-foreground"
                      }`}
                    >
                      {step.title}
                    </p>
                    {step.date && (
                      <p className="text-xs text-muted-foreground mt-0.5">Completed {step.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6" data-testid="card-report-info">
              <h2 className="text-lg font-bold text-foreground mb-4">Report Details</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Generated on</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">Dec 15, 2025</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Report version</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">v1.0</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Data sources</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">3 connected</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6" data-testid="card-downloads">
              <h2 className="text-lg font-bold text-foreground mb-4">Downloads</h2>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-between h-12 rounded-xl" data-testid="button-download-8949">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Form 8949 (PDF)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>
                <Button variant="outline" className="w-full justify-between h-12 rounded-xl" data-testid="button-download-schedule-d">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Schedule D (PDF)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>
                <Button variant="outline" className="w-full justify-between h-12 rounded-xl" data-testid="button-download-full-csv">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Full Report (CSV)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-muted/30 border border-border rounded-2xl p-5 flex items-start gap-3" data-testid="card-audit-trail">
          <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Audit Trail</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              All report generations are timestamped and versioned. Your data sources and calculation methods are recorded for compliance purposes.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
