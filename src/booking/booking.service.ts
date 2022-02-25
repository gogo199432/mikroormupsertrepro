import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { Booking } from './booking.entity';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: EntityRepository<Booking>
  ) {}

  async findAll(complete: boolean, orgID): Promise<Booking[]> {
    if (complete) {
      const bookings = await this.bookingRepository.find(
        {
       orgID,
        },
        {
          populate: ['guest', 'room', 'files'],
        },
      );
      return bookings
    } else {
      return await this.bookingRepository.find({ orgID });
    }
  }

  async update(booking: any): Promise<Booking> {
    const loaded = await this.bookingRepository.findOne(
      { id: booking.id, orgID: booking.orgID },
      { populate: ['guest', 'room', 'files'] },
    );
    if (loaded) {
      wrap(loaded).assign(booking)
      await this.bookingRepository.flush();
      return loaded;
    } else {
      this.logger.warn(
        'Could not upgrade booking, it was null with id: ' + booking.id,
      );
      throw new NotFoundException();
    }
  }
}
