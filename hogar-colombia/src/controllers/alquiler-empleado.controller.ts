import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Alquiler,
  Empleado,
} from '../models';
import {AlquilerRepository} from '../repositories';

export class AlquilerEmpleadoController {
  constructor(
    @repository(AlquilerRepository)
    public alquilerRepository: AlquilerRepository,
  ) { }

  @get('/alquilers/{id}/empleado', {
    responses: {
      '200': {
        description: 'Empleado belonging to Alquiler',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Empleado)},
          },
        },
      },
    },
  })
  async getEmpleado(
    @param.path.string('id') id: typeof Alquiler.prototype.id,
  ): Promise<Empleado> {
    return this.alquilerRepository.empleado(id);
  }
}
