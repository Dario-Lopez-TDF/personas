export class Personal {
  private id: number;
  private nombre: string;
  // Falta agregar mas items para conectar con React

  constructor(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }
  public getId(): number {
    return this.id;
  }
  public getNombre(): string {
    return this.nombre;
  }
}
