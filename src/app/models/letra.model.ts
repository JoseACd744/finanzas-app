// src/app/models/letra.model.ts
export interface Letra {
    id?: number;
    numero: string;
    nombreCliente: string;
    monto: number;
    tasaInteresEfectiva: number;
    seguroDesgravame: number;
    fechaDescuento: Date;
    fechaVencimiento: Date;
    fechaInicio?: Date;
    valorNominal?: number;
    diasDescontados?: number;
    TEA?: number;
    TEP?: number;
    tasaDescontada?: number;
    descuento?: number;
    valorNeto?: number;
    valorRecibido?: number;
    valorEntregado?: number;
    TCEA?: number;
    userId: number;
  }