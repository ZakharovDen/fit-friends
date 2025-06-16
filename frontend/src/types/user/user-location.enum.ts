export enum UserLocation {
  Pionerskaya = 'Pionerskaya',
  Petrogradskaya = 'Petrogradskaya',
  Udelnaya = 'Udelnaya',
  Zvezdnaya = 'Zvezdnaya',
  Sportivnaya = 'Sportivnaya',
}

export const UserLocationLabel: Record<UserLocation, string> = {
  [UserLocation.Pionerskaya]: 'Пионерская',
  [UserLocation.Petrogradskaya]: 'Петроградская',
  [UserLocation.Udelnaya]: 'Удельная',
  [UserLocation.Zvezdnaya]: 'Звёздная',
  [UserLocation.Sportivnaya]: 'Спортивная',
};
