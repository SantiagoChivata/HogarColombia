import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Inmueble,
  Alquiler,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleAlquilerController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/alquilers', {
    responses: {
      '200': {
        description: 'Array of Inmueble has many Alquiler',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Alquiler)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Alquiler>,
  ): Promise<Alquiler[]> {
    return this.inmuebleRepository.alquiler(id).find(filter);
  }

  @post('/inmuebles/{id}/alquilers', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Alquiler)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alquiler, {
            title: 'NewAlquilerInInmueble',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) alquiler: Omit<Alquiler, 'id'>,
  ): Promise<Alquiler> {
    return this.inmuebleRepository.alquiler(id).create(alquiler);
  }

  @patch('/inmuebles/{id}/alquilers', {
    responses: {
      '200': {
        description: 'Inmueble.Alquiler PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alquiler, {partial: true}),
        },
      },
    })
    alquiler: Partial<Alquiler>,
    @param.query.object('where', getWhereSchemaFor(Alquiler)) where?: Where<Alquiler>,
  ): Promise<Count> {
    return this.inmuebleRepository.alquiler(id).patch(alquiler, where);
  }

  @del('/inmuebles/{id}/alquilers', {
    responses: {
      '200': {
        description: 'Inmueble.Alquiler DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Alquiler)) where?: Where<Alquiler>,
  ): Promise<Count> {
    return this.inmuebleRepository.alquiler(id).delete(where);
  }
}
