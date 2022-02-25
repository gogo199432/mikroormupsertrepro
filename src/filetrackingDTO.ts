import { BaseDTO } from './baseDTO';
import { RoomDTO } from './roomDTO';
import { BookingDTO } from './booking/bookingDTO';
import { GuestDTO } from './guestDTO';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class FileTrackingDTO extends BaseDTO {
  
  @ApiProperty()
  minioName: string;
  
  @ApiProperty()
  orgID: string;

  @ApiProperty()
  friendlyName: string;

  @ApiPropertyOptional()
  bookings: BookingDTO[];

  @ApiPropertyOptional()
  guests: GuestDTO[];

  @ApiPropertyOptional()
  rooms: RoomDTO[];
}