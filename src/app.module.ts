import './splash';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CandidateService } from './models/candidate/candidate.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CandidateService],
})
export class AppModule {}
