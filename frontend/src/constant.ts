export enum AppRoute {
  Main = '/',
  Intro = '/intro',
  Error = '/error',
  Login = '/sign-in',
  Register = '/sign-up',
  Catalog = '/training-catalog',
  TrainingCard = '/training/:id',
  Account = '/account',
  Questionnaire = '/questionnaire',
  NotFound = '/404',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}