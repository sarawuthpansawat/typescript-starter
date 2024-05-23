import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Profile } from 'src/typeorm';
// import { Repository } from 'typeorm';
import * as GS from 'src/global/global.service';
import * as sql from 'mssql';
import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });

@Injectable()
export class ProfileService {
  private pool: sql.ConnectionPool;
  constructor() {
    // private readonly profileRepository: Repository<Profile>, // @InjectRepository(Profile)
    this.initPool();
  }
  private async initPool() {
    try {
      const dbConfig = {
        // user: 'attaporn-amo',
        // password: 'Aamo@4163',
        // server: '172.21.4.19',
        // database: 'CPLI_OPS2',
        user: process.env.USER,
        password: process.env.PASSWORD,
        server: process.env.SERVER,
        database: process.env.DATABASE,
        options: {
          encrypt: false, // for azure
          trustServerCertificate: true, // change to true for local dev / self-signed certs
        },
      };
      this.pool = await new sql.ConnectionPool(dbConfig).connect();

      console.log('Connected to database');
    } catch (err) {
      console.error('Error connecting to database:', err);
      throw err;
    }
  }

  async getProfileData(id: number) {
    // try {
    if (!id) [null, 'test'];
    const sqlQuery2 =
      `SELECT  * FROM [dbo].[vw_Person] WHERE [PersonId] = N'` + id + `'`;
    // console.error('sqlQuery2 executing query:', sqlQuery2);
    const result = await this.pool.request().query(sqlQuery2);
    //return result.recordset;
    const paginate = await GS.paginate(result.recordset, 1, 1);
    return [paginate, null];
    // } catch (err) {
    //   console.error('Error executing query:', err);
    //   throw err;
    // }
  }
  async getCourseData(id: number) {
    // try {
    const sqlQuery2 =
      `SELECT DISTINCT
        a.roundName,
        a.personId,
        a.grade,
        b.PMSRoleName,
        c.PMS_ROLE,
        c.STATUS,
        c.STATUS_ID,
        d.Remark,
        d.ProgramCode,
        e.ProgramName,
        f.CourseName,
        a.roundName
      FROM
        [dbo].[vw_Master_DATA_final_Pond] AS a
        LEFT JOIN [dbo].[EvaPar] AS b ON a.personId = b.personId
        LEFT JOIN [dbo].[vw_Master_DATA_final] AS c ON b.personId = c.personId
        LEFT JOIN [dbo].[vw_FLP_DATA_CurrentStatusID_final] AS d ON c.personId = d.personId 
        LEFT JOIN [dbo].[vw_program] AS e ON d.ProgramCode = e.ProgramCode 
        LEFT JOIN [dbo].[vw_FLP_Master_DATA_MemberwithGrade] AS f ON e.ProgramCode = f.ProgramCode 
      WHERE a.personId = ` +
      id +
      ` ORDER BY a.roundName DESC`;
    //console.error('sqlQuery2 executing query:', sqlQuery2);
    const result = await this.pool.request().query(sqlQuery2);
    //return result.recordset;

    const paginate = await GS.paginate(result.recordset, 30, 1);
    return [paginate, null];
    // } catch (err) {
    //   console.error('Error executing query:', err);
    //   throw err;
    // }
  }

  // async closePool() {
  //   try {
  //     await this.pool.close();
  //     console.log('Database connection closed');
  //   } catch (err) {
  //     console.error('Error closing database connection:', err);
  //   }
  // }
}
