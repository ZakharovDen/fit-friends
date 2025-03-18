const titles = [
  'crossfit',
  'energy',
  'boxing',
  'power',
  'antistress',
  'run, forrest, run',
  'fitball',
  'hatha',
  'full body stretch',
  'upper body',
  'devil\'s cindy',
  'fleksbend',
]

const descriptions = [
  'Сложный комплекс упражнений для профессиональных атлетов на отработку показателей в классическом стиле.',
  'Упражнения укрепляют мышечный корсет, делают суставы более гибкими, улучшают осанку и координацию.',
  'Тренировка на отработку правильных ударов, координации и оптимальной механики защитных движений.',
  'Тренировка на отработку правильной техники работы с тяжелыми весами, укрепления мышц кора и спины.',
  'В основе программы лежит работа с телом и с психо-эмоциональным состоянием. Уберем зажимы тела, избавимся от стресса.',
  'Узнайте правильную технику бега, развивайте выносливость и откройте для себя все секреты длительных пробежек.',
  'Тренировка на фитболе — отличном тренажере для развития чувства баланса и равновесия, улучшения координации.',
  'Упражнения по хатха йоге, направленные на понижение нервной возбудимости и активацию процессов анаболизма.',
  'Комплекс упражнений на растяжку всего тела для новичков. Плавное погружение в стретчинг и умеренная нагрузка.',
  'Проработка мышц груди для профи, экспериментируем с уровнем наклона скамьи и различной шириной хвата.',
  'Знаменитый кроссфит комплекс. Синди — универсальная тренировка для развития функциональной силы.',
  'Тренируясь с резинкой для фитнеса, вы можете проработать почти все мышечные группы и разнообразить тренировки.'
]

const images = [
  'default/catalog-product-0.png',
  'default/catalog-product-1.png',
  'default/catalog-product-2.png',
  'default/catalog-product-3.png',
  'default/catalog-product-4.png',
  'default/catalog-product-5.png',
  'default/catalog-product-6.png',
  'default/catalog-product-7.png',
  'default/catalog-product-8.png',
]

const videos = [
  'uploads/training-video-0.mp4',
  'uploads/training-video-1.mp4',
  'uploads/training-video-2.mp4',
  'uploads/training-video-3.mp4',
]

export function getImages() {
  return images;
}

export function getVideos() {
  return videos;
}

export function getTitles() {
  return titles;
}

export function getDescriptions() {
  return descriptions;
}
