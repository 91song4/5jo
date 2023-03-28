import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Camp } from './camp.entity';

@Injectable()
export class CampRepository extends Repository<Camp> {
  constructor(private dataSource: DataSource) {
    super(Camp, dataSource.createEntityManager());
  }
  getCamps() {
    const camps = this.createQueryBuilder('camps').where(
      'camp.deletedAt = :null',
    );
    return camps;
  }

  getCampById(id: number) {
    const camp = this.createQueryBuilder('camp').where('camp.id = :id', {
      id: id,
    });
    return camp;
  }

  createCamp(name: string, type: number, headcount: number, price: number) {
    const camp = this.createQueryBuilder('camp');
    return camp;
  }

  updateCamp(
    id: number,
    name: string,
    type: number,
    headcount: number,
    price: number,
    isRepair: boolean,
    repairEndDate: string | null,
  ) {
    const camp = this.createQueryBuilder('camp').where('camp.id = :id', {
      id: id,
    });
    return camp;
  }

  async deleteCamp(id: number) {
    const camp = this.createQueryBuilder('camp').where('camp.id = :id', {
      id: id,
    });
    return camp;
  }
}
