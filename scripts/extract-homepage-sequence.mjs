import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = dirname(__dirname);

const config = {
  id: "aldho-2x-15fps",
  sourceVideoPath: join(projectRoot, "public/aldho-video-2x.mp4"),
  outputDirectory: join(projectRoot, "public/sequences/aldho-2x-15fps"),
  publicDirectory: "/sequences/aldho-2x-15fps",
  framePattern: "frame-%04d.jpg",
  frameRate: 15,
  width: 720,
  quality: 3,
};

function run(command, args) {
  execFileSync(command, args, {
    cwd: projectRoot,
    stdio: "inherit",
  });
}

function readJson(command, args) {
  return JSON.parse(
    execFileSync(command, args, {
      cwd: projectRoot,
      encoding: "utf8",
    }),
  );
}

if (!existsSync(config.sourceVideoPath)) {
  throw new Error(`Source video not found: ${config.sourceVideoPath}`);
}

rmSync(config.outputDirectory, {
  force: true,
  recursive: true,
});
mkdirSync(config.outputDirectory, {
  recursive: true,
});

const outputPattern = join(config.outputDirectory, config.framePattern);

run("ffmpeg", [
  "-hide_banner",
  "-y",
  "-i",
  config.sourceVideoPath,
  "-vf",
  `fps=${config.frameRate},scale=${config.width}:-1:flags=lanczos`,
  "-q:v",
  String(config.quality),
  outputPattern,
]);

const videoProbe = readJson("ffprobe", [
  "-v",
  "error",
  "-print_format",
  "json",
  "-show_streams",
  "-show_format",
  config.sourceVideoPath,
]);

const frameFiles = readdirSync(config.outputDirectory)
  .filter((file) => file.endsWith(".jpg"))
  .sort();

const totalBytes = frameFiles.reduce((sum, file) => {
  return sum + statSync(join(config.outputDirectory, file)).size;
}, 0);

const videoStream = videoProbe.streams.find((stream) => stream.codec_type === "video");
const sourceWidth = videoStream?.width ?? null;
const sourceHeight = videoStream?.height ?? null;
const outputHeight =
  sourceWidth && sourceHeight
    ? Math.round((sourceHeight / sourceWidth) * config.width)
    : null;

const manifest = {
  id: config.id,
  sourceVideoPath: "/aldho-video-2x.mp4",
  frameRate: config.frameRate,
  totalFrames: frameFiles.length,
  durationSeconds: Number(videoProbe.format.duration),
  width: config.width,
  height: outputHeight,
  sourceWidth,
  sourceHeight,
  framePattern: config.framePattern,
  publicDirectory: config.publicDirectory,
  totalBytes,
  generatedAt: new Date().toISOString(),
  files: frameFiles,
};

writeFileSync(
  join(config.outputDirectory, "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

console.log("");
console.log(`Extracted ${manifest.totalFrames} frames to ${config.outputDirectory}`);
console.log(`Sequence size: ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
