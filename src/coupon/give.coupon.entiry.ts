import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// 시퀄라이즈의 마이그레이션 파일을 담당

@Entity({ schema: 'glamping', name: 'Users_Coupons_Mapping' })
export class GiveCoupon {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int')
  couponId: number;

  @Column('int')
  userId: number;

  @Column('boolean')
  isUsed: boolean;

  @Column()
  endDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
