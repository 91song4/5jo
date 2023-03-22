import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// 엔티티
import { Camp } from 'src/camp/camp.entity';
import { ReservationCalendar } from './reservation_calendar.entity';

// 캐시 매니저 ( redis )
import * as cacheManager from 'cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReservationCalendarService {
  private readonly cache: cacheManager.Cache;

  constructor(
    @InjectRepository(ReservationCalendar)
    private readonly reservationCalendarRepository: Repository<ReservationCalendar>,
    @InjectRepository(Camp)
    private readonly campRepository: Repository<Camp>,
    private configService: ConfigService,
  ) {
    this.cache = cacheManager.caching({
      store: redisStore,
      host: this.configService.get('REFRESHTOKEN_HOST'),
      port: this.configService.get('REFRESHTOKEN_PORT'),
    });
  }

  async getReservationCalendarData(): Promise<any[]> {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;

    const cachedData = await this.cache.get(
      `reservation-calendar-${year}-${month}`,
    );

    if (cachedData) {
      // return cachedData;
    }

    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

    const maxYear = sixMonthsFromNow.getFullYear();
    const maxMonth = sixMonthsFromNow.getMonth() + 1;

    const camps = await this.campRepository.find();

    const reservations = await this.reservationCalendarRepository
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.camp', 'camp')
      .select([
        'reservation.year',
        'reservation.month',
        'reservation.day',
        'camp.name',
        'reservation.isReserve',
      ])
      .where('reservation.year >= :year', { year })
      .andWhere('reservation.year <= :maxYear', { maxYear })
      .andWhere('reservation.month >= :month', { month })
      .andWhere('reservation.month <= :maxMonth', { maxMonth })
      .getMany();

    const calendarData = [];

    for (let i = 0; i < camps.length; i++) {
      const campReservations = reservations.filter(
        (r) => r.camp.id === camps[i].id,
      );

      const calendar = Array.from({ length: 31 }, (_, index) => {
        const day = index + 1;
        const reserve = campReservations.find((r) => r.day === day);

        return {
          day,
          isReserve: reserve ? reserve.isReserve : false,
        };
      });

      calendarData.push({
        campId: camps[i].id,
        name: camps[i].name,
        calendar,
      });
    }

    await this.cache.set(
      `reservation-calendar-${year}-${month}`,
      calendarData,
      // { ttl: 60 },
    );

    return calendarData;
  }
}
