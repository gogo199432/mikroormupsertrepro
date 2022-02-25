import { BaseDTO } from '../baseDTO';
import { GuestDTO } from '../guestDTO';
import { RoomDTO } from '../roomDTO';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { FileTrackingDTO } from '../filetrackingDTO';

export class BookingDTO extends BaseDTO {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional({type:[FileTrackingDTO]})
  files: FileTrackingDTO[];

  @ApiProperty()
  guest!: GuestDTO;

  @ApiProperty()
  room!: RoomDTO;

  @ApiProperty()
  start: string;

  @ApiProperty()
  end: string;

  @ApiPropertyOptional()
  bookingDate: Date;

  @ApiPropertyOptional()
  personAmount: number;

  @ApiPropertyOptional()
  children: number;

  @ApiPropertyOptional()
  description: string;

  @ApiPropertyOptional()
  priceTotal: number;

  @ApiPropertyOptional()
  moneyPaidToDate: number;

  @ApiPropertyOptional()
  currency: string;

  @ApiPropertyOptional()
  source: string;

  @ApiPropertyOptional()
  uid: string;
}