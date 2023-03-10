import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../global-services/prisma.service';
import { CloudsModule } from '../clouds/clouds.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    forwardRef(() => CloudsModule),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET123',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
