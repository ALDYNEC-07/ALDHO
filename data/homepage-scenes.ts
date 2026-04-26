export type HomepageScene = {
  id: string;
  label: string;
  title: string;
  description: string;
  start: number;
  end: number;
};

export const HOMEPAGE_VIDEO_DURATION = 22;
export const HOMEPAGE_HERO_END = 6.5;

export const homepageScenes: HomepageScene[] = [
  {
    id: "hero",
    label: "ALDHO",
    title: "ALDHO",
    description: "",
    start: 0,
    end: 6.5,
  },
  {
    id: "brand",
    label: "Алды · Чечня",
    title: "Из посёлка, не из города.",
    description:
      "ALDHO начинается в Алды — в имени, в месте, в силуэте.",
    start: 6.5,
    end: 11,
  },
  {
    id: "shirt-quality",
    label: "Материал",
    title: "Плотный хлопок. Чистый крой.",
    description: "Прямой силуэт, который не теряет форму.",
    start: 11,
    end: 14,
  },
  {
    id: "print-quality",
    label: "Печать",
    title: "Принт ложится в ткань.",
    description:
      "Шёлкография — краска уходит в хлопок, не остаётся сверху.",
    start: 14,
    end: 20,
  },
  {
    id: "collection-teaser",
    label: "Коллекция I",
    title: "Шейх Мансур. 1785.",
    description: "Имя, которое не нужно объяснять.",
    start: 20,
    end: 22,
  },
];
