import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Empleado } from '../models';
import { EmpleadoRepository } from '../repositories';
import { Llaves } from '../config/llaves';
const generador = require('password-generator');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(EmpleadoRepository)
    public empleadoRepository: EmpleadoRepository

  ) {}

  /*
   * Add service methods here
   */

  GenerarClave(){
    let clave = generador(8,false);
    return clave;
  }

  cifrarClave(clave:string){
    // quitar contraseña
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;

  }

  identificarEmpleado(usuario: string, clave: string){
    try {
      let p = this.empleadoRepository.findOne({where:{usuario: usuario, clave: clave}});
      if(p){
        return p;
      }
      return false;
    } catch (error) {
      return false;
    }
    
  }

  GenerarTokenJWT(empleado: Empleado){
    let token = jwt.sign({

      data:{
        id: empleado.id,
        usuario: empleado.usuario,
        nombre: empleado.nombre
      }

    },
    Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token:string){
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch (error) {
      return false;
      
    }
  }

}
