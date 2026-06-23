import { useState } from "react";
import { search, type FlyghtDatos } from "../service/flyght";

export default function FlySearch() {
  const [flightNumber, setFlightNumber] = useState("");
  const [airlineName, setAirlineName] = useState("");

  const [departureFrom, setDepartureFrom] = useState("");
  const [departureTo, setDepartureTo] = useState("");

  const [flights, setFlights] = useState<FlyghtDatos[]>([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const toISO = (value: string) => {
    if (!value) return undefined;
    return new Date(value).toISOString();
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSearched(true);

    try {
      const response = await search({
        flightNumber: flightNumber || undefined,
        airlineName: airlineName || undefined,
        estDepartureTimeFrom: toISO(departureFrom),
        estDepartureTimeTo: toISO(departureTo),
      });

      setFlights(response.data.items);
    } catch (err: any) {
      const message =
        err.response?.data?.detail || "Error al buscar vuelos";

      setError(message);
    }
  };

  return (
    <div>
      <h1>Búsqueda de vuelos</h1>

      <form onSubmit={handleSearch}>
        <div>
          <label>Número de vuelo</label>
          <input
            type="text"
            placeholder="LA123"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
          />
        </div>

        <div>
          <label>Aerolínea</label>
          <input
            type="text"
            placeholder="LATAM"
            value={airlineName}
            onChange={(e) => setAirlineName(e.target.value)}
          />
        </div>

        <div>
          <label>Salida desde</label>
          <input
            type="datetime-local"
            value={departureFrom}
            onChange={(e) => setDepartureFrom(e.target.value)}
          />
        </div>

        <div>
          <label>Salida hasta</label>
          <input
            type="datetime-local"
            value={departureTo}
            onChange={(e) => setDepartureTo(e.target.value)}
          />
        </div>

        <button type="submit">Buscar</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {searched && flights.length === 0 && !error && (
        <p>No se encontraron vuelos con esos filtros.</p>
      )}

      {flights.length > 0 && (
        <table border={1}>
          <thead>
            <tr>
              <th>Número</th>
              <th>Aerolínea</th>
              <th>Salida</th>
              <th>Llegada</th>
              <th>Asientos disponibles</th>
            </tr>
          </thead>

          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.flightNumber}</td>
                <td>{flight.airlineName}</td>
                <td>{new Date(flight.estDepartureTime).toLocaleString()}</td>
                <td>{new Date(flight.estArrivalTime).toLocaleString()}</td>
                <td>{flight.availableSeats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}