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
    title: "Оригинальные футболки",
    description: "Одежда для тех, кому нечего доказывать",
    start: 0,
    end: 8.3,
  },
  {
    id: "brand",
    label: "Алды · Чечня",
    title: "ALDHO — гордость для народов",
    description: "Выходец из посёлка, который повлиял на ход истории Кавказа",
    start: 10.23,
    end: 12.55,
  },
  {
    id: "shirt-quality",
    label: "Материал",
    title: "Плотный хлопок",
    description: "Силуэт, который не теряет форму",
    start: 13.55,
    end: 15.62,
  },
  {
    id: "print-quality",
    label: "Печать",
    title: "Принт, который чувствуется",
    description: "Плотный слой ложится поверх — держит цвет и форму",
    start: 16.62,
    end: 19,
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
