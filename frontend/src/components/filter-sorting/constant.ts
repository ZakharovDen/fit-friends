export enum FilterSortingDisplayMode {
  GymCatalog,
  MyTraining,
}

export const FilterSortingSettings = {
  [FilterSortingDisplayMode.GymCatalog]:
  {
    classPrefix: 'gym-catalog',
  },
  [FilterSortingDisplayMode.MyTraining]:
  {
    classPrefix: 'my-training',
  },
} as const;