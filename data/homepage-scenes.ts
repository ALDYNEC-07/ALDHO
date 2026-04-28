export type HomepageScene = {
  id: string;
  label: string;
  title: string;
  description: string;
  start: number;
  end: number;
};

export const HOMEPAGE_VIDEO_DURATION = 22;

export const homepageScenes: HomepageScene[] = [
  {
    id: "hero",
    label: "ALDHO",
    title: "Оригинальные футболки из Алдов",
    description: "",
    start: 0,
    end: 10.23,
  },
  {
    id: "brand",
    label: "Алды · Чечня",
    title: "ALDHO — гордость для народов",
    description: "Посёлок, который повлиял на ход истории Кавказа",
    start: 10.23,
    end: 13.55,
  },
  {
    id: "shirt-quality",
    label: "Материал",
    title: "Плотный хлопок",
    description: "Силуэт, который не теряет форму",
    start: 13.55,
    end: 16.62,
  },
  {
    id: "print-quality",
    label: "Печать",
    title: "Принт ложится в ткань",
    description:
      "Шёлкография — краска уходит в хлопок, не остаётся сверху",
    start: 16.62,
    end: 20,
  },
  {
    id: "collection-teaser",
    label: "Коллекция I",
    title: "Шейх Мансур · 1785",
    description: "Имя, которое не нужно объяснять",
    start: 20,
    end: 22,
  },
];
