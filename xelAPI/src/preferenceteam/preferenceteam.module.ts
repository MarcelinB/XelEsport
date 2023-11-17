import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferenceTeamController } from 'src/preferenceteam/preferenceteam.controller';
import { PreferenceTeam } from 'src/preferenceteam/preferenceteam.entity';
import { User } from 'src/user/user.entity';
import { PreferenceTeamService } from 'src/preferenceteam/preferenceteam.service';
import { UserService } from 'src/user/user.service';


@Module({
  imports: [TypeOrmModule.forFeature([PreferenceTeam, User])],
  providers: [PreferenceTeamService, UserService],
  controllers: [PreferenceTeamController],
})
export class PreferenceTeamModule {}
