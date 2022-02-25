import { Booking } from './booking/booking.entity';
import { Collection, Entity, ManyToMany, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { BaseEntity } from './baseEntity';
import { FileTracking } from './filetracking.entity';

@Entity()
export class Guest extends BaseEntity{
  @PrimaryKey()
  id: number;

  @ManyToMany(()=>FileTracking,undefined,{nullable: true})
  files = new Collection<FileTracking>(this);

  @Property({ type: 'string' })
  firstName: string;

  @Property({ type: 'string' })
  lastName: string;

  @Property({ type: 'string', nullable: true })
  phone: string;

  @Property({ type: 'string', nullable: true })
  email: string;

  @Property({ type: 'string', length: 2000, nullable: true })
  description: string;

  @Property({ type: 'string', nullable: true })
  currentAddress: string;

  @Property({ type: 'string', nullable: true })
  placeOfBirth: string;

  @Property({ type: 'string', nullable: true })
  timeOfBirth: string;

  @Property({ type: 'string', nullable: true })
  personalID: string;

  @Property({ type: 'string', nullable: true })
  bankNumber: string;

  @Property({ type: 'string', nullable: true})
  mainLanguage: string;

  @OneToMany(()=>Booking, (b:Booking) => b.guest)
  bookings = new Collection<Booking>(this);
}
