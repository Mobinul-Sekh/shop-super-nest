import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';

@Module({
  providers: [VariantService]
})
export class VariantModule {}
