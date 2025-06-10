export enum ApplicationServiceURL {
  Users = 'http://localhost:3333/api/auth',
  Friends = 'http://localhost:3333/api/friends',
  FitTrainings = 'http://localhost:3334/api/trainings',
  FitFeedbacks = 'http://localhost:3334/api/feedbacks',
  File = 'http://localhost:3337/api/files',
  FitRequests = 'http://localhost:3334/api/requests',
}

export enum HttpClientSettings {
  MaxRedirects = 5,
  Timeout = 3000,
}
