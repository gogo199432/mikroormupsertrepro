import { BaseEntity } from './baseEntity';
import { Collection, Entity, ManyToMany, PrimaryKey, PrimaryKeyType, Property } from '@mikro-orm/core';
import { Booking } from './booking/booking.entity';
import { Guest } from './guest.entity';
import { Room } from './room.entity';

@Entity()
export class FileTracking extends BaseEntity{
  @PrimaryKey()
  minioName:string

  @PrimaryKey()
  orgID: string

  @Property({ type: 'varchar', nullable: true })
  friendlyName: string

  @ManyToMany(() => Booking, booking => booking.files)
  bookings = new Collection<Booking>(this);

  @ManyToMany(() => Guest, guest => guest.files)
  guests = new Collection<Guest>(this);

  @ManyToMany(() => Room, room => room.files)
  rooms = new Collection<Room>(this);

  [PrimaryKeyType]: [string]

  constructor(init?:Partial<FileTracking>) {
    super()
    Object.assign(this, init);
  }
}