import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';

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
  ) {
    const user = await this.userService.authenticate(mobile_number, password);
    return user;
  }
}
