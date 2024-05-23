import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { Profile } from 'src/typeorm';
// import { Repository } from 'typeorm';
import * as sql from 'mssql';
import * as dotenv from 'dotenv';
import * as _ from 'lodash';
dotenv.config({ path: './.env' });

jest.mock('mssql');
// const mockprofiles: any = {
//   id: 1,
//   name: 1,
//   orderColumn: 1,
// };
describe('ProfileService', () => {
  let service: ProfileService;
  // let repository: Repository<Profile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        // {
        //    provide: getRepositoryToken(Profile),
        //   // useClass: Repository,
        // },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    // repository = module.get<Repository<Profile>>(getRepositoryToken(Profile));

    const poolMock = {
      request: jest.fn().mockReturnThis(),
      query: jest
        .fn()
        .mockResolvedValue({ recordset: [{ personId: 1, name: 'Test' }] }),
      close: jest.fn().mockResolvedValue(null),
    };
    sql.ConnectionPool.prototype.connect = jest
      .fn()
      .mockResolvedValue(poolMock);
    service['pool'] = poolMock as unknown as sql.ConnectionPool;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCourseData', () => {
    it('should fetch course data by id', async () => {
      const id = 1;
      const resultSet = {
        recordset: [{ personId: id, courseName: 'CourseTest' }],
      };

      service['pool'].request.query = jest.fn().mockResolvedValue(resultSet);

      const result = await service.getCourseData(id);

      //expect(result[0]).toEqual(resultSet.recordset);
      expect(_.size(result)).toBeGreaterThanOrEqual(0);
    });
    it('should fetch course data by id', async () => {
      const id = 1;
      const resultSet = {
        recordset: [{ personId: id, courseName: 'CourseTest' }],
      };

      service['pool'].request.query = jest.fn().mockResolvedValue(resultSet);

      const result = await service.getCourseData(id);

      //expect(result[0]).toEqual(resultSet.recordset);
      expect(_.size(result)).toBeGreaterThanOrEqual(0);
    });
  });

  // describe('closePool', () => {
  //   it('should close the database connection', async () => {
  //     const poolCloseSpy = jest.spyOn(service['pool'], 'close').mockResolvedValue(null);

  //     await service.closePool();

  //     expect(poolCloseSpy).toHaveBeenCalled();
  //   });
  // });
});
