import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferenceTeamController } from 'src/controllers/preferenceteam.controller';
import { PreferenceTeam } from 'src/entity/preferenceteam.entity';
import { User } from 'src/entity/user.entity';
import { PreferenceTeamService } from 'src/services/preferenceteam.service';
import { UserService } from 'src/services/user.service';


@Module({
  imports: [TypeOrmModule.forFeature([PreferenceTeam, User])],
  providers: [PreferenceTeamService, UserService],
  controllers: [PreferenceTeamController],
})
export class PreferenceTeamModule {}
