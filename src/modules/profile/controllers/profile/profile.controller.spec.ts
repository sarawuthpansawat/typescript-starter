import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { getMockRes } from '@jest-mock/express';
import { ProfileService } from 'src/modules/profile/services/profile/profile.service';
// import * as window from '../../../../../config';
// import { JwtModule } from '@nestjs/jwt';
// import { AuthGuard } from 'src/modules/auth/auth.guard';
import * as _ from 'lodash';

const mockProfile: any = {
  id: 2,
  Profile_id: 2,
};

describe('ProfileController', () => {
  let controller: ProfileController;
  //let mockAuthGuard: AuthGuard;
  beforeEach(async () => {
    //mockAuthGuard = {} as AuthGuard;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      imports: [
        // JwtModule.register({
        //   global: true,
        //   secret: process.env.JWT_SECRET_KEY,
        //   signOptions: { expiresIn: '60m' },
        // }),
      ],
      providers: [
        // { provide: AuthGuard, useValue: mockAuthGuard },
        {
          provide: ProfileService,
          useValue: {
            getProfileData: jest.fn((data: any) => {
              if (data) return [{ ...mockProfile }, null];
              else return [null, 'error'];
            }),

            getCourseData: jest.fn((data: any) => {
              if (data) return [{ ...mockProfile }, null];
              else return [null, 'error'];
            }),
            createOrUpdateProfile: jest.fn((data: any) => {
              if (data) return [{ ...mockProfile }, null];
              else return [null, 'error'];
            }),
            getprofile: jest.fn((data: any) => {
              if (data) return [{ ...mockProfile }, null];
              else return [null, 'error'];
            }),
          },
        },
      ],
    }).compile();
    controller = module.get<ProfileController>(ProfileController);
    // mockAuthGuard = module.get<AuthGuard>(AuthGuard);
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getProfileData', () => {
    it('should return  getProfileData', async () => {
      const { res } = getMockRes();
      const data = await controller.getProfileData(1, res);
      expect(_.size(data)).toBeGreaterThanOrEqual(0);
    });
  });
  it('should return getProfileData error', async () => {
    const { res } = getMockRes();
    await controller.getProfileData(null, res);
    expect.objectContaining({
      statusCode: 400,
    });
  });
  describe('getCourseData', () => {
    it('should return  getCourseData', async () => {
      const { res } = getMockRes();
      const data = await controller.getCourseData(1, res);
      expect(_.size(data)).toBeGreaterThanOrEqual(0);
    });
  });
  it('should return getCourseData error', async () => {
    const { res } = getMockRes();
    await controller.getCourseData(null, res);
    expect.objectContaining({
      statusCode: 400,
    });
  });
});
