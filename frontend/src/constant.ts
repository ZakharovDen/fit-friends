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
  MyPurchases = '/my-purchases',
  CreateTraining = '/create-training',
  UserCard = '/user/:id',
  MyTrainings = '/my-trainings',
  MyOrders = '/my-orders',
  UsersCatalog = '/users-catalog',
  MyFriends = '/my-friends',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
