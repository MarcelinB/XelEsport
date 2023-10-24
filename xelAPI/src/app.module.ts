import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './module/user.module';
import { GameModule } from './module/game.module';
import { LeagueModule } from './module/league.module';
import { TeamModule } from './module/team.module';
import { PreferenceGameModule } from './module/preferencegame.module';
import { PreferenceLeagueModule } from './module/preferenceleague.module';
import { PreferenceTeamModule } from './module/preferenceteam.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './services/user.service';
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './decorators/roles.guard';
import { MatchModule } from './matches/match.module';
import * as dotenv from 'dotenv';

dotenv.config();


@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'xel.cauqocgrsena.eu-north-1.rds.amazonaws.com',
    port: 3306,
    username: 'xel_admin',
    password: process.env.DB_PASSWORD,
    database: 'xel',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
}), UserModule, GameModule, LeagueModule, TeamModule, PreferenceGameModule, PreferenceLeagueModule, PreferenceTeamModule, AuthModule, JwtModule, MatchModule],
  controllers: [AppController],
  providers: [AppService , UserService, 
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },],
})
export class AppModule {}

