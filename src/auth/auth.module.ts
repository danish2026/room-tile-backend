import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy.js';
import { AuthGuard } from './auth/auth.guard.js';

@Module({
  imports: [PassportModule],
  providers: [JwtStrategy, AuthGuard],
  exports: [PassportModule, AuthGuard],
})
export class AuthModule {}