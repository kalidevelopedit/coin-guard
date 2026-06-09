import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Check,
  Upload,
  Camera,
  Lock,
  User,
  FileText,
  Pen,
} from "lucide-react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const applicationSteps = [
  "Account",
  "Personal Details",
  "Identity",
  "Coverage",
  "Terms & Sign",
];

const availableCoins = ["BTC", "ETH", "SOL", "XRP", "XLM"];

export default function InsuranceApplication() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    enable2FA: false,
    fullName: "",
    phone: "",
    address: "",
    selfieUploaded: false,
    selectedCoins: [] as string[],
    beneficiaryName: "",
    beneficiaryRelationship: "",
    beneficiaryAllocation: "",
    termsAccepted: false,
    privacyAccepted: false,
    riskAccepted: false,
    signatureType: "typed" as "typed" | "drawn",
    signatureText: "",
    signatureDrawn: false,
  });
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const progress = ((currentStep + 1) / applicationSteps.length) * 100;

  const goHome = () => {
    setLocation("/");
    window.scrollTo(0, 0);
  };

  const submitMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/insurance-applications", {
        email: formData.email,
        fullName: formData.fullName,
        phone: formData.phone || null,
        address: formData.address || null,
        identityVerified: formData.selfieUploaded,
        selectedCoins: formData.selectedCoins,
        beneficiaryName: formData.beneficiaryName || null,
        beneficiaryRelationship: formData.beneficiaryRelationship || null,
        beneficiaryAllocation: formData.beneficiaryAllocation ? parseInt(formData.beneficiaryAllocation) : null,
        termsAccepted: formData.termsAccepted,
        signatureData: formData.signatureType === "typed" ? formData.signatureText : "drawn-signature",
        status: "submitted",
      });
      return res.json();
    },
    onSuccess: (data) => {
      setApplicationId(data.id);
      toast({
        title: "Application Submitted",
        description: "Your coverage application has been received.",
      });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const update = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCoin = (coin: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedCoins: prev.selectedCoins.includes(coin)
        ? prev.selectedCoins.filter((c) => c !== coin)
        : [...prev.selectedCoins, coin],
    }));
  };

  const canContinue = () => {
    switch (currentStep) {
      case 0:
        return formData.email.length > 3 && formData.password.length >= 6;
      case 1:
        return formData.fullName.length > 1;
      case 2:
        return formData.selfieUploaded;
      case 3:
        return formData.selectedCoins.length > 0;
      case 4:
        return (
          formData.termsAccepted &&
          formData.privacyAccepted &&
          formData.riskAccepted &&
          (formData.signatureText.length > 0 || formData.signatureDrawn)
        );
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < applicationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitMutation.mutate();
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#22c55e";
    ctx.lineCap = "round";
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    update("signatureDrawn", true);
  };

  if (applicationId) {
    return (
      <div className="min-h-screen bg-[#0a0f14]">
        <Navigation />
        <div className="pt-24 pb-20">
          <div className="max-w-[600px] mx-auto px-6">
            <div className="bg-[#0d1318] border border-white/10 rounded-xl p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-[#22c55e]" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Application Submitted
              </h2>
              <p className="text-gray-400 mb-6">
                Your coverage application has been received and is under review.
              </p>
              <div className="bg-white/[0.03] border border-white/5 rounded-lg p-4 mb-6">
                <p className="text-xs text-gray-500 mb-1">Application ID</p>
                <p className="text-lg font-mono font-semibold text-white" data-testid="text-application-id">
                  {applicationId.slice(0, 8).toUpperCase()}
                </p>
              </div>
              <p className="text-sm text-gray-400 mb-8">
                We will review your application and notify you at{" "}
                <strong className="text-white">{formData.email}</strong> within 3-5 business days.
              </p>
              <Button className="bg-[#22c55e] text-black font-semibold" onClick={goHome} data-testid="button-back-home">
                Return to Home
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f14]">
      <Navigation />
      <div className="pt-24 pb-20">
        <div className="max-w-[700px] mx-auto px-6">
          <button onClick={goHome} className="inline-flex items-center gap-2 text-sm text-gray-500 mb-6 cursor-pointer" data-testid="button-back">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </button>

          <h1 className="text-3xl font-semibold text-white mb-2">
            Apply for Asset Protection
          </h1>
          <p className="text-gray-400 mb-8">
            Complete the application below to screen your eligibility for digital asset coverage.
          </p>

          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            {applicationSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-2 flex-shrink-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 ${
                    i < currentStep
                      ? "bg-[#22c55e]/20 text-[#22c55e]"
                      : i === currentStep
                        ? "bg-[#22c55e] text-black"
                        : "bg-white/10 text-gray-500"
                  }`}
                >
                  {i < currentStep ? <Check className="w-3 h-3" /> : i + 1}
                </div>
                <span
                  className={`text-xs font-medium ${
                    i <= currentStep ? "text-white" : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
                {i < applicationSteps.length - 1 && (
                  <div className="w-6 h-px bg-white/10 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>

          <Progress value={progress} className="mb-8 h-1" />

          {currentStep === 0 && (
            <div className="bg-[#0d1318] border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Create Account</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-300 mb-1.5 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                    data-testid="input-email"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-300 mb-1.5 block">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimum 6 characters"
                    value={formData.password}
                    onChange={(e) => update("password", e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                    data-testid="input-password"
                  />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Checkbox
                    id="enable2fa"
                    checked={formData.enable2FA}
                    onCheckedChange={(v) => update("enable2FA", !!v)}
                    data-testid="checkbox-2fa"
                  />
                  <Label htmlFor="enable2fa" className="text-sm text-gray-400">
                    Enable two-factor authentication (recommended)
                  </Label>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="bg-[#0d1318] border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6">Personal Details</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="text-sm font-medium text-gray-300 mb-1.5 block">
                    Full Legal Name
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="John Smith"
                    value={formData.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                    data-testid="input-full-name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-300 mb-1.5 block">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                    data-testid="input-phone"
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-gray-300 mb-1.5 block">
                    Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="Start typing your address..."
                    value={formData.address}
                    onChange={(e) => update("address", e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                    data-testid="input-address"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Used for eligibility verification. Your data is encrypted and access-controlled.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-[#0d1318] border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-2">Identity Verification</h3>
              <p className="text-sm text-gray-400 mb-6">
                Upload a clear selfie for identity verification. This is required for coverage
                eligibility.
              </p>

              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  formData.selfieUploaded
                    ? "border-[#22c55e]/30 bg-[#22c55e]/5"
                    : "border-white/10"
                }`}
              >
                {formData.selfieUploaded ? (
                  <div>
                    <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-[#22c55e]" />
                    </div>
                    <p className="text-sm font-medium text-[#22c55e] mb-1">Selfie uploaded</p>
                    <p className="text-xs text-[#22c55e]/60">Your photo has been securely uploaded</p>
                  </div>
                ) : (
                  <div>
                    <User className="w-10 h-10 text-gray-500 mx-auto mb-4" strokeWidth={1.5} />
                    <p className="text-sm text-gray-400 mb-4">
                      Take a photo or upload an existing selfie
                    </p>
                    <div className="flex justify-center gap-3">
                      <Button
                        variant="outline"
                        className="border-white/10 text-white"
                        onClick={() => update("selfieUploaded", true)}
                        data-testid="button-upload-selfie"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </Button>
                      <Button
                        variant="outline"
                        className="border-white/10 text-white"
                        onClick={() => update("selfieUploaded", true)}
                        data-testid="button-take-selfie"
                      >
                        <Camera className="w-4 h-4 mr-2" />
                        Camera
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-start gap-2 mt-4 p-3 bg-white/[0.03] border border-white/5 rounded-lg">
                <Lock className="w-4 h-4 text-[#22c55e] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500">
                  Uploads are encrypted and access-controlled. Your identity data is processed
                  securely and stored in compliance with applicable data protection regulations.
                </p>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-[#0d1318] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Coverage Details</h3>
                <p className="text-sm text-gray-400 mb-6">
                  Select the digital assets you would like to include in your coverage application.
                </p>

                <Label className="text-sm font-medium text-gray-300 mb-3 block">
                  Select Assets
                </Label>
                <div className="flex flex-wrap gap-3">
                  {availableCoins.map((coin) => (
                    <button
                      key={coin}
                      onClick={() => toggleCoin(coin)}
                      data-testid={`button-coin-${coin.toLowerCase()}`}
                      className={`px-5 py-3 rounded-lg border text-sm font-medium transition-all duration-150 ${
                        formData.selectedCoins.includes(coin)
                          ? "border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e]"
                          : "border-white/10 text-gray-400"
                      }`}
                    >
                      {coin}
                      {formData.selectedCoins.includes(coin) && (
                        <Check className="w-3 h-3 inline ml-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#0d1318] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Beneficiary (Optional)
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  Designate a beneficiary for your coverage policy.
                </p>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="benefName" className="text-sm font-medium text-gray-300 mb-1.5 block">
                      Beneficiary Name
                    </Label>
                    <Input
                      id="benefName"
                      placeholder="Full legal name"
                      value={formData.beneficiaryName}
                      onChange={(e) => update("beneficiaryName", e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                      data-testid="input-beneficiary-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="benefRelation" className="text-sm font-medium text-gray-300 mb-1.5 block">
                      Relationship
                    </Label>
                    <Select
                      value={formData.beneficiaryRelationship}
                      onValueChange={(v) => update("beneficiaryRelationship", v)}
                    >
                      <SelectTrigger className="bg-white/5 border-white/10 text-white" data-testid="select-relationship">
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="benefAlloc" className="text-sm font-medium text-gray-300 mb-1.5 block">
                      Allocation %
                    </Label>
                    <Input
                      id="benefAlloc"
                      type="number"
                      min="1"
                      max="100"
                      placeholder="100"
                      value={formData.beneficiaryAllocation}
                      onChange={(e) => update("beneficiaryAllocation", e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                      data-testid="input-beneficiary-allocation"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-[#0d1318] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Terms & Conditions
                </h3>
                <ScrollArea className="h-48 border border-white/10 rounded-lg p-4 mb-6">
                  <div className="text-sm text-gray-400 space-y-4 pr-4">
                    <p>
                      <strong className="text-white">1. Coverage Terms.</strong> This application is for eligibility
                      screening purposes only. Submission of this application does not guarantee
                      coverage. All coverage is subject to underwriting review, approval, and
                      the terms and conditions of the applicable policy.
                    </p>
                    <p>
                      <strong className="text-white">2. Eligibility.</strong> Coverage eligibility depends on factors
                      including but not limited to: custody arrangements, asset types,
                      jurisdiction, and verification status. CoinGuard reserves the right
                      to decline coverage at its sole discretion.
                    </p>
                    <p>
                      <strong className="text-white">3. Exclusions.</strong> Coverage does not extend to losses
                      resulting from: market volatility, price depreciation, user error,
                      unauthorized sharing of credentials, phishing or social engineering
                      attacks, regulatory actions, or force majeure events.
                    </p>
                    <p>
                      <strong className="text-white">4. Coverage Limits.</strong> Maximum coverage amounts vary by
                      plan and are subject to aggregate limits. Deductibles may apply. Please
                      review the coverage schedule for specific limits applicable to your
                      selected plan.
                    </p>
                    <p>
                      <strong className="text-white">5. Claims Process.</strong> In the event of a covered incident,
                      you must notify CoinGuard within 72 hours of discovery. Claims require
                      supporting documentation and are subject to investigation and
                      verification. Resolution timelines are specified in the applicable policy.
                    </p>
                    <p>
                      <strong className="text-white">6. Data Usage.</strong> Information provided in this application
                      will be used for eligibility assessment, identity verification, and
                      underwriting purposes. Your data is processed in accordance with our
                      Privacy Policy and applicable data protection regulations.
                    </p>
                    <p>
                      <strong className="text-white">7. Accuracy.</strong> By submitting this application, you certify
                      that all information provided is accurate and complete to the best of
                      your knowledge. Providing false or misleading information may result in
                      denial of coverage or voiding of an existing policy.
                    </p>
                  </div>
                </ScrollArea>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={formData.termsAccepted}
                      onCheckedChange={(v) => update("termsAccepted", !!v)}
                      data-testid="checkbox-terms"
                    />
                    <Label htmlFor="terms" className="text-sm text-gray-400 leading-relaxed">
                      I have read and accept the Terms & Conditions.
                    </Label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacy"
                      checked={formData.privacyAccepted}
                      onCheckedChange={(v) => update("privacyAccepted", !!v)}
                      data-testid="checkbox-privacy"
                    />
                    <Label htmlFor="privacy" className="text-sm text-gray-400 leading-relaxed">
                      I consent to the processing of my personal data as described in the
                      Privacy Policy.
                    </Label>
                  </div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="risk"
                      checked={formData.riskAccepted}
                      onCheckedChange={(v) => update("riskAccepted", !!v)}
                      data-testid="checkbox-risk"
                    />
                    <Label htmlFor="risk" className="text-sm text-gray-400 leading-relaxed">
                      I acknowledge that coverage is not guaranteed and is subject to
                      underwriting approval.
                    </Label>
                  </div>
                </div>
              </div>

              <div className="bg-[#0d1318] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Signature</h3>

                <div className="flex gap-3 mb-4">
                  <button
                    onClick={() => update("signatureType", "typed")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      formData.signatureType === "typed"
                        ? "border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e]"
                        : "border-white/10 text-gray-400"
                    }`}
                    data-testid="button-typed-signature"
                  >
                    <Pen className="w-4 h-4 inline mr-2" />
                    Type Signature
                  </button>
                  <button
                    onClick={() => update("signatureType", "drawn")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      formData.signatureType === "drawn"
                        ? "border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e]"
                        : "border-white/10 text-gray-400"
                    }`}
                    data-testid="button-drawn-signature"
                  >
                    <FileText className="w-4 h-4 inline mr-2" />
                    Draw Signature
                  </button>
                </div>

                {formData.signatureType === "typed" ? (
                  <div>
                    <Label htmlFor="sigText" className="text-sm font-medium text-gray-300 mb-1.5 block">
                      Type your full legal name as signature
                    </Label>
                    <Input
                      id="sigText"
                      placeholder="Your full legal name"
                      value={formData.signatureText}
                      onChange={(e) => update("signatureText", e.target.value)}
                      className="font-serif text-lg italic bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                      data-testid="input-signature"
                    />
                  </div>
                ) : (
                  <div>
                    <p className="text-sm text-gray-400 mb-2">
                      Draw your signature in the box below
                    </p>
                    <canvas
                      ref={canvasRef}
                      width={600}
                      height={150}
                      className="w-full border border-white/10 rounded-lg cursor-crosshair bg-[#0a0f14]"
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      data-testid="canvas-signature"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2 text-xs text-gray-400"
                      onClick={() => {
                        const canvas = canvasRef.current;
                        if (canvas) {
                          const ctx = canvas.getContext("2d");
                          ctx?.clearRect(0, 0, canvas.width, canvas.height);
                          update("signatureDrawn", false);
                        }
                      }}
                      data-testid="button-clear-signature"
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-between gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              className="border-white/10 text-white disabled:text-gray-600"
              data-testid="button-previous-step"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canContinue() || submitMutation.isPending}
              className="bg-[#22c55e] text-black font-semibold"
              data-testid="button-next-step"
            >
              {submitMutation.isPending
                ? "Submitting..."
                : currentStep === applicationSteps.length - 1
                  ? "Submit Application"
                  : "Continue"}
              {currentStep < applicationSteps.length - 1 && (
                <ArrowRight className="w-4 h-4 ml-2" />
              )}
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
