import { response } from "express";

async function getDashboardData(query) {
    // Utilizziamo l'indirizzo locale come richiesto
    const baseURL = "http://localhost:3333";

    try {
        // Avviamo le richieste in parallelo
        const [destRes, weatherRes, airportRes] = await Promise.all([
            fetch(`${baseURL}/destinations?search=${query}`).then(res => res.json()),
            fetch(`${baseURL}/weathers?search=${query}`).then(res => res.json()),
            fetch(`${baseURL}/airports?search=${query}`).then(res => res.json()),
        ]);

        // Estraiamo il primo elementoda ogni risultato (assumendo che le API restituiscono array)
        const destination = responses[0][0];
        const weather = responses[1][0];
        const airport = responses[2][0];

        //Se uno dei dati manca, restituiamo un messaggio o null
        if (!destination || !weather || !airport) {
            return "Nessun dato trovato per questa città";
        }

        //Restituamo l'oggetto con le nuove proprietà mappate
        return {
            city: destination.name,
            comutry: destination.country,
            temperature: weather.temperature,
            weather: weather.weather_description,
            airport: airport.name,
        };

    } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
    }
}
