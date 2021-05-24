import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TokenModel {
  constructor(intialData: Partial<TokenModel> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }
  @Field({ nullable: true })
  name: string;
  @Field()
  token: string;
}
