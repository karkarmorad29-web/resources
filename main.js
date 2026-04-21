

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
        const destination = destRes[0];
        const weather = weatherRes[0];
        const airport = airportRes[0];

        //Se uno dei dati manca, restituiamo un messaggio o null
        if (!destination || !weather || !airport) {
            //return "Nessun dato trovato per questa città";
            throw new Error("Dati Incompleti per la città creata.");
        }

        //Restituamo l'oggetto con le nuove proprietà mappate
        return {
            city: destination.name,
            country: destination.country,
            temperature: weather.temperature,
            weather: weather.weather_description,
            airport: airport.name,
        };

    } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
    }
}

// Testa la funzione con la query "londra" e stampa il messaggio formattato
getDashboardData('London')
    .then(data => {
        console.log('Dashboard data: ', data);
        console.log(
            `${data.city} is in ${data.country}. \n` +
            `Today there are ${data.temperature} degrees and the ` +
            `weather is ${data.weather}. \n` +
            `The main airport is ${data.airport}. \n`

        );
    })
    .catch(error => console.error(error));


