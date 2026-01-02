import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorsModule } from './doctors/doctors.module';
import { PostsModule } from './posts/posts.module';
import { ConsultationsModule } from './consultations/consultations.module';
import { Doctor } from './doctors/entities/doctor.entity';
import { Post } from './posts/entities/post.entity';
import { Consultation } from './consultations/entities/consultation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        entities: [Doctor, Post, Consultation],
        synchronize: false, // 수동으로 DB 스키마 관리
        ssl: {
          rejectUnauthorized: false, // Supabase 연결 시 필요할 수 있음
        },
      }),
    }),
    DoctorsModule,
    PostsModule,
    ConsultationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
