import {IBaseDocument}  from '../../../models/base.model';

export interface IMeasurementUnit extends IBaseDocument {
  name: string;
  measurementUnitSymbol?: string;
}
