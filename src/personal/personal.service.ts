import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

import { Personal } from './personal';

@Injectable()
export class PersonalService {
  private listaPersonas = [];

  constructor() {
    this.loadPersonas();
  }

  private loadPersonas(): void {
    const archivo = fs.readFileSync('personas.csv', 'utf-8');
    const lineas: string[] = archivo.split('\n');
    let linea: string;
    let dato: string[] = [];
    const datos: string[][] = [];
    for (let i = 0; i < lineas.length; i++) {
      linea = lineas[i].replace('\r', '');
      dato = linea.split(',');
      datos.push(dato);
    }
    for (let i = 0; i < datos.length; i++) {
      const id = parseInt(datos[i][0]);
      const person = new Personal(id, datos[i][1]);
      this.listaPersonas.push(person);
    }
  }

  getPersona(): any {
    return this.listaPersonas;
  }

  getPersonaId(id: number): any {
    const per = this.listaPersonas.find((p) => p.id === id);
    const perAux = [];
    perAux.push(per);
    return perAux;
  }

  private existeId(id: number): boolean {
    let existe = false;
    for (let i = 0; i < this.listaPersonas.length; i++) {
      if (this.listaPersonas[i].id === id) {
        existe = true;
      }
    }
    return existe;
  }

  eliminarPersona(id: number): any {
    let existe = false;
    let pos = 0;
    for (let i = 0; i < this.listaPersonas.length; i++) {
      if (id === this.listaPersonas[i].id) {
        existe = true;
        pos = i;
      }
    }
    if (existe) {
      this.listaPersonas.splice(pos, 1);
      return { msj: `Persona ${id} eliminada` };
    } else {
      return { msj: `Persona ${id} no encontrada` };
    }
  }

  crearPersona(body: any): any {
    const id = parseInt(body.id);
    const per = new Personal(id, body.nombre);
    if (!this.existeId(body.id)) {
      if (per.getId() && per.getNombre) {
        this.listaPersonas.push(per);
        fs.appendFileSync(
          'personas.csv',
          `\n${per.getId()},${per.getNombre()}`,
        );
        return 'OK';
      } else {
        ('elemento no agregado, faltan datos');
      }
    } else {
      `el elemento con id: ${id} ya exite`;
    }
  }
}
