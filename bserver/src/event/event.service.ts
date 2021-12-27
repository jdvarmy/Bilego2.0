import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { IEvent } from '../types';
import { restAPI } from '../main';
import * as QueryString from 'querystring';

@Injectable()
export class EventService {
  constructor(private httpService: HttpService) {}

  public allEventsLimit(options): Observable<IEvent> {
    return this.httpService
      .get(`${restAPI}/events?${QueryString.stringify(options)}`)
      .pipe(map((response) => response.data));
  }

  public async findOne(id): Promise<any> {
    return id;
  }
}
