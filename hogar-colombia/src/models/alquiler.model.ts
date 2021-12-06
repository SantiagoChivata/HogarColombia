import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Empleado} from './empleado.model';

@model()
export class Alquiler extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaEntrega: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaRecibido: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  codeudor: string;

  @property({
    type: 'string',
    required: true,
  })
  cartaLaboral: string;

  @belongsTo(() => Empleado)
  empleadoId: string;

  @property({
    type: 'string',
  })
  inmuebleId?: string;

  constructor(data?: Partial<Alquiler>) {
    super(data);
  }
}

export interface AlquilerRelations {
  // describe navigational properties here
}

export type AlquilerWithRelations = Alquiler & AlquilerRelations;
