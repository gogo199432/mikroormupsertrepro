import { Booking } from './booking/booking.entity';
import { Collection, Entity, ManyToMany, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { FileTracking } from './filetracking.entity';
import { BaseEntity } from './baseEntity';

@Entity()
export class Room extends BaseEntity{

    @PrimaryKey()
    id: number;

    @ManyToMany(()=>FileTracking,undefined,{nullable: true})
    files = new Collection<FileTracking>(this,undefined, true);

    @Property({ default: '', type: 'string' })
    name: string;

    @Property({ default: 'primary', type: 'string' })
    color: string;

    @Property({ nullable:true, type: 'string', length:2000 })
    description: string;

    @OneToMany(()=>Booking, (b: Booking) => b.room)
    bookings = new Collection<Booking>(this)
}