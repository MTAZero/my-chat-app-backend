import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from '../database/database.module';
import { AuthenticationController } from './authentication.controller';
import { AuthHelperService } from './casl/auth-helper.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
    controllers: [AuthenticationController],
    imports: [ DatabaseModule, PassportModule],
    providers: [LocalStrategy, JwtStrategy, AuthHelperService],
    exports: [AuthHelperService]
})
export class AuthenticationModule {}
