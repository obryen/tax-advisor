import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query(() => String, {
    nullable: false,
    description: 'App info.',
  })
  async appInfo(): Promise<string> {
    return 'heyday tech challenge starter';
  }
}
