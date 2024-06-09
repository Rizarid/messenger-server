import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Request, Response } from 'express';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query('getUserById')
  async getUserById(@Args('id') id: number) {
    console.log('resolver id', id);
    return await this.userService.getUserById(id);
  }

  @Mutation('registration')
  async registrationUser(
    @Args('mobile_number') mobile_number: string,
    @Args('password') password: string,
  ) {
    const user = await this.userService.registration(mobile_number, password);

    return user;
  }

  @Mutation('authenticate')
  async authenticateUser(
    @Args('mobile_number') mobile_number: string,
    @Args('password') password: string,
    @Context('res') res: Response,
  ) {
    const { user, refreshToken, accessToken } =
      await this.userService.authenticate(mobile_number, password);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
    });

    res.header('Authorization', accessToken);

    return user;
  }

  @Mutation('refreshAccessToken')
  async refreshAccessToken(
    @Context('req') req: Request,
    @Context('res') res: Response,
  ) {
    const refreshToken = req.headers.cookie.split(' ')[1].split('=')[1];
    const tokenData = await this.userService.checkToken(refreshToken);

    const newAccessToken = this.userService.genToken(
      tokenData.mobile_number,
      tokenData.id,
      '20m',
    );

    res.header('Authorization', newAccessToken);
    return;
  }
}
