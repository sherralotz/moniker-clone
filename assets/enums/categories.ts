export enum CategoryId {
  General = 1,
  Science = 2,
  HistoricalFigure = 3,
  Celebrity = 4,
  FictionalCharacter = 5,
  EtCetera = 6,
}

export interface Category {
  id: CategoryId;
  label: string;
}

export const categories: Category[] = [
  { id: CategoryId.General, label: "General" },
  { id: CategoryId.Science, label: "Science" },
  { id: CategoryId.HistoricalFigure, label: "Historical Figure" },
  { id: CategoryId.Celebrity, label: "Celebrity" },
  { id: CategoryId.FictionalCharacter, label: "Fictional Character" },
  { id: CategoryId.EtCetera, label: "Et Cetera" },
];