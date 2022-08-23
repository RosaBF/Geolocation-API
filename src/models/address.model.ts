import { IAddressValidated } from './../modules/validateAddressIsReal/domain/addressValidated.entity';
import { model, Document } from 'mongoose';
import addressSchema from '../modules/validateAddressIsReal/do/schemas/address.schema';

export interface IAddressValidatedDO extends IAddressValidated, Document {}

const addressModel = model<IAddressValidated>('Address', addressSchema);

export default addressModel;
