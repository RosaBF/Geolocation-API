import { Schema } from 'mongoose';
import { IAddressDTO } from '../../dto';

const addressSchema = new Schema<IAddressDTO>({
  street: {
    type: String,
    required: false,
  },

  streetName: {
    type: String,
    reqired: false,
  },

  city: {
    type: String,
    reqired: false,
  },

  postalCode: {
    type: String,
    reqired: false,
  },

  country: {
    type: String,
    reqired: false,
  },
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
