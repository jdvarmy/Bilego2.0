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
  autoDraft = 'auto-draft', // - черновик, сохраненный самим WordPress (авто-сохранение).
  future = 'future', // - запланированный пост.
  private = 'private', // - личный пост.
  inherit = 'inherit', // - ревизия или вложение.
  trash = 'trash', // - удаленный пост (в корзине)
}

export enum City {
  moscow = 'moscow',
  petersburg = 'petersburg',
}

export enum UserRoles {
  subscriber = 'subscriber',
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
