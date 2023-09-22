import { Receta } from "src/app/receta/receta";

export class MenuReceta {
    id: number;
    receta: Receta;
    numPersonas : number;

    public constructor(id: number, receta: Receta, numPersonas: number) {
        this.id = id;
        this.receta = receta;
        this.numPersonas = numPersonas;
    }
}