import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShieldCheck,
  Check,
  ChevronRight,
  Clock,
  AlertCircle,
  Upload,
  FileText,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const coverageItems = [
  "Exchange hack and security breach",
  "Unauthorized wallet access",
  "Smart contract exploit",
  "Private key loss or theft",
  "Phishing attack recovery",
  "Up to $50,000 per incident",
];

const claimCategories = [
  "Exchange hack",
  "Unauthorized access",
  "Smart contract failure",
  "Key loss/theft",
  "Phishing attack",
  "Other",
];

const mockClaims = [
  { id: "CLM-001", category: "Exchange hack", date: "Nov 15, 2025", status: "Under Review", amount: "$4,200" },
  { id: "CLM-002", category: "Smart contract failure", date: "Oct 3, 2025", status: "Approved", amount: "$1,850" },
];

export default function Insurance() {
  const [isActive] = useState(true);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimStep, setClaimStep] = useState(0);
  const [claimCategory, setClaimCategory] = useState("");
  const [claimDate, setClaimDate] = useState("");
  const [claimDescription, setClaimDescription] = useState("");

  const submitClaim = () => {
    setShowClaimModal(false);
    setClaimStep(0);
    setClaimCategory("");
    setClaimDate("");
    setClaimDescription("");
  };

  return (
    <AppShell>
      <div className="p-6 max-w-[1200px] mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground" data-testid="text-insurance-title">Insurance</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage your portfolio protection</p>
          </div>
          <Button
            onClick={() => setShowClaimModal(true)}
            className="bg-primary text-primary-foreground rounded-full gap-2"
            data-testid="button-start-claim"
          >
            Start Claim
          </Button>
        </div>

        <div
          className={`rounded-3xl p-8 border-2 ${
            isActive ? "bg-green-500/5 border-green-500/20" : "bg-card border-border"
          }`}
          data-testid="card-plan-status"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isActive ? "bg-green-500/20" : "bg-muted"}`}>
              <ShieldCheck className={`w-6 h-6 ${isActive ? "text-green-500" : "text-muted-foreground"}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-foreground">Digital Asset Protection</h2>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${isActive ? "bg-green-500/10 text-green-500" : "bg-muted text-muted-foreground"}`}>
                  {isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">$15/month - renewed on Jan 1, 2026</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {coverageItems.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" className="rounded-lg" data-testid="button-manage-billing">
            Manage Billing
          </Button>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden" data-testid="card-claim-history">
          <div className="p-5 border-b border-border">
            <h2 className="text-lg font-bold text-foreground">Claim History</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full" data-testid="table-claims">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Claim ID</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Category</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Amount</th>
                  <th className="text-right text-xs font-medium text-muted-foreground px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {mockClaims.map((claim) => (
                  <tr key={claim.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors" data-testid={`row-claim-${claim.id}`}>
                    <td className="px-5 py-3 text-sm font-medium text-primary">{claim.id}</td>
                    <td className="px-5 py-3 text-sm text-foreground">{claim.category}</td>
                    <td className="px-5 py-3 text-sm text-muted-foreground">{claim.date}</td>
                    <td className="px-5 py-3 text-sm font-medium text-foreground">{claim.amount}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${
                        claim.status === "Approved" ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"
                      }`}>
                        {claim.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={showClaimModal} onOpenChange={setShowClaimModal}>
        <DialogContent className="sm:max-w-lg rounded-3xl p-0 gap-0 bg-card border-border">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold text-foreground">
              {claimStep === 0 && "Start a Claim"}
              {claimStep === 1 && "Claim Details"}
              {claimStep === 2 && "Upload Documents"}
              {claimStep === 3 && "Confirm Claim"}
            </DialogTitle>
          </DialogHeader>

          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              {[0, 1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full ${s <= claimStep ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>

            {claimStep === 0 && (
              <div className="space-y-2" data-testid="claim-step-category">
                <p className="text-sm text-muted-foreground mb-4">What type of incident occurred?</p>
                {claimCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setClaimCategory(cat)}
                    data-testid={`button-claim-category-${cat.toLowerCase().replace(/[\s\/]/g, "-")}`}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      claimCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 text-foreground hover:bg-muted"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {claimStep === 1 && (
              <div className="space-y-4" data-testid="claim-step-details">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Date of incident</Label>
                  <Input
                    type="date"
                    value={claimDate}
                    onChange={(e) => setClaimDate(e.target.value)}
                    className="rounded-xl h-11"
                    data-testid="input-claim-date"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Description</Label>
                  <textarea
                    value={claimDescription}
                    onChange={(e) => setClaimDescription(e.target.value)}
                    placeholder="Describe what happened..."
                    rows={4}
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                    data-testid="input-claim-description"
                  />
                </div>
              </div>
            )}

            {claimStep === 2 && (
              <div data-testid="claim-step-documents">
                <p className="text-sm text-muted-foreground mb-4">Upload any supporting documents (screenshots, transaction hashes, etc.)</p>
                <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground">Drop files here or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, PNG, JPG up to 10MB</p>
                </div>
              </div>
            )}

            {claimStep === 3 && (
              <div data-testid="claim-step-confirm">
                <div className="bg-muted/50 rounded-2xl p-5 space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <span className="text-sm font-medium text-foreground">{claimCategory}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Date</span>
                    <span className="text-sm font-medium text-foreground">{claimDate || "Not specified"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Description</span>
                    <span className="text-sm font-medium text-foreground text-right max-w-[200px] truncate">{claimDescription || "Not provided"}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-primary/5 border border-primary/10 rounded-xl">
                  <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    After submission, your claim will be reviewed within 48 hours. You'll receive a Claim ID for tracking.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-6">
              {claimStep > 0 ? (
                <Button variant="ghost" onClick={() => setClaimStep(claimStep - 1)} className="text-muted-foreground" data-testid="button-claim-back">
                  Back
                </Button>
              ) : (
                <div />
              )}
              {claimStep < 3 ? (
                <Button
                  onClick={() => setClaimStep(claimStep + 1)}
                  disabled={claimStep === 0 && !claimCategory}
                  className="bg-primary text-primary-foreground rounded-full px-6"
                  data-testid="button-claim-next"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={submitClaim}
                  className="bg-primary text-primary-foreground rounded-full px-6"
                  data-testid="button-claim-submit"
                >
                  Submit Claim
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
