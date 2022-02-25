import {
  Controller,
  Get,
  Body,
  Param,
  Logger,
  Patch,
  HttpException, HttpStatus, NotFoundException, BadRequestException,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDTO } from './bookingDTO';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  private readonly logger= new Logger(BookingController.name)


  @Get('/complete/:orgID')
  async getAllBookingComplete(@Param('orgID') orgID): Promise<string[]> {
    try {
      const bookings =  await this.bookingService.findAll(true, orgID);
      return bookings.map(x => JSON.stringify(x))
    }catch (e) {
      this.logger.error(e.message, e)
      throw new BadRequestException(null,e.message);
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() booking: BookingDTO) {
    try{
      booking.id = Number(id);
      
      return await this.bookingService.update(booking);
    }catch (e) {
      this.logger.error(e.message,e)
      if(e instanceof NotFoundException){
        throw e;
      }
      throw new HttpException(e.message,HttpStatus.NOT_FOUND);
    }
  }
}
