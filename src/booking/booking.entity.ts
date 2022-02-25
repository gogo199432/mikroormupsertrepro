import { Guest } from '../guest.entity';
import { Room } from '../room.entity';
import { Cascade, Collection, Entity, ManyToMany, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { FileTracking } from '../filetracking.entity';
import { BaseEntity } from '../baseEntity';

@Entity()
export class Booking extends BaseEntity {
  @PrimaryKey()
  id: number;

  @ManyToMany(() => FileTracking, undefined, {
    nullable: true,
    owner: true,
  })
  files = new Collection<FileTracking>(this);

  @ManyToOne({ cascade: [Cascade.ALL] })
  guest!: Guest;

  @ManyToOne({ cascade: [Cascade.ALL] })
  room!: Room;

  @Property({ type: Date })
  start: string;

  @Property({ type: Date })
  end: string;

  @Property({ type: Date, nullable: true })
  bookingDate: Date;

  @Property({ default: 1, type: 'number' })
  personAmount: number;

  @Property({ nullable: true, type: 'number' })
  children: number;

  @Property({ nullable: true, type: 'string', length: 2000 })
  description: string;

  @Property({ columnType: 'decimal(18,8)', nullable: true })
  priceTotal: number;

  @Property({ columnType: 'decimal(18,8)', nullable: true })
  moneyPaidToDate: number;

  @Property({ type: 'string', length: 10, default: 'HUF' })
  currency: string;

  @Property({ type: 'string', default: 'manual' })
  source: string;

  // For calendar sync-ing we need a common field to check against
  @Property({ type: 'string' })
  uid: string;
}
