import { BaseDTO } from './baseDTO';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FileTrackingDTO } from './filetrackingDTO';
import { BookingDTO } from './booking/bookingDTO';

export class GuestDTO extends BaseDTO {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional({ type: [FileTrackingDTO] })
  files: FileTrackingDTO[];

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiPropertyOptional()
  phone: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional()
  currentAddress: string;

  @ApiPropertyOptional()
  placeOfBirth: string;

  @ApiPropertyOptional()
  timeOfBirth: string;

  @ApiPropertyOptional()
  personalID: string;

  @ApiPropertyOptional()
  bankNumber: string;

  @ApiPropertyOptional()
  mainLanguage: string;

  @ApiPropertyOptional({ type: [BookingDTO] })
  bookings: BookingDTO[];
}