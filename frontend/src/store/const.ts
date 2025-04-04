export enum APIRoute {
  Users = '/users',
  Login = `${Users}/login`,
  CheckAuth = '/users/check',
  Trainings = '/fit/trainings',
  Feedbacks = '/fit/feedback',
  Fit = '/fit',
  Questionnaire = `${Users}/questionnaire`
}

export enum NameSpace {
  User = 'USER',
  Training = 'TRAINING',
  Feedback = 'FEEDBACK',
}
