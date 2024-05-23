import { Controller, Get } from '@nestjs/common';

@Controller('env')
export class EnvController {
  @Get()
  getEnv() {
    return process.env;
  }
}
