"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  HOMEPAGE_VIDEO_DURATION,
  homepageScenes,
} from "@/data/homepage-scenes";
import { homepageSequence } from "@/data/homepage-sequence";
import { Container } from "@/components/ui/Container";
import styles from "./HomepageVideoStage.module.css";

type SequenceManifest = {
  files: string[];
  generatedAt: string;
  height: number;
  publicDirectory: string;
  totalFrames: number;
  width: number;
};

type LoadedManifest = SequenceManifest & {
  images: HTMLImageElement[];
};

type Phase = "loading" | "autoplay" | "scroll";

const AUTOPLAY_REAL_DURATION = 3;
const AUTOPLAY_STOP_TIME = 6.5;
const SCROLL_KICKOFF_PX = 4;
const POSTER_FRAME = "frame-0001.jpg";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function drawFrame(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  baseWidth: number,
  baseHeight: number,
) {
  const context = canvas.getContext("2d");
  if (!context) return;

  const dpr = window.devicePixelRatio || 1;
  const cssWidth = canvas.clientWidth;
  const cssHeight = canvas.clientHeight;
  const targetWidth = Math.round(cssWidth * dpr);
  const targetHeight = Math.round(cssHeight * dpr);

  if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
    canvas.width = targetWidth;
    canvas.height = targetHeight;
  }

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, targetWidth, targetHeight);
  context.scale(dpr, dpr);

  const scale = Math.max(cssWidth / baseWidth, cssHeight / baseHeight);
  const drawWidth = baseWidth * scale;
  const drawHeight = baseHeight * scale;
  const offsetX = (cssWidth - drawWidth) / 2;
  const offsetY = (cssHeight - drawHeight) / 2;

  context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);
}

async function loadSequence(signal: AbortSignal): Promise<LoadedManifest> {
  const url = `${homepageSequence.publicDirectory}/manifest.json?ts=${Date.now()}`;
  const response = await fetch(url, { cache: "no-store", signal });
  if (!response.ok) {
    throw new Error(`Failed to load manifest: ${response.status}`);
  }
  const manifest = (await response.json()) as SequenceManifest;
  const revision = encodeURIComponent(manifest.generatedAt);

  const images: HTMLImageElement[] = new Array(manifest.totalFrames);

  const loadFrame = (index: number) =>
    new Promise<void>((resolve, reject) => {
      if (signal.aborted) {
        reject(new DOMException("aborted", "AbortError"));
        return;
      }
      const image = new Image();
      image.decoding = "async";
      image.src = `${manifest.publicDirectory}/${manifest.files[index]}?v=${revision}`;
      image.onload = () => {
        images[index] = image;
        resolve();
      };
      image.onerror = () =>
        reject(new Error(`Failed to load frame: ${manifest.files[index]}`));
    });

  const heroLastFrame = Math.ceil(
    (manifest.totalFrames - 1) * (AUTOPLAY_STOP_TIME / HOMEPAGE_VIDEO_DURATION),
  );
  const priorityCount = Math.min(heroLastFrame + 8, manifest.totalFrames);

  await Promise.all(
    Array.from({ length: priorityCount }, (_, index) => loadFrame(index)),
  );

  if (priorityCount < manifest.totalFrames) {
    void Promise.all(
      Array.from({ length: manifest.totalFrames - priorityCount }, (_, offset) =>
        loadFrame(priorityCount + offset).catch(() => {}),
      ),
    );
  }

  return { ...manifest, images };
}

function HeroBlock({
  title,
  tagline,
  introCompletedRef,
  onScrollHint,
}: {
  title: string;
  tagline?: string;
  introCompletedRef: React.RefObject<boolean>;
  onScrollHint: () => void;
}) {
  const [variantClass] = useState(() =>
    introCompletedRef.current
      ? styles.heroBlockReturn
      : styles.heroBlockFirst,
  );

  return (
    <div className={`${styles.heroBlock} ${variantClass}`}>
      <h1 className={styles.heroTitle}>{title}</h1>
      {tagline ? <p className={styles.heroTagline}>{tagline}</p> : null}
      <button
        type="button"
        className={styles.scrollCue}
        onClick={onScrollHint}
        aria-label="Перейти к разделу о бренде"
      >
        <svg
          viewBox="0 0 40 22"
          width="40"
          height="22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="3,4 20,18 37,4" />
        </svg>
      </button>
    </div>
  );
}

export function HomepageVideoStage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const manifestRef = useRef<LoadedManifest | null>(null);
  const activeFrameRef = useRef(-1);
  const phaseRef = useRef<Phase>("loading");
  const autoplayStartRef = useRef<number | null>(null);
  const autoplayRafRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const activeSceneIdRef = useRef<string>(homepageScenes[0]?.id ?? "");

  const [phase, setPhase] = useState<Phase>("loading");
  const [activeSceneId, setActiveSceneId] = useState<string>(
    homepageScenes[0]?.id ?? "",
  );
  const [overlayActive, setOverlayActive] = useState(true);
  const overlayActiveRef = useRef(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const introCompletedRef = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      introCompletedRef.current = true;
    }, 3700);
    return () => window.clearTimeout(timer);
  }, []);

  const scrollToBrand = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const brand = homepageScenes.find((scene) => scene.id === "brand");
    if (!brand) return;

    const totalScrollable = Math.max(
      section.offsetHeight - window.innerHeight,
      1,
    );
    const progress =
      (brand.start - AUTOPLAY_STOP_TIME) /
      (HOMEPAGE_VIDEO_DURATION - AUTOPLAY_STOP_TIME);
    const sectionTopFromDoc =
      section.getBoundingClientRect().top + window.scrollY;
    const target =
      sectionTopFromDoc + clamp(progress, 0, 1) * totalScrollable;

    window.scrollTo({ top: target, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(mediaQuery.matches);
    apply();
    mediaQuery.addEventListener("change", apply);
    return () => mediaQuery.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const controller = new AbortController();
    let cancelled = false;

    void loadSequence(controller.signal)
      .then((loaded) => {
        if (cancelled) return;
        manifestRef.current = loaded;

        const initialPhase: Phase =
          window.scrollY > SCROLL_KICKOFF_PX ? "scroll" : "autoplay";
        phaseRef.current = initialPhase;
        setPhase(initialPhase);
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("[homepage-stage] sequence load failed", error);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [reducedMotion]);

  function applyOriginalTime(t: number) {
    const manifest = manifestRef.current;
    const canvas = canvasRef.current;
    if (!manifest || !canvas) return;

    const lastIndex = manifest.totalFrames - 1;
    const frameIndex = clamp(
      Math.round((t / HOMEPAGE_VIDEO_DURATION) * lastIndex),
      0,
      lastIndex,
    );

    if (frameIndex !== activeFrameRef.current) {
      const image = manifest.images[frameIndex];
      if (image) {
        drawFrame(canvas, image, manifest.width, manifest.height);
        activeFrameRef.current = frameIndex;
      }
    }

    const matchedScene = homepageScenes.find((scene, index) => {
      const isLast = index === homepageScenes.length - 1;
      const inRange = t >= scene.start && t < scene.end;
      return inRange || (isLast && t >= scene.start);
    });

    const nextActive = matchedScene !== undefined;
    if (nextActive !== overlayActiveRef.current) {
      overlayActiveRef.current = nextActive;
      setOverlayActive(nextActive);
    }

    if (matchedScene && matchedScene.id !== activeSceneIdRef.current) {
      activeSceneIdRef.current = matchedScene.id;
      setActiveSceneId(matchedScene.id);
    }
  }

  useEffect(() => {
    if (phase !== "autoplay") return;

    autoplayStartRef.current = performance.now();

    const tick = () => {
      autoplayRafRef.current = null;
      if (phaseRef.current !== "autoplay") return;

      const elapsed =
        (performance.now() - (autoplayStartRef.current ?? performance.now())) /
        1000;
      const progress = Math.min(elapsed / AUTOPLAY_REAL_DURATION, 1);
      applyOriginalTime(progress * AUTOPLAY_STOP_TIME);

      if (progress >= 1) {
        phaseRef.current = "scroll";
        setPhase("scroll");
        return;
      }

      autoplayRafRef.current = requestAnimationFrame(tick);
    };

    autoplayRafRef.current = requestAnimationFrame(tick);

    return () => {
      if (autoplayRafRef.current !== null) {
        cancelAnimationFrame(autoplayRafRef.current);
        autoplayRafRef.current = null;
      }
    };
  }, [phase]);

  useEffect(() => {
    if (phase === "loading") return;

    const handleFrame = () => {
      scrollRafRef.current = null;

      const section = sectionRef.current;
      if (!section) return;

      const viewport = window.innerHeight;
      const totalScrollable = Math.max(section.offsetHeight - viewport, 1);
      const scrolled = clamp(
        -section.getBoundingClientRect().top,
        0,
        totalScrollable,
      );
      const progress = clamp(scrolled / totalScrollable, 0, 1);

      if (
        phaseRef.current === "autoplay" &&
        window.scrollY > SCROLL_KICKOFF_PX
      ) {
        phaseRef.current = "scroll";
        setPhase("scroll");
      }

      if (phaseRef.current === "scroll") {
        const time =
          AUTOPLAY_STOP_TIME +
          progress * (HOMEPAGE_VIDEO_DURATION - AUTOPLAY_STOP_TIME);
        applyOriginalTime(time);
      }
    };

    const requestTick = () => {
      if (scrollRafRef.current !== null) return;
      scrollRafRef.current = requestAnimationFrame(handleFrame);
    };

    requestTick();

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    return () => {
      window.removeEventListener("scroll", requestTick);
      window.removeEventListener("resize", requestTick);
      if (scrollRafRef.current !== null) {
        cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    };
  }, [phase]);

  const activeScene = useMemo(
    () =>
      homepageScenes.find((scene) => scene.id === activeSceneId) ??
      homepageScenes[0],
    [activeSceneId],
  );

  if (reducedMotion) {
    return (
      <section className={styles.section}>
        <div className={styles.reducedStage}>
          <video
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            controls
            poster="/aldho-video-poster.jpg"
          >
            <source src="/aldho-video.mp4" type="video/mp4" />
          </video>
          <Container className={styles.overlay}>
            <div className={styles.copyBlock}>
              <p className={styles.sceneLabel}>ALDHO / homepage film</p>
              <h1 className={styles.sceneTitle}>ALDHO</h1>
              <p className={styles.sceneText}>
                На устройствах с reduced motion главная работает как обычная
                видео-сцена без scroll-scrub.
              </p>
            </div>
          </Container>
        </div>
      </section>
    );
  }

  const posterUrl = `${homepageSequence.publicDirectory}/${POSTER_FRAME}`;

  return (
    <section ref={sectionRef} className={styles.section} id="homepage-story">
      <div className={styles.stage}>
        <div
          className={styles.canvasShell}
          style={{ "--poster": `url(${posterUrl})` } as React.CSSProperties}
        >
          <canvas ref={canvasRef} className={styles.canvas} />
          <div className={styles.scrim} aria-hidden="true" />
        </div>

        <Container
          className={`${styles.overlay} ${
            !overlayActive ||
            (phase !== "scroll" && activeScene?.id !== "hero")
              ? styles.overlayHidden
              : ""
          }`}
        >
          {activeScene?.id === "hero" ? (
            <HeroBlock
              title={activeScene.title}
              tagline={activeScene.description}
              introCompletedRef={introCompletedRef}
              onScrollHint={scrollToBrand}
            />
          ) : activeScene ? (
            <div key={activeScene.id} className={styles.sceneBlock}>
              <div className={styles.sceneCard}>
                <p className={styles.sceneLabel}>{activeScene.label}</p>
                <h2 className={styles.sceneTitle}>{activeScene.title}</h2>
                {activeScene.description ? (
                  <p className={styles.sceneText}>{activeScene.description}</p>
                ) : null}
              </div>
            </div>
          ) : null}
        </Container>
      </div>

      <div className={styles.scrollSpace} aria-hidden="true" />
    </section>
  );
}
