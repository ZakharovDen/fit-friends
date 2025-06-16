export enum FilterMinMaxDisplayMode {
  Price,
  Calories,
}

export const FilterMinMaxSettings = {
  [FilterMinMaxDisplayMode.Price]:
  {
    classSuffix: 'price',
  },
  [FilterMinMaxDisplayMode.Calories]:
  {
    classSuffix: 'calories',
  },
} as const;
