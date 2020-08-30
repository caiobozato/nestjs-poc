import * as mongoose from 'mongoose';
import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export class Product extends mongoose.Document {
  @ApiResponseProperty()
  readonly id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;
}
