import { Query, Resolver } from '@nestjs/graphql';
import { PatnerService } from '../services/patner.service';
import { PatnerRevenueModel } from '../models/partners-revenue';

@Resolver()
export class PatnerRevenueResolver {
  constructor(private readonly patnerService: PatnerService) {}

  @Query(() => [PatnerRevenueModel], {
    name: 'revenue_per_partner',
    nullable: true,
  })
  getRevenuePerPatner(): PatnerRevenueModel[] {
    return this.patnerService.revenuePerPatner();
  }
}
