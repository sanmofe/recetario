// HU: REC-4 y REC-6

export class Restaurante {
    id: number;
    nombre: string;
    direccion: string;
    telefono: string;
    redesSociales: string;
    horario: string;
    tipoComida: string;
    apps: string;
    opciones: number


    public constructor(id: number, nombre: string, direccion: string, telefono: string, redesSociales: string, horario: string, tipoComida: string, apps: string, opciones: number) {
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.redesSociales = redesSociales;
        this.horario = horario;
        this.tipoComida = tipoComida;
        this.apps = apps;
        this.opciones = opciones;
    }
}
