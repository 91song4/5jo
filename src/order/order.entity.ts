import { ApiProperty } from '@nestjs/swagger';
import { Camp } from '../camp/camp.entity';
import { Review } from '../review/review.entity';
import { User } from '../users/users.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'glamping', name: 'Orders' })
export class Order {
  @ApiProperty({ example: 1, description: '주문 Primary Key' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 1, description: '주문한 유저의 Primary Key' })
  @Column({ default: 0 })
  userId: number;

  @ApiProperty({ example: 1, description: '주문한 캠프의 Primary Key' })
  @Column({ default: 0 })
  campId: number;

  @ApiProperty({ example: '2023-01-01', description: '선택한 날짜' })
  @Column()
  selectedDay: Date;

  @ApiProperty({ example: 4, description: '총 인원' })
  @Column()
  headcount: number;

  @ApiProperty({ example: 50000, description: '총 가격' })
  @Column()
  receipt: number;

  @ApiProperty({
    example: false,
    description: '해당 주문에 대한 리뷰가 작성되었는가?',
  })
  @Column({ default: false })
  isReview: boolean;

  @ApiProperty({ example: 0, description: '0:카드결제 / 1:무통장입금' })
  @Column()
  type: number;

  @Column('varchar', { length: 20 })
  emergencyContact: string | null;

  @Column('varchar', { length: 60 })
  requirements: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @ManyToOne(() => User, (user) => user.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Camp, (camp) => camp.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'campId' })
  camp: Camp;

  @OneToOne(() => Review, (reviews) => reviews.orders)
  reviews: Review;
}
