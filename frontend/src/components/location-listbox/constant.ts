export enum LocationListBoxDisplayMode {
  Register,
  Account,
}

export const LocationListBoxSettings = {
  [LocationListBoxDisplayMode.Register]:
  {
    label: 'Ваша локация',
    className: ''
  },
  [LocationListBoxDisplayMode.Account]:
  {
    label: 'Локация',
    className: 'user-info__select'
  },
} as const;