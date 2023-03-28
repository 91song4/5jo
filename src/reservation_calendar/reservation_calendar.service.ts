import {
  Injectable,
  CACHE_MANAGER,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// 엔티티
import { ReservationCalendar } from './reservation_calendar.entity';

// 캐시 매니저 ( redis )
import { Cache } from 'cache-manager';
import moment from 'moment-timezone';

@Injectable()
export class ReservationCalendarService {
  constructor(
    @InjectRepository(ReservationCalendar)
    private readonly reservationCalendarRepository: Repository<ReservationCalendar>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // reservationCalendar 값 추가 ( POST )
  async createReserve(
    campId: number,
    reservedDate: string,
    isReserve: boolean,
  ) {
    const reserve = await this.reservationCalendarRepository.insert([
      { camp: { id: campId }, reservedDate, isReserved: isReserve },
    ]);

    return reserve;
  }

  // 해당 날짜의 예약 캘린더를 가져옴
  async getReservationCalendar(date: Date) {
    /*
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
    */
    const reservationCalendar = await this.reservationCalendarRepository.find({
      where: {
        reservedDate: date,
      },
    });

    // 예약 캘린더 반환
    return reservationCalendar;
  }

  /*
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
  */

  // 해당 날짜에 사용중인 캠프정보를 가져옴
  async getAvailableCamps(date: Date) {
    // moment로 한국시간 가져오기
    const koreanDate = moment(date).tz('Asia/Seoul').format('YYYY-MM-DD');
    // 예약 캘린더를 가져오고 매개변수로 받은 날짜를 Date 객체로 변환하여 전달
    console.log('매개변수로 받은 날짜 : ', koreanDate);
    const reservationCalendar = await this.getReservationCalendar(
      new Date(koreanDate),
    );
    if (!reservationCalendar) {
      return [];
    }
    const campIds = reservationCalendar.map((res) => res.campId);
    console.log('선택한 날짜에 이미 예약되어 있는 캠프ID : ', campIds);
    return campIds;
  }

  // 해당 날짜에 예약된 예약 수를 가져옴
  async getExistingReservations(date: Date) {
    // 예약 날짜가 인자로 받은 날짜와 같은 예약 수를 찾아서 리턴
    const reservationCount = await this.reservationCalendarRepository.count({
      where: {
        reservedDate: new Date(
          moment(date).tz('Asia/Seoul').format('YYYY-MM-DD'),
        ),
      },
    });
    return reservationCount;
  }

  // 선택한 날짜가 예약 가능한지를 확인하는 함수
  async isReservationPossible(date: Date) {
    // 해당 날짜에 예약 가능한 캠핑장 목록을 가져옴.
    const availableCamps = await this.getAvailableCamps(date);
    console.log('예약되어 있는 캠프 수 : ', availableCamps.length);

    // 해당 날짜에 이미 예약된 캠핑장 목록을 가져옴.
    const existingReservations = await this.getExistingReservations(date);
    const totalCamps = 14;
    // 남은 캠핑장 수를 계산
    const remainingCampsites = totalCamps - existingReservations;
    console.log('사용 가능한 캠프 : ', remainingCampsites);
    // 사용중인 캠핑장이 전체 캠핑장 수 이상이거나 사용 가능한 캠핑장이 0개 이하일 때
    // 사실상 같은 조건이지만 두 번 검증으로 더 안전해질 듯
    const returned =
      availableCamps.length >= totalCamps && remainingCampsites <= 0;
    console.log('여기에는 어떤 형태로 담기는지 확인 : ', returned);
    if (returned === true) {
      throw new BadRequestException(
        '이미 예약이 모두 완료된 날짜입니다. 다시 선택해주세요',
      );
    }
    return { availableCamps, returned };
  }

  // 선택한 날이 오늘을 기준으로 이미 지나간 날짜라면?
  async checkAvailability(date: Date) {
    // moment 라이브러리 문법. 이전이면? true 아니면? false
    const isPastDate = moment(date).isBefore(moment().format('YYYY-MM-DD'));
    const isMoreThan6Months = moment(date).isAfter(
      moment().add(6, 'months').format('YYYY-MM-DD'),
    );

    // 만약 선택한 날이 이미 지난 날짜라면
    if (isPastDate) {
      throw new BadRequestException(
        '이미 지난 예약일입니다. 다시 선택해주세요',
      );
    }

    // 만약 오늘로부터 6개월을 초과해서 예약을 시도할 경우
    if (isMoreThan6Months) {
      throw new BadRequestException(
        '최대 예약일은 현재로부터 6개월입니다. 다시 선택해주세요',
      );
    }
    const isAvailable = await this.isReservationPossible(date);
    return { date: isAvailable };
  }
}
