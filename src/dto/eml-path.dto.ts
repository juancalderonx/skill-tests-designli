import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EmlPathDto {
  @ApiProperty({
    name: 'emlPath',
    description: 'Path to eml file',
    examples: [
      'C://Users//developer//the-real-challenge//src//sample-mails//eml-with-json.eml',
      'C://Users//developer//the-real-challenge//src//sample-mails//eml-without-json.eml',
      'C://Users//developer//the-real-challenge//src//sample-mails//eml-with-text-json.eml',
    ],
  })
  @IsString()
  emlPath: string;
}
