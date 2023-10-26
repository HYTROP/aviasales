export const CHECKBOXES = [
  {
    id: 1,
    title: "Все",
    isChecked: false,
  },
  {
    id: 2,
    title: "Без пересадок",
    isChecked: false,
    filterFunction: (tickets) => { return [...tickets].filter((item) => item.segments[0].stops.length === 0) },
  },
  {
    id: 3,
    title: "1 пересадка",
    isChecked: false,
    filterFunction: (tickets) => { return [...tickets].filter((item) => item.segments[0].stops.length === 1) },
  },
  {
    id: 4,
    title: "2 пересадки",
    isChecked: false,
    filterFunction: (tickets) => { return [...tickets].filter((item) => item.segments[0].stops.length === 2) },
  },
  {
    id: 5,
    title: "3 пересадки",
    isChecked: false,
    filterFunction: (tickets) => { return [...tickets].filter((item) => item.segments[0].stops.length === 3) },
  },
];