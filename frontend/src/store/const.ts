export enum APIRoute {
  Users = '/users',
  Login = `${Users}/login`,
  CheckAuth = '/users/check',
  Trainings = '/fit/trainings',
  MyTrainings = '/fit/my-trainings',
  Feedbacks = '/fit/feedback',
  Fit = '/fit',
  Questionnaire = `${Users}/questionnaire`,
  TrainingsVideo = '/fit/trainings-video',
}

export enum NameSpace {
  User = 'USER',
  Training = 'TRAINING',
  Feedback = 'FEEDBACK',
}
