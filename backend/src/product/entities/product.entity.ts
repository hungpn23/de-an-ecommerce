import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImage } from './product-image.entity';
import { Category } from './category.entity';
import { Size } from './size.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  price: number;

  @Column({ default: false })
  is_best_seller: boolean;

  @Column()
  quantity: number;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @OneToMany(() => ProductImage, (image: ProductImage) => image.product, {
    cascade: true,
  })
  images: ProductImage[];

  @ManyToMany(() => Category, { cascade: true })
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Size, { cascade: true })
  @JoinTable()
  sizes: Size[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
