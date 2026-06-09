import { useState, useRef, useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { Play, Pause, Volume2, VolumeX, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import {
  taxTestimonials,
  insuranceTestimonials,
  getFlag,
  type Testimonial,
} from "@/lib/testimonials-data";

type Category = "tax" | "insurance";

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

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState<Category>("tax");
  const [videoIndex, setVideoIndex] = useState(0);

  const testimonials = activeTab === "tax" ? taxTestimonials : insuranceTestimonials;
  const videoTestimonials = testimonials.filter((t) => t.portraitVideo || t.landscapeVideo);
  const textTestimonials = testimonials.filter((t) => !t.portraitVideo && !t.landscapeVideo);

  const clampedVideoIndex = videoTestimonials.length > 0 ? Math.min(videoIndex, videoTestimonials.length - 1) : 0;

  useEffect(() => {
    setVideoIndex(0);
  }, [activeTab]);

  return (
    <AppShell>
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto" data-testid="page-testimonials">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight" data-testid="text-testimonials-title">
            Testimonials
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Hear from investors who trust CoinGuard with their crypto taxes and portfolio protection.
          </p>
        </div>

        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("tax")}
            data-testid="button-tab-tax"
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
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
            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
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
            </div>
          )}

          {textTestimonials.length > 0 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {textTestimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            {testimonials.length} reviews from verified CoinGuard clients
          </p>
        </div>
      </div>
    </AppShell>
  );
}
