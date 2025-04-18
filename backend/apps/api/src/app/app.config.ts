export enum ApplicationServiceURL {
  Users = 'http://localhost:3333/api/auth',
  FitTrainings = 'http://localhost:3334/api/trainings',
  FitFeedbacks = 'http://localhost:3334/api/feedbacks',
  File = 'http://localhost:3337/api/files'
}

export enum HttpClientSettings {
  MaxRedirects = 5,
  Timeout = 3000,
}
