export enum UserRole {
  admin = 'bilego_admin',
  manager = 'admin_panel_manager',
  organizer = 'event_ceo',
  subscriber = 'subscriber',
}
export enum BaseRecordStatus {
  create = 'create',
  edit = 'edit',
}

export enum PostStatus {
  temp = 'temp', // - временный шаблон пост.
  publish = 'publish', // - опубликованный пост.
  pending = 'pending', // - пост на модерации.
  draft = 'draft', // - черновик.
  future = 'future', // - запланированный пост.
  private = 'private', // - личный пост.
  trash = 'trash', // - удаленный пост (в корзине)
}

export enum EventHeaderType {
  image = 'image',
  video = 'video',
  effect = 'effect',
}

export enum City {
  moscow = 'moscow',
  petersburg = 'petersburg',
}

export enum TicketType {
  simple = 'simple',
  map = 'map',
}
