import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Venta,
  Solicitud,
} from '../models';
import {VentaRepository} from '../repositories';

export class VentaSolicitudController {
  constructor(
    @repository(VentaRepository)
    public ventaRepository: VentaRepository,
  ) { }

  @get('/ventas/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to Venta',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.string('id') id: typeof Venta.prototype.id,
  ): Promise<Solicitud> {
    return this.ventaRepository.solicitud(id);
  }
}
