import { IAddressCoordinates } from '../modules/validateAddressIsReal/domain/addressCoordinates.entity';
import { model, Document } from 'mongoose';
import addressSchema from '../modules/validateAddressIsReal/do/schemas/address.schema';

export interface IAddressValidatedDO extends IAddressCoordinates, Document {}

const addressModel = model<IAddressCoordinates>('Address', addressSchema);

export default addressModel;
