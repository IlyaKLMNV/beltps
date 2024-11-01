import UserModel from '../models/user-model.js'
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import MailService from './mail-service.js';
import TokenService from './token-service.js';
import UserDto from '../dtos/user-dto.js';
import ApiError from '../exception/api-error.js';
import tokenService from './token-service.js';

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({email})
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
    }
    const hashPassword = await bcryptjs.hash(password, 3);
    const activationLink = uuidv4();
    const user = await UserModel.create({email, password: hashPassword, activationLink});
    await MailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({...userDto});
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {...tokens, user: userDto}
    }
    async activate(activationLink) {
      const user = await UserModel.findOne({activationLink})
      if (!user) {
        throw ApiError.BadRequest('Некорректная сслыка активации')
      }
      user.isActivated = true;
      await user.save();
  }
  async login(email, password) {
    const user = await UserModel.findOne({email})
    if (!user) {
      throw ApiError.BadRequest('Пользователь с таким email не найден')
    }
    const isPassEquals = await bcryptjs.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Неверный пароль');
    }
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({...userDto});

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizesError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({...userDto});

    await TokenService.saveToken(userDto.id, tokens.refreshToken);
    return {...tokens, user: userDto}
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

export default new UserService();