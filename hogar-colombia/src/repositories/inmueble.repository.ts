import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Alquiler, Venta, Solicitud} from '../models';
import {AlquilerRepository} from './alquiler.repository';
import {VentaRepository} from './venta.repository';
import {SolicitudRepository} from './solicitud.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly alquiler: HasManyRepositoryFactory<Alquiler, typeof Inmueble.prototype.id>;

  public readonly venta: HasManyRepositoryFactory<Venta, typeof Inmueble.prototype.id>;

  public readonly solicitud: HasManyRepositoryFactory<Solicitud, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongoDb') dataSource: MongoDbDataSource, @repository.getter('AlquilerRepository') protected alquilerRepositoryGetter: Getter<AlquilerRepository>, @repository.getter('VentaRepository') protected ventaRepositoryGetter: Getter<VentaRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Inmueble, dataSource);
    this.solicitud = this.createHasManyRepositoryFactoryFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
    this.venta = this.createHasManyRepositoryFactoryFor('venta', ventaRepositoryGetter,);
    this.registerInclusionResolver('venta', this.venta.inclusionResolver);
    this.alquiler = this.createHasManyRepositoryFactoryFor('alquiler', alquilerRepositoryGetter,);
    this.registerInclusionResolver('alquiler', this.alquiler.inclusionResolver);
  }
}
