import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export abstract class BaseDTO {
  @ApiProperty()
  orgID: string;
  @ApiPropertyOptional()
  createDate = new Date();
  @ApiPropertyOptional()
  updateDate = new Date();
  @ApiPropertyOptional()
  createdBy: string;
}