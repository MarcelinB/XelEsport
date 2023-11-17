import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PreferenceLeagueController } from 'src/preferenceleague/preferenceleague.controller';
import { PreferenceLeague } from 'src/preferenceleague/preferenceleague.entity';
import { PreferenceLeagueService } from 'src/preferenceleague/preferenceleague.service';


@Module({
  imports: [TypeOrmModule.forFeature([PreferenceLeague])],
  providers: [PreferenceLeagueService],
  controllers: [PreferenceLeagueController],
})
export class PreferenceLeagueModule {}
