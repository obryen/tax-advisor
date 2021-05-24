import { ObjectType, Field } from '@nestjs/graphql';
import { Vouchers } from './vouchers';

@ObjectType()
export class PatnerRevenueModel {
  constructor(intialData: Partial<PatnerRevenueModel> = null) {
    if (intialData !== null) {
      Object.assign(this, intialData);
    }
  }
  @Field()
  patnerName: string;
  @Field()
  revenue: number;
}
