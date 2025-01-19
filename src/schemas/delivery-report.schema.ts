import { Prop, Schema } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export enum DeliveryStatusEnum {
  Initiated = 'initiated',
  Packed = 'packed',
  Shipped = 'shipped',
  OutForDelivery = 'out_for_delivery',
  Delivered = 'delivered',
  OnTheWay = 'on_the_way',
  Cancelled = 'cancelled',
  Delayed = 'delayed'
}

export type DeliveryReportDocument = HydratedDocument<DeliveryReport>

@Schema()
export class DeliveryReport {
  @Prop({required: true, unique: true})
  id: string;
  
  @Prop({required: true})
  deliveryDate: Date;
  
  @Prop({required: true})
  currentLoc: string;
  
  @Prop({required: true})
  serviceProvider: string;
  
  @Prop({
    required: true,
    enum: DeliveryStatusEnum,
    default: DeliveryStatusEnum.Initiated
  })
  status: DeliveryStatusEnum;

  @Prop({required: true})
  certId: string;
}