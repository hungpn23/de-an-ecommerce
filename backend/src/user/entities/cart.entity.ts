import {
  Entity,
  OneToOne,
  PrimaryColumn,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

export interface ICart {
  [itemId: string]: {
    [size: string]: number;
  };
}

@Entity()
export class Cart {
  @PrimaryColumn() // Sử dụng PrimaryColumn để id giống với id của User
  id: number;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn() // Tạo liên kết với bảng User
  user: User;

  @Column('json', { nullable: true })
  items: ICart;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
