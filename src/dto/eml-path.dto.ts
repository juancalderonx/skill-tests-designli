import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EmlPathDto {
  @ApiProperty({
    name: 'emlPath',
    description: 'Path to eml file',
    example:
      'C://Users//developer//Documents//Projects//the-real-challenge//src//sample-mails//eml-with-json.eml',
  })
  @IsString()
  emlPath: string;
}
