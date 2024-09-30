import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { password, confirmPassword } = signUpDto;
    const hashPassword = await this.hashPassword(signUpDto.password);

    if (password !== confirmPassword)
      throw new BadRequestException(`Confirm password does not match`);

    return await this.userRepo.save({
      ...signUpDto,
      password: hashPassword,
    });
  }

  async login(loginDto: LoginDto) {
    const { id, email, password, access_token } = await this.userRepo.findOne({
      where: { email: loginDto.email },
    });

    if (!id)
      throw new UnauthorizedException(`User ${loginDto.email} not found`);

    const isMatch = bcrypt.compareSync(loginDto.password, password);

    if (!isMatch) throw new UnauthorizedException(`Invalid credentials`);

    if (!access_token) {
      const accessToken = await this.generateToken({ id, email });
      const { affected } = await this.userRepo.update(
        { email },
        { access_token: accessToken },
      );

      if (!affected)
        throw new InternalServerErrorException(`Internal server error`);

      return { access_token: accessToken };
    }

    return { access_token };
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  private async generateToken(payload: IJwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
