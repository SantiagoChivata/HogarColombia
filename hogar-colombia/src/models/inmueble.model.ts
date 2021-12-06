import {Entity, model, property, hasMany} from '@loopback/repository';
import {Alquiler} from './alquiler.model';
import {Venta} from './venta.model';
import {Solicitud} from './solicitud.model';

@model({settings: {strict: false}})
export class Inmueble extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaSolicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @hasMany(() => Alquiler)
  alquiler: Alquiler[];

  @hasMany(() => Solicitud)
  solicitud: Solicitud[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
