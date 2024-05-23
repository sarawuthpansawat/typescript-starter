import { Module } from '@nestjs/common';
import { ProfileController } from './controllers/profile/profile.controller';
import { ProfileService } from './services/profile/profile.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Profile } from 'src/typeorm';
@Module({
  imports: [],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
