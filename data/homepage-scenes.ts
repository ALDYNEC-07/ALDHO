export type HomepageScene = {
  id: string;
  label: string;
  title: string;
  description: string;
  start: number;
  end: number;
};

export const HOMEPAGE_VIDEO_DURATION = 22;
export const HOMEPAGE_HERO_END = 7;

export const homepageScenes: HomepageScene[] = [
  {
    id: "hero",
    label: "Hero",
    title: "ALDHO",
    description:
      "Минималистичный вход в бренд: знак, ткань и силуэт работают как одно целое.",
    start: 0,
    end: 7,
  },
  {
    id: "brand",
    label: "Brand",
    title: "Бренд начинается с формы.",
    description:
      "Камера подводит к футболке мягко, без визуального шума. Внимание остается на вещи и знаке.",
    start: 7,
    end: 11,
  },
  {
    id: "shirt-quality",
    label: "Quality",
    title: "Чистая ткань. Спокойная посадка.",
    description:
      "Отдельная сцена для материала: фактура, шов и поведение ткани под светом.",
    start: 11,
    end: 14,
  },
  {
    id: "print-quality",
    label: "Print",
    title: "Принт держит характер.",
    description:
      "Крупный план переносит фокус на качество нанесения и на то, как знак ложится на поверхность.",
    start: 14,
    end: 20,
  },
  {
    id: "collection-teaser",
    label: "Teaser",
    title: "Следующая история уже собирается.",
    description:
      "Финальные секунды работают как тизер следующего дизайна и следующего блока коллекции.",
    start: 20,
    end: 22,
  },
];
