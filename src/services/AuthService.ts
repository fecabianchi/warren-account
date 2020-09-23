import * as jsonwebtoken from 'jsonwebtoken';
import UnauthorizedException from '../exceptions/UnauthorizedException';
import { IUser } from '../interfaces/IUser';
import UserRepository from '../repositories/UserRepository';

export default class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async authenticate(data: IUser) {
    const user = await this.userRepository.findOne(data.email);
    const isMatch = await user.comparePassword(data.password);

    if (user && isMatch) {
      const token = jsonwebtoken.sign({ userId: user._id }, process.env.JWT_SECRET);
      return { token }
    }

    throw new UnauthorizedException();
  }
}
