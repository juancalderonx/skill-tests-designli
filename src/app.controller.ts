import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { EmlPathDto } from './dto/eml-path.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import * as mailParser from 'mailparser';

@Controller('app')
@ApiTags('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('email-parser')
  @ApiResponse({
    status: 200,
    description: 'Email parsed successfully but no JSON attachment found.',
  })
  @ApiResponse({
    status: 200,
    description: 'Email parsed successfully and JSON attachment found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error, check logs.',
  })
  @HttpCode(HttpStatus.OK)
  async parseEmailFromFile(
    @Body() emlPathDto: EmlPathDto,
  ): Promise<JSON | mailParser.ParsedMail> {
    return await this.appService.parseEmailFromFile(emlPathDto);
  }
}
