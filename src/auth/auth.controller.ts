import {
    Controller,
    Body,
    Post,
    HttpException,
    HttpStatus,
    Get,
    Req,
    UseGuards,
  } from '@nestjs/common';
import {CreateUserDto, LoginUserDto} from "../users/dto/user.dto";
import {RegistrationStatus} from "./interfaces/register-status";
import {AuthService} from "./auth.service";
import {LoginStatus} from "./interfaces/login-status";
import {JwtPayload} from "./interfaces/payload"
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(
      createUserDto,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
    return await this.authService.login(loginUserDto);
  }

  @Get('profile')
  @UseGuards(AuthGuard())
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }
}