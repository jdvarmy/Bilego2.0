import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Artists,
  EventDates,
  EventHeader,
  EventManager,
  EventMeta,
  Events,
  ItemClosestMetro,
  ItemMeta,
  Items,
  Maps,
  OrderItems,
  Orders,
  SEO,
  Taxonomy,
  Tickets,
  TicketsSell,
  UserAccess,
  UserMeta,
  Users,
} from '../typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uidv4 } from 'uuid';
import { UserEntityRole, UserEntityStatus } from '../types/enums';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    @InjectRepository(UserMeta) private userMetaRepo: Repository<UserMeta>,
    @InjectRepository(UserAccess)
    private userAccessRepo: Repository<UserAccess>,
    @InjectRepository(Events) private eventsRepo: Repository<Events>,
    @InjectRepository(EventMeta) private eventMetaRepo: Repository<EventMeta>,
    @InjectRepository(EventManager)
    private eventManagerRepo: Repository<EventManager>,
    @InjectRepository(EventHeader)
    private eventHeaderRepo: Repository<EventHeader>,
    @InjectRepository(EventDates)
    private eventDatesRepo: Repository<EventDates>,
    @InjectRepository(Items) private itemsRepo: Repository<Items>,
    @InjectRepository(ItemMeta) private itemMetaRepo: Repository<ItemMeta>,
    @InjectRepository(ItemClosestMetro)
    private itemClosestMetroRepo: Repository<ItemClosestMetro>,
    @InjectRepository(Artists) private artistsRepo: Repository<Artists>,
    @InjectRepository(Maps) private mapsRepo: Repository<Maps>,
    @InjectRepository(Tickets) private ticketsRepo: Repository<Tickets>,
    @InjectRepository(TicketsSell)
    private ticketsSellRepo: Repository<TicketsSell>,
    @InjectRepository(SEO) private seoRepo: Repository<SEO>,
    @InjectRepository(Taxonomy) private taxonomyRepo: Repository<Taxonomy>,
    @InjectRepository(Orders) private ordersRepo: Repository<Orders>,
    @InjectRepository(OrderItems)
    private orderItemsRepo: Repository<OrderItems>,
  ) {}

  async initial() {
    const admin = this.usersRepo.create({
      uid: uidv4(),
      email: 'chekist.87@mail.ru',
      login: 'chekist.87@mail.ru',
      pass: await bcrypt.hash('123', 13),
      role: UserEntityRole.admin,
      status: UserEntityStatus.active,
    });
    await this.usersRepo.save(admin);

    const adminMeta = this.userMetaRepo.create({
      name: 'Вася',
      surname: 'Пупкин',
      birthdate: '1987-01-01',
      phone: '+7(999)227-72-27',
    });
    adminMeta.user = admin;
    await this.userMetaRepo.save(adminMeta);
  }

  // USER REQUESTS
}
