import { IAddressCoordinates } from '../../domain/addressCoordinates.entity';
import { Schema } from 'mongoose';

const addressSchema = new Schema<IAddressCoordinates>({
  lon: {
    type: String,
    reqired: false,
  },
  lat: {
    type: String,
    reqired: false,
  },
});

export default addressSchema;
