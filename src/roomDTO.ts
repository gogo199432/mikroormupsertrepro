import { BookingDTO } from './booking/bookingDTO';
import { BaseDTO } from './baseDTO';
import { FileTrackingDTO } from './filetrackingDTO';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoomDTO extends BaseDTO {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional({ type: [FileTrackingDTO] })
  files: FileTrackingDTO[];

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  color: string;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional({ type: [BookingDTO] })
  bookings: BookingDTO[];
}