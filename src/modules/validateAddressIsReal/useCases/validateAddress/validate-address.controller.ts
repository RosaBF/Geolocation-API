import {
  IAddressQueryDTO,
  validateIAddressDTOSchema,
} from './../../dto/address.dto';
import { IGetAddresValidatedUseCase } from './validate-address.use-case';
import { Request, Response } from 'express';
import { AddressErrors } from './errors/address.erros';

export class IGetAddressValidatedController {
  private iGetAddresValidatedUseCase: IGetAddresValidatedUseCase;

  constructor(iGetAddresValidatedUseCase: IGetAddresValidatedUseCase) {
    this.iGetAddresValidatedUseCase = iGetAddresValidatedUseCase;
  }

  public async execute(req: Request, res: Response) {
    const getAddressBody: IAddressQueryDTO = {
      street: req.query.street as string,
      streetName: req.query.streetNumber as string,
      city: req.query.city as string,
      postalCode: req.query.postalCode as string,
      country: req.query.country as string,
    };

    try {
      this.validateAddress(getAddressBody);
      const addressResponse = await this.iGetAddresValidatedUseCase.execute(
        getAddressBody
      );
      console.log(addressResponse);
      res.send(addressResponse);
      console.log(addressResponse);
    } catch (error: any) {
      switch (error.constructor) {
        case AddressErrors.AddressNotFound:
          res.status(404).send({ message: error.message });
          break;
        case AddressErrors.AddressInvalid:
          res.status(401).send({ message: error.message });
          break;
        default:
          res.sendStatus(500);
      }
    }
  }
  public async validateAddress(addressBody: IAddressQueryDTO) {
    const { error } = await validateIAddressDTOSchema.validateAsync(
      addressBody
    );
    if (error) {
      throw new AddressErrors.AddressInvalid();
    }
  }
}
