import { IAddressValidated } from './../../domain/addressValidated.entity';
import { Schema } from 'mongoose';

const addressSchema = new Schema<IAddressValidated>({
  addressCoordinates: {
    street: {
      type: String,
      required: false,
    },

    streetNumber: {
      type: String,
      required: false,
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
  },
});

export default addressSchema;
