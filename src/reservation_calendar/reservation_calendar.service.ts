import {
  Injectable,
  CACHE_MANAGER,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// 엔티티
import { ReservationCalendar } from './reservation_calendar.entity';

// 캐시 매니저 ( redis )
import { Cache } from 'cache-manager';
import moment from 'moment';

@Injectable()
export class ReservationCalendarService {
  constructor(
    @InjectRepository(ReservationCalendar)
    private readonly reservationCalendarRepository: Repository<ReservationCalendar>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // 해당 날짜의 예약 캘린더를 가져옴
  async getReservationCalendar(date: Date) {
    // 캐시 키 생성
    const cacheKey = `reservationCalendar:${date}`;
    // 캐시 매니저에서 해당 캐시 키에 해당하는 예약 캘린더를 가져옴
    const cachedReservationCalendar =
      await this.cacheManager.get<ReservationCalendar>(cacheKey);
    // 캐시에 예약 캘린더가 존재하면 해당 예약 캘린더를 반환
    if (cachedReservationCalendar) {
      return cachedReservationCalendar;
    }
    // 예약 캘린더 레포지토리에서 해당 날짜의 예약 캘린더를 가져옴
    const reservationCalendar =
      await this.reservationCalendarRepository.findOne({
        where: { reservedDate: date },
      });
    // 캐시 TTL(유효 시간)을 12시간으로 설정
    const CACHE_TTL = 43200;
    // 예약 캘린더가 존재하면 해당 예약 캘린더를 캐시에 저장
    if (reservationCalendar) {
      return await this.cacheManager.set(
        cacheKey,
        reservationCalendar,
        CACHE_TTL,
      );
    }

    // 예약 캘린더 반환
    return reservationCalendar;
  }

  // 캐시메모리와 DB간에 데이터 차이가 일어나면 업데이트하기 위한 코드
  async updateReservationCalendar(
    // 예약 캘린더 객체를 매개변수로 받음
    reservationCalendar: ReservationCalendar,
  ) {
    // 예약 캘린더 객체를 저장
    await this.reservationCalendarRepository.save(reservationCalendar);
    await this.cacheManager.del(
      // 캐시 매니저에서 해당 예약일자의 예약 캘린더 캐시를 삭제
      `reservationCalendar:${reservationCalendar.reservedDate}`,
    );
  }

  // 선택한 날짜가 예약 가능한지를 확인하는 함수
  async isReservationPossible(date: Date) {
    // 해당 날짜에 예약 가능한 캠핑장 목록을 가져옴.
    const availableCamps = await this.getAvailableCamps(date);
    // 해당 날짜에 이미 예약된 캠핑장 목록을 가져옴.
    const existingReservations = await this.getExistingReservations(date);
    const totalCamps = 14;
    // 남은 캠핑장 수를 계산
    const remainingCampsites =
      totalCamps - existingReservations - availableCamps.length;
    console.log(
      '사용 가능한 캠프 수 : ',
      availableCamps.length,
      ' /// ',
      '남은 캠핑장 수 :',
      remainingCampsites,
    );
    // 예약 가능한 캠핑장이 있고, 남은 캠핑장이 있다면 true를 반환
    return availableCamps.length > 0 && remainingCampsites > 0;
  }

  // 해당 날짜에 예약 가능한 캠프장을 가져오는 함수
  async getAvailableCamps(date: Date) {
    // 예약 캘린더를 가져오고 매개변수로 받은 날짜를 Date 객체로 변환하여 전달
    console.log('매개변수로 받은 날짜 : ', date);
    const reservationCalendar = await this.getReservationCalendar(
      new Date(date),
    );
    console.log('reservationCalendar : ', reservationCalendar);
    if (!reservationCalendar) {
      return '';
    }
    // 예약 가능한 캠프장을 필터링하여 반환하는데, 해당 캠프장이 예약 가능한지 확인하고 true인 경우만 필터링
    const availableCamps = Object.keys(reservationCalendar).filter(
      (campId) => reservationCalendar[campId] === true,
    );
    console.log('availableCamps : ', availableCamps);
    return availableCamps;
  }

  // 해당 날짜에 예약된 예약 수를 가져옴
  async getExistingReservations(date: Date) {
    // 예약 날짜가 인자로 받은 날짜와 같은 예약 수를 찾아서 리턴
    const reservationCount = await this.reservationCalendarRepository.count({
      where: { reservedDate: date },
    });
    return reservationCount;
  }

  // isDateAvailable를 그대로 사용하면서, 추가된 if문 ( 선택한 날이 오늘을 기준으로 이미 지나간 날짜라면? )
  async checkAvailability(date: Date) {
    // moment 라이브러리 문법
    const isPastDate = moment(date).isBefore(moment().format('YYYY-MM-DD'));
    const isMoreThan6Months = moment(date).isAfter(
      moment().add(6, 'months').format('YYYY-MM-DD'),
    );

    // 만약 선택한 날이 이미 지난 날짜라면
    if (isPastDate) {
      throw new BadRequestException(
        '이미 지난 날을 예약할 수 없습니다. 다시 선택해주십시오.',
      );
    }

    // 만약 오늘로부터 6개월을 초과해서 예약을 시도할 경우
    if (isMoreThan6Months) {
      throw new BadRequestException(
        '최대 예약일은 현재일로부터 6개월 뒤 까지입니다. 다시 선택해주십시오.',
      );
    }
    const isAvailable = await this.isReservationPossible(date);
    return { date: isAvailable };
  }
}

// @Injectable()
// export class ReservationCalendarService {
//   private readonly cache: cacheManager.Cache;

//   constructor(
//     @InjectRepository(ReservationCalendar)
//     private readonly reservationCalendarRepository: Repository<ReservationCalendar>,
//     @InjectRepository(Camp)
//     private readonly campRepository: Repository<Camp>,
//   ) {
//     this.cache = cacheManager.caching({
//       store: redisStore,
//       host: 'localhost',
//       port: 6379,
//     });
//   }

//   async getReservationCalendarData(): Promise<any[]> {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = today.getMonth() + 1;

//     const cachedData = await this.cache.get(
//       `reservation-calendar-${year}-${month}`,
//     );

//     if (cachedData) {
//       return cachedData;
//     }

//     const sixMonthsFromNow = new Date();
//     sixMonthsFromNow.setMonth(sixMonthsFromNow.getMonth() + 6);

//     const maxYear = sixMonthsFromNow.getFullYear();
//     const maxMonth = sixMonthsFromNow.getMonth() + 1;

//     const camps = await this.campRepository.find();

//     const reservations = await this.reservationCalendarRepository
//       .createQueryBuilder('reservation')
//       .leftJoinAndSelect('reservation.camp', 'camp')
//       .select([
//         'reservation.year',
//         'reservation.month',
//         'reservation.day',
//         'camp.name',
//         'reservation.isReserve',
//       ])
//       .where('reservation.year >= :year', { year })
//       .andWhere('reservation.year <= :maxYear', { maxYear })
//       .andWhere('reservation.month >= :month', { month })
//       .andWhere('reservation.month <= :maxMonth', { maxMonth })
//       .getMany();

//     const calendarData = [];

//     for (let i = 0; i < camps.length; i++) {
//       const campReservations = reservations.filter(
//         (r) => r.camp.id === camps[i].id,
//       );

//       const calendar = Array.from({ length: 31 }, (_, index) => {
//         const day = index + 1;
//         const reserve = campReservations.find((r) => r.day === day);

//         return {
//           day,
//           isReserve: reserve ? reserve.isReserved : false,
//           // isBlocked: reserve ? reserve.isBlocked : false,
//         };
//       });

//       calendarData.push({
//         campId: camps[i].id,
//         name: camps[i].name,
//         calendar,
//       });
//     }

//     await this.cache.set(
//       `reservation-calendar-${year}-${month}`,
//       calendarData,
//       { ttl: 60 },
//     );

//     return calendarData;
//   }

//   async reserve(
//     campId: number,
//     year: number,
//     month: number,
//     day: number,
//   ): Promise<boolean> {
//     const reservation = await this.reservationCalendarRepository.findOne({
//       where: {
//         year,
//         month,
//         day,
//         campId,
//       },
//     });

//     if (!reservation) {
//       throw new Error('Reservation not found');
//     }

//     if (reservation.isReserve || reservation.isBlocked) {
//       return false;
//     }

//     reservation.isReserve = true;
//     await this.reservationCalendarRepository.save(reservation);

//     const today = new Date();
//     const currentYear = today.getFullYear();
//     const currentMonth = today.getMonth() + 1;

//     if (year > currentYear || (year === currentYear && month >= currentMonth)) {
//       await this.invalidateCache(year, month);
//     }

//     return true;
//   }
// }
