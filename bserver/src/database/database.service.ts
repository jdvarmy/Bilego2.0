import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  EventDates,
  Events,
  ItemClosestMetro,
  Items,
  Maps,
  OrderItems,
  Orders,
  SEO,
  Taxonomy,
  Tickets,
  TicketsSell,
  UserAccess,
  Users,
} from '../typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uidv4 } from 'uuid';
import { UserEntityRole, UserEntityStatus } from '../types/enums';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    @InjectRepository(UserAccess)
    private userAccessRepo: Repository<UserAccess>,
    @InjectRepository(Events) private eventsRepo: Repository<Events>,
    @InjectRepository(EventDates)
    private eventDatesRepo: Repository<EventDates>,
    @InjectRepository(Items) private itemsRepo: Repository<Items>,
    @InjectRepository(ItemClosestMetro)
    private itemClosestMetroRepo: Repository<ItemClosestMetro>,
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
      name: 'Вася',
      surname: 'Пупкин',
      birthdate: new Date(),
      phone: '+7(999)227-72-27',
    });
    await this.usersRepo.save(admin);
  }

  // USER REQUESTS
}
