import * as Joi from 'joi';

export interface IAddressQueryDTO {
  street?: string;
  streetNumber?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  lon?: string;
  lat?: string;
}

export const validateIAddressQueryDTOchema = Joi.object({
  street: Joi.string().min(3).max(25),
  streetNumber: Joi.string().min(3).max(25),
  city: Joi.string().min(1).max(25),
  postalCode: Joi.string().min(3).max(25),
  country: Joi.string().min(3).max(25),
  lon: Joi.string().min(3).max(25),
  lat: Joi.string().min(3).max(25),
});
