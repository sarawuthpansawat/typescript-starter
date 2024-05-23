import { Controller, Get, Param, Res, HttpStatus } from '@nestjs/common';
import { ProfileService } from 'src/modules/profile/services/profile/profile.service';
import * as GS from 'src/global/global.service';
// import { Response } from 'express';

import * as _ from 'lodash';
// import { AuthGuard } from 'src/modules/auth/auth.guard';

// @UseGuards(AuthGuard)
@Controller('api-profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':id')
  async getProfileData(@Param('id') id: number, @Res() res) {
    const [resp, err] = await this.profileService.getProfileData(id);
    if (_.size(err)) {
      console.log('if');
      res.status(HttpStatus.BAD_REQUEST).json(GS.ErrorResponse(err));
    } else {
      console.log('else', res.headersSent);
      res.status(HttpStatus.OK).json(GS.SuccessResponse(resp));
    }
  }
  @Get('course/:id')
  async getCourseData(@Param('id') id: number, @Res() res) {
    const [resp, err] = await this.profileService.getCourseData(id);
    if (_.size(err)) {
      res.status(HttpStatus.BAD_REQUEST).json(GS.ErrorResponse(err));
    } else {
      res.status(HttpStatus.OK).json(GS.SuccessResponse(resp));
    }
  }
}
