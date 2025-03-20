export enum ApplicationServiceURL {
  Users = 'http://localhost:3333/api/auth',
  FitTrainings = 'http://localhost:3334/api/trainings',
  FitFeedbacks = 'http://localhost:3334/api/feedbacks',
  File = 'http://localhost:3337/api/files'
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 3000;