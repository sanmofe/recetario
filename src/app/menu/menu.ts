export class Menu {
  id: number;
  nombre: string;
  fechaInicio: Date;
  fechaFin: Date;
  autor: string;
  descripcion: string;

  public constructor(
    id: number,
    nombre: string,
    fechaInicio: Date,
    fechaFin: Date,
    autor: string,
    descripcion: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.autor = autor;
    this.descripcion = descripcion;
  }
}
