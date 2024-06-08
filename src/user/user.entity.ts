import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mobile_number: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  tag_name?: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  info: string;
}
