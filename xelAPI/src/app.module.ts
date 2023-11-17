import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GameModule } from './game/game.module';
import { LeagueModule } from './league/league.module';
import { TeamModule } from './team/team.module';
import { PreferenceGameModule } from './preferencegame/preferencegame.module';
import { PreferenceTeamModule } from './preferenceteam/preferenceteam.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './decorators/roles.guard';
import { MatchModule } from './lolMatches/lolMatches.module';
import * as dotenv from 'dotenv';
import { PreferenceLeagueModule } from './preferenceleague/preferenceleague.module';

dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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

