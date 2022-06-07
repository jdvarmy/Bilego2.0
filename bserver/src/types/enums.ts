export enum PostType {
  ticketObject = 'bilego_ticket_object',
  event = 'bilego_event_post',
  item = 'bilego_item_post',
  artist = 'bilego_artist_post',
}

export enum PostStatus {
  publish = 'publish', // - опубликованный пост.
  pending = 'pending', // - пост на модерации.
  draft = 'draft', // - черновик.
  future = 'future', // - запланированный пост.
  private = 'private', // - личный пост.
  trash = 'trash', // - удаленный пост (в корзине)
}

export enum City {
  moscow = 'moscow',
  petersburg = 'petersburg',
}

export enum TermType {
  eventCategory = 'category',
  eventGenre = 'genre',
  eventSelection = 'selection',
  eventFeeling = 'feeling',
  itemType = 'type',
}

export enum SortType {
  desc = 'desc',
  asc = 'asc',
  popular = 'popular',
}

export enum UserEntityRole {
  admin = 'bilego_admin',
  manager = 'admin_panel_manager',
  organizer = 'event_ceo',
  subscriber = 'subscriber',
}

export enum UserEntityStatus {
  inactive,
  active,
}

export enum EventHeaderType {
  image = 'image',
  video = 'video',
  effect = 'effect',
}

export enum TaxonomyLink {
  event = 'event',
  item = 'item',
}

export enum TaxonomyType {
  genre = 'genre',
  category = 'category',
  selection = 'selection',
  feeling = 'feeling',
  type = 'type',
}

export enum OrderStatus {
  pendingPayment = 'pendingPayment', // в ожидании оплаты
  processing = 'processing', // обработка
  completed = 'completed', // выполнен
  canceled = 'canceled', // отменен
  failed = 'failed', // не удался, оплата не прошла
  onHold = 'onHold', // на удержании
  refunded = 'refunded', // возвращен
}

export enum UnauthorizedException_401 {
  notFound = 'Пользователь не найден',
  wrongPass = 'Неверный логин или пароль',
}

export enum ForbiddenException_403 {
  deleted = 'Пользователь удален',
}

export enum NotFoundException_404 {}

export enum BadRequestException_400 {}

export enum InternalServerErrorException_500 {
  uploadFile = 'Неудалось загрузить файл на диск',
  removeFile = 'Неудалось удалить файл',
  saveUser = 'Неуказаны логин или пароль',
  getUser = 'Такого пользователя не существует',
  findUser = 'Пользователь с такими данными не найден',
}

export enum FileType {
  image = 'image',
}
