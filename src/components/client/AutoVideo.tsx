"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Volume2 } from "lucide-react";
import type { Video } from "@/config/clinic";

/**
 * Vídeo vertical da clínica. Sem som, roda em loop só enquanto está visível
 * (nada é baixado antes disso). Com `hasAudio`, oferece "Assistir com som",
 * que reinicia o vídeo com controles e mostra o quadro inteiro.
 * Com movimento reduzido, não há reprodução automática.
 */
export function AutoVideo({ video, className = "" }: { video: Video; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const withSoundRef = useRef(false);
  const [withSound, setWithSound] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) el.pause();
        else if (!withSoundRef.current) el.play().catch(() => {});
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const playWithSound = () => {
    const el = ref.current;
    if (!el) return;
    withSoundRef.current = true;
    setWithSound(true);
    el.muted = false;
    el.loop = false;
    el.controls = true;
    el.currentTime = 0;
    el.play().catch(() => {});
  };

  return (
    <div className={`relative overflow-hidden bg-forest-deep ${className}`}>
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={video.poster}
        aria-label={video.title}
        className={`absolute inset-0 size-full ${withSound ? "object-contain" : "object-cover"}`}
      >
        <source src={video.src} type="video/mp4" />
      </video>

      {!withSound && (video.hasAudio ? (
        <button
          type="button"
          onClick={playWithSound}
          className="absolute bottom-4 left-4 inline-flex h-11 items-center gap-2.5 rounded-full bg-paper/90 px-4 text-sm font-semibold text-forest shadow-lg backdrop-blur-sm transition-colors hover:bg-paper"
        >
          <Volume2 className="size-4" aria-hidden="true" />
          Assistir com som
        </button>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.play().catch(() => {})}
          className="absolute bottom-4 left-4 grid size-11 place-items-center rounded-full bg-paper/90 text-forest shadow-lg backdrop-blur-sm motion-safe:hidden"
        >
          <Play className="size-4" aria-hidden="true" />
          <span className="sr-only">Reproduzir vídeo</span>
        </button>
      ))}
    </div>
  );
}
