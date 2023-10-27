export const TABS = [
  {
    id: 1,
    tabTitle: "САМЫЙ ДЕШЕВЫЙ",
    sortFunction: (tickets) => {
      return [...tickets].sort((a, b) => a.price - b.price);
    },
  },
  {
    id: 2,
    tabTitle: "САМЫЙ БЫСТРЫЙ",
    sortFunction: (tickets) =>
      [...tickets].sort(
        (a, b) => a.segments[0].duration - b.segments[0].duration
      ),
  },
  {
    id: 3,
    tabTitle: "ОПТИМАЛЬНЫЙ",
    sortFunction: (tickets) =>
      [...tickets].sort(
        (a, b) => a.segments[0].duration - b.segments[0].duration
      ),
  },
];