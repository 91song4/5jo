import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ schema: 'glamping', name: 'Users' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  readonly id: number;

  @Index({ unique: true })
  @Column('varchar', { length: 10 })
  readonly userId: string;

  @Column('varchar', { select: false })
  readonly password: string;

  @Index({ unique: true })
  @Column('varchar', { length: 10 })
  readonly name: string;

  @Index({ unique: true })
  @Column('varchar', { length: 15 })
  readonly phone: string;

  @Index({ unique: true })
  @Column('varchar', { length: 30 })
  readonly email: string;

  @Column('date')
  readonly birthDay: Date;

  @CreateDateColumn({ nullable: true })
  readonly createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  readonly updatedAt: Date;

  @DeleteDateColumn({ default: null })
  readonly deletedAt: Date | null;
}
