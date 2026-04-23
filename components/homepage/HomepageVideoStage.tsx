"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { homepageScenes, HOMEPAGE_VIDEO_DURATION } from "@/data/homepage-scenes";
import { Container } from "@/components/ui/Container";
import styles from "./HomepageVideoStage.module.css";

const SCROLL_THRESHOLD_PX = 24;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function HomepageVideoStage() {
  const shellRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const heroAutoplayStoppedRef = useRef(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [scrollDriven, setScrollDriven] = useState(false);
  const [autoplayFailed, setAutoplayFailed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    handleChange();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const video = videoRef.current;
    const heroScene = homepageScenes[0];

    if (!video || !heroScene) {
      return;
    }

    let frameId = 0;
    let cancelled = false;

    const syncHeroFrame = () => {
      if (cancelled || heroAutoplayStoppedRef.current) {
        return;
      }

      const nextTime = Math.min(video.currentTime, heroScene.end);
      setCurrentTime(nextTime);

      if (video.currentTime >= heroScene.end) {
        video.pause();
        video.currentTime = heroScene.end;
        heroAutoplayStoppedRef.current = true;
        setCurrentTime(heroScene.end);
        return;
      }

      frameId = window.requestAnimationFrame(syncHeroFrame);
    };

    const startHeroPlayback = async () => {
      try {
        video.currentTime = 0;
        await video.play();
        frameId = window.requestAnimationFrame(syncHeroFrame);
      } catch {
        setAutoplayFailed(true);
      }
    };

    void startHeroPlayback();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const handleScroll = () => {
      const shell = shellRef.current;
      const video = videoRef.current;

      if (!shell || !video) {
        return;
      }

      const viewportHeight = window.innerHeight;
      const totalScrollable = Math.max(shell.offsetHeight - viewportHeight, 1);
      const scrolled = clamp(-shell.getBoundingClientRect().top, 0, totalScrollable);
      const shouldDriveByScroll = scrolled > SCROLL_THRESHOLD_PX;

      setScrollDriven((current) =>
        current === shouldDriveByScroll ? current : shouldDriveByScroll,
      );

      if (!shouldDriveByScroll) {
        return;
      }

      heroAutoplayStoppedRef.current = true;

      const nextTime = clamp(
        (scrolled / totalScrollable) * HOMEPAGE_VIDEO_DURATION,
        0,
        HOMEPAGE_VIDEO_DURATION,
      );

      video.pause();

      if (Math.abs(video.currentTime - nextTime) > 0.03) {
        video.currentTime = nextTime;
      }

      setCurrentTime(nextTime);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [prefersReducedMotion]);

  const activeScene = useMemo(() => {
    return (
      homepageScenes.find((scene, index) => {
        const isLastScene = index === homepageScenes.length - 1;
        const inRange = currentTime >= scene.start && currentTime < scene.end;

        return inRange || (isLastScene && currentTime >= scene.start);
      }) ?? homepageScenes[0]
    );
  }, [currentTime]);

  if (prefersReducedMotion) {
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

  return (
    <section ref={shellRef} className={styles.section} id="homepage-story">
      <div className={styles.stage}>
        <video
          ref={videoRef}
          className={styles.video}
          muted
          playsInline
          preload="auto"
          poster="/aldho-video-poster.jpg"
          controls={autoplayFailed}
        >
          <source src="/aldho-video.mp4" type="video/mp4" />
        </video>

        <div className={styles.scrim} aria-hidden="true" />

        <Container className={styles.overlay}>
          <div className={styles.copyBlock}>
            <p className={styles.sceneLabel}>{activeScene.label}</p>
            <h1 className={styles.sceneTitle}>{activeScene.title}</h1>
            <p className={styles.sceneText}>{activeScene.description}</p>
            {!scrollDriven ? (
              <p className={styles.scrollHint}>Прокрутка продолжит историю.</p>
            ) : null}
          </div>

          <div className={styles.sceneRail} aria-label="Homepage scenes">
            {homepageScenes.map((scene) => {
              const isActive = activeScene.id === scene.id;

              return (
                <div
                  key={scene.id}
                  className={`${styles.sceneRailItem} ${isActive ? styles.sceneRailItemActive : ""}`}
                >
                  <span className={styles.sceneRailLabel}>{scene.label}</span>
                  <span className={styles.sceneRailRange}>
                    {scene.start}-{scene.end}s
                  </span>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      <div className={styles.scrollSpace} aria-hidden="true" />
    </section>
  );
}
