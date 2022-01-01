import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import * as QueryString from 'querystring';
import { IEvent } from '../types/types';

@Injectable()
export class EventService {
  constructor(private readonly httpService: HttpService) {}

  public allEventsLimit(options): Observable<IEvent> {
    return this.httpService
      .get(
        `${process.env.BILEGO_API_SERVER}/events?${QueryString.stringify(
          options,
        )}`,
      )
      .pipe(map((response) => response.data));
  }

  public async findOne(id): Promise<any> {
    return id;
  }
}
