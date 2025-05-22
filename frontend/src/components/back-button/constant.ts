export enum BackButtonDisplayMode {
  Purchases,
  User,
  Catalog,
  Training,
  MyTraining,
  MyOrders,
  UsersCatalog,
}

export const BackButtonClassName = {
  [BackButtonDisplayMode.Purchases]: 'my-purchases__back',
  [BackButtonDisplayMode.User]: 'inner-page__back',
  [BackButtonDisplayMode.Catalog]: 'btn-flat--underlined gym-catalog-form__btnback',
  [BackButtonDisplayMode.Training]: 'btn-flat--underlined reviews-side-bar__back',
  [BackButtonDisplayMode.MyTraining]: 'btn-flat btn-flat--underlined my-training-form__btnback',
  [BackButtonDisplayMode.MyOrders]: 'btn-flat btn-flat--underlined my-orders__back',
  [BackButtonDisplayMode.UsersCatalog]: 'btn-flat btn-flat--underlined user-catalog-form__btnback',
} as const;