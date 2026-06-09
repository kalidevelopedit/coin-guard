import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Play, Pause, Volume2, VolumeX, Quote, ArrowRight, ChevronLeft, ChevronRight, Calculator, ShieldCheck, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  taxTestimonials,
  insuranceTestimonials,
  getFlag,
  type Testimonial,
} from "@/lib/testimonials-data";

type Category = "tax" | "insurance";
type ServiceChoice = "tax" | "insurance" | "both" | null;

const allAvatars = [...taxTestimonials, ...insuranceTestimonials]
  .filter((t) => !t.portraitVideo && !t.landscapeVideo && t.avatar)
  .slice(0, 8)
  .map((t) => ({ avatar: t.avatar, name: t.name }));

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

function VideoPlayer({ testimonial }: { testimonial: Testimonial }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const isWide = useMediaQuery("(min-width: 768px)");
  const videoSrc = (isWide && testimonial.landscapeVideo) ? testimonial.landscapeVideo! : (testimonial.portraitVideo || testimonial.landscapeVideo!);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative group">
      <video
        ref={videoRef}
        key={videoSrc}
        src={videoSrc}
        poster={testimonial.poster}
        preload="auto"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className={`w-full rounded-t-2xl object-cover ${
          testimonial.portraitVideo && !isWide ? "aspect-[9/16] max-h-[60vh]" : "aspect-video"
        }`}
        data-testid={`video-testimonial-${testimonial.id}`}
      />
      <div className="absolute bottom-4 left-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={togglePlay}
          data-testid={`button-play-${testimonial.id}`}
          className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>
        <button
          onClick={toggleMute}
          data-testid={`button-mute-${testimonial.id}`}
          className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const hasVideo = testimonial.portraitVideo || testimonial.landscapeVideo;

  if (hasVideo) {
    return (
      <div className="bg-card border border-border rounded-2xl overflow-hidden" data-testid={`card-testimonial-${testimonial.id}`}>
        <VideoPlayer testimonial={testimonial} />
        <div className="p-5">
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            "{testimonial.quote}"
          </p>
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-sm leading-none">{getFlag(testimonial.countryCode)}</span>
                <span className="text-xs text-muted-foreground">{testimonial.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-5 flex flex-col justify-between" data-testid={`card-testimonial-${testimonial.id}`}>
      <div>
        <Quote className="w-5 h-5 text-primary/40 mb-3" />
        <p className="text-sm text-muted-foreground leading-relaxed">
          "{testimonial.quote}"
        </p>
      </div>
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-9 h-9 rounded-full object-cover"
          loading="lazy"
        />
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-sm leading-none">{getFlag(testimonial.countryCode)}</span>
            <span className="text-xs text-muted-foreground">{testimonial.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceSelector({ onSelect }: { onSelect: (choice: ServiceChoice) => void }) {
  const [selected, setSelected] = useState<ServiceChoice>(null);
  const [, setLocation] = useLocation();

  const handleContinue = () => {
    if (selected) {
      setLocation(`/apply?service=${selected}`);
    }
  };

  const options = [
    {
      value: "tax" as const,
      label: "Tax Reporting",
      desc: "Crypto tax calculations and filing",
      icon: Calculator,
    },
    {
      value: "insurance" as const,
      label: "Insurance",
      desc: "Digital asset protection coverage",
      icon: ShieldCheck,
    },
    {
      value: "both" as const,
      label: "Both",
      desc: "Tax reporting and insurance together",
      icon: Layers,
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-card border border-border rounded-2xl p-6 max-w-md mx-auto">
        <h3 className="text-lg font-bold text-foreground text-center mb-1">
          What are you looking for?
        </h3>
        <p className="text-sm text-muted-foreground text-center mb-5">
          Select a service to get started
        </p>
        <div className="space-y-2.5">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              data-testid={`button-service-${opt.value}`}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center gap-3.5 ${
                selected === opt.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30 bg-card"
              }`}
            >
              <opt.icon className={`w-5 h-5 shrink-0 ${selected === opt.value ? "text-primary" : "text-muted-foreground"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                <p className="text-xs text-muted-foreground">{opt.desc}</p>
              </div>
              <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                selected === opt.value ? "border-primary bg-primary" : "border-muted-foreground/30"
              }`}>
                {selected === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </button>
          ))}
        </div>
        <Button
          onClick={handleContinue}
          disabled={!selected}
          className="w-full mt-5 bg-primary text-primary-foreground rounded-full h-11 font-semibold group"
          data-testid="button-continue-to-apply"
        >
          Continue
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
}

export default function TestimonialsPage() {
  const [activeTab, setActiveTab] = useState<Category>("tax");
  const [showServiceSelector, setShowServiceSelector] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);

  const testimonials = activeTab === "tax" ? taxTestimonials : insuranceTestimonials;
  const videoTestimonials = testimonials.filter((t) => t.portraitVideo || t.landscapeVideo);
  const textTestimonials = testimonials.filter((t) => !t.portraitVideo && !t.landscapeVideo);

  const clampedVideoIndex = videoTestimonials.length > 0 ? Math.min(videoIndex, videoTestimonials.length - 1) : 0;

  useEffect(() => {
    setVideoIndex(0);
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-5" data-testid="avatar-cluster-title">
              <div className="flex -space-x-2.5">
                {allAvatars.map((a, i) => (
                  <img
                    key={i}
                    src={a.avatar}
                    alt={a.name}
                    className="w-9 h-9 rounded-full border-2 border-background object-cover"
                    loading="lazy"
                    style={{ zIndex: allAvatars.length - i }}
                  />
                ))}
                <div className="w-9 h-9 rounded-full border-2 border-background bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary" style={{ zIndex: 0 }}>
                  +{taxTestimonials.length + insuranceTestimonials.length - allAvatars.length}
                </div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight" data-testid="text-testimonials-title">
              What our clients say
            </h1>
            <p className="text-base text-muted-foreground mt-4 max-w-xl mx-auto">
              Real reviews from investors who trust CoinGuard with their crypto taxes and portfolio protection.
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-10">
            <button
              onClick={() => setActiveTab("tax")}
              data-testid="button-tab-tax"
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === "tax"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              Tax Reporting
            </button>
            <button
              onClick={() => setActiveTab("insurance")}
              data-testid="button-tab-insurance"
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === "insurance"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              Insurance
            </button>
          </div>

          <div className="space-y-8 animate-in fade-in duration-300" key={activeTab}>
            {videoTestimonials.length > 0 && (
              <div className="max-w-3xl mx-auto">
                <div className="relative">
                  <div key={videoTestimonials[clampedVideoIndex]?.id} className="animate-in fade-in duration-300">
                    <TestimonialCard testimonial={videoTestimonials[clampedVideoIndex]} />
                  </div>

                  {videoTestimonials.length > 1 && (
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <button
                        onClick={() => setVideoIndex((prev) => (prev - 1 + videoTestimonials.length) % videoTestimonials.length)}
                        className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                        data-testid="button-video-prev"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="flex items-center gap-2">
                        {videoTestimonials.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setVideoIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all ${i === clampedVideoIndex ? "bg-primary w-6" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`}
                            data-testid={`button-video-dot-${i}`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => setVideoIndex((prev) => (prev + 1) % videoTestimonials.length)}
                        className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
                        data-testid="button-video-next"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}

                  {!showServiceSelector && (
                    <div className="mt-4 flex justify-center">
                      <Button
                        onClick={() => setShowServiceSelector(true)}
                        className="bg-primary text-primary-foreground rounded-full h-11 px-8 font-semibold group"
                        data-testid="button-get-started-testimonials"
                      >
                        Get started
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {showServiceSelector && (
              <ServiceSelector onSelect={() => {}} />
            )}

            {textTestimonials.length > 0 && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {textTestimonials.map((t) => (
                  <TestimonialCard key={t.id} testimonial={t} />
                ))}
              </div>
            )}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              {testimonials.length} reviews from verified CoinGuard clients
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
