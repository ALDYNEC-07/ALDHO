export const homepageSequence = {
  id: "aldho-2x-15fps",
  sourceVideoPath: "public/aldho-video-2x.mp4",
  publicVideoPath: "/aldho-video-2x.mp4",
  posterPath: "/aldho-video-2x-poster.jpg",
  outputDirectory: "public/sequences/aldho-2x-15fps",
  publicDirectory: "/sequences/aldho-2x-15fps",
  framePattern: "frame-%04d.jpg",
  frameRate: 15,
  width: 720,
  quality: 3,
} as const;

export type HomepageSequenceConfig = typeof homepageSequence;
