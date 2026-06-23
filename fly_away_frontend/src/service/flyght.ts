import { api } from "../api/api";


export type FlyghtDatos = {
    id:number,
    airlineName: string,
    flightNumber: string,
    estDepartureTime: string,
    estArrivalTime: string,
    availableSeats: number,
}
// como los parametros son opcionales y se pueden combinar usamos:
export type FlyghtSearchParams = {
    airlineName?: string,
    flightNumber?: string,
    estDepartureTimeFrom?: string,
    estDepartureTimeTo?: string,
}
export function search (params:FlyghtSearchParams) {
    return api.get("/flights/search",{params});
}