import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send, Check, Globe, ArrowRight, Loader2, Linkedin } from "lucide-react";
import { SiWhatsapp, SiFacebook } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const reachChannels = [
  {
    icon: SiWhatsapp,
    title: "WhatsApp",
    description: "Message us on WhatsApp for instant support",
    href: "https://wa.me/18001234567",
    linkLabel: "Open WhatsApp",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    description: "Follow us and connect on LinkedIn",
    href: "#",
    linkLabel: "Visit LinkedIn",
  },
  {
    icon: SiFacebook,
    title: "Facebook",
    description: "Visit our Facebook page",
    href: "#",
    linkLabel: "Visit Facebook",
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [subject, setSubject] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", {
        name: `${firstName} ${lastName}`.trim(),
        email,
        type: subject,
        message,
      });
      trackEvent("contact_submit", { type: subject });
      setSubmitted(true);
      toast({
        title: "Message sent",
        description: "We have received your message and will respond shortly.",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again later or reach out via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-contact">
      <Navigation />
      <div className="pt-16">
        <section className="py-24 px-6 text-center" data-testid="section-contact-hero">
          <div className="max-w-[800px] mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-6">
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-wide text-primary">Contact Us</span>
            </div>
            <h1 className="text-[36px] md:text-[48px] font-bold text-foreground tracking-tight mb-6 leading-tight">
              We are here to help
            </h1>
            <p className="text-[17px] text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Whether you have questions about our platform, need support with your account,
              or want to explore a partnership, our team is ready to assist you.
            </p>
          </div>
        </section>

        <section className="pb-20 px-6" data-testid="section-reach-channels">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-xl font-bold text-foreground text-center mb-2">Reach out to us</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">
              Connect with us through your preferred channel
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {reachChannels.map((channel, i) => (
                <a
                  key={i}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  data-testid={`card-reach-channel-${channel.title.toLowerCase()}`}
                >
                  <Card className="p-6 h-full hover-elevate transition-colors">
                    <channel.icon className="w-6 h-6 text-primary mb-4" />
                    <h3 className="text-sm font-semibold text-foreground mb-2">{channel.title}</h3>
                    <p className="text-xs text-muted-foreground mb-4">{channel.description}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                      {channel.linkLabel}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-muted/30" data-testid="section-contact-form-area">
          <div className="max-w-[640px] mx-auto">
            <Card className="p-8">
              <h2 className="text-xl font-bold text-foreground mb-2">Send us a message</h2>
              <p className="text-sm text-muted-foreground mb-8">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>

              {submitted ? (
                <div className="text-center py-12 animate-in fade-in zoom-in-95 duration-500" data-testid="contact-success">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Message received</h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you for contacting us. Our team will review your message and respond shortly.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6 rounded-full"
                    onClick={resetForm}
                    data-testid="button-send-another"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        data-testid="input-first-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        required
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        data-testid="input-last-name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      data-testid="input-email"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={subject} onValueChange={setSubject}>
                      <SelectTrigger data-testid="select-subject">
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tax">I want to use CoinGuard for tax reporting</SelectItem>
                        <SelectItem value="insurance">I want to use CoinGuard for insurance</SelectItem>
                        <SelectItem value="both">I want both tax reporting and insurance</SelectItem>
                        <SelectItem value="questions">I have questions about CoinGuard</SelectItem>
                        <SelectItem value="billing">Billing inquiry</SelectItem>
                        <SelectItem value="technical">Technical support</SelectItem>
                        <SelectItem value="enterprise">Enterprise or business inquiry</SelectItem>
                        <SelectItem value="partnership">Partnership opportunity</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us how we can help..."
                      rows={5}
                      required
                      className="resize-none"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      data-testid="input-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full bg-primary text-primary-foreground font-semibold rounded-full text-[15px] group"
                    data-testid="button-submit-contact"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
