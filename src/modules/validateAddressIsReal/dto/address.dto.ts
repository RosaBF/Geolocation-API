import * as Joi from 'joi';

export interface IAddressDTO {
  street: string;
  streetNumber: string;
  city: string;
  postalCode: string;
  country: string;
  lon?: string;
  lat?: string;
}

export const validateIAddressDTOSchema = Joi.object({
  street: Joi.string().min(3).max(25).required(),
  streetNumber: Joi.string().min(1).max(25).required(),
  city: Joi.string().min(1).max(25).required(),
  postalCode: Joi.string().min(3).max(25).required(),
  country: Joi.string().min(3).max(25).required(),
  town: Joi.string().min(3).max(25).required(),
  lon: Joi.string().min(3).max(25),
  lat: Joi.string().min(3).max(25),
});
