const books = [
    {
        title: "React Billionaire",
        pages: 250,
        author: {
            name: 'Alice',
            age: 35
        },
        available: false,
        price: '101€',
        tags: ['advanced', 'js', 'react', 'senior']
    },
    {
        title: "Advanced JS",
        pages: 500,
        author: {
            name: 'Bob',
            age: 20
        },
        available: true,
        price: '25€',
        tags: ['advanced', 'js', 'mid-senior']
    },
    {
        title: "CSS Secrets",
        pages: 320,
        author: {
            name: 'Alice',
            age: 17
        },
        available: true,
        price: '8€',
        tags: ['html', 'css', 'junior']
    },
    {
        title: "HTML Mastery",
        pages: 200,
        author: {
            name: 'Charlie',
            age: 50
        },
        available: false,
        price: '48€',
        tags: ['html', 'advanced', 'junior', 'mid-senior']
    },
];


async function getDashboardData(query) {
    // Utilizziamo l'indirizzo locale come richiesto
    const baseURL = "http://localhost:3333";

    try {
        // Avviamo le richieste in parallelo
        const [destRes, weatherRes, airportRes] = await Promise.allSettled([
            fetch(`${baseURL}/destinations?search=${query}`).then(res => res.json()),
            fetch(`${baseURL}/weathers?search=${query}`).then(res => res.json()),
            //fetch(`https://www.meteofittizio.it`).then(res => res.json()), <--- per il Bonus 2
            fetch(`${baseURL}/airports?search=${query}`).then(res => res.json()),
        ]);

        // Estraiamo i dati controllando lo stato ('fulfilled' o 'rejected')
        // Se la chiamata è fallita, stampiamo l'errore e settiamo a null
        const destination = results[0].status === 'fulfilled' ? results[0].value[0] : (console.error("Errore destinazione"), null);
        const weather = results[1].status === 'fulfilled' ? results[1].value[0] : (console.error("Errore meteo"), null);
        const airport = results[2].status === 'fulfilled' ? results[2].value[0] : (console.error("Errore aeroporto"), null);

        //Se uno dei dati manca, restituiamo un messaggio o null
        // if (!destination || !weather || !airport) {
        //return "Nessun dato trovato per questa città";
        //  throw new Error("Dati Incompleti per la città creata.");
        //}

        //Restituamo l'oggetto con le nuove proprietà mappate
        return {
            city: destination ? destination.name : "N/A",
            country: destination ? destination.country : "N/A",
            temperature: weather ? weather.temperature : null,
            weather: weather ? weather.weather_description : null,
            airport: airport ? airport.name : null,
        };

    } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
    }
}

// Testa la funzione con la query "londra" e stampa il messaggio formattato
getDashboardData('London')
    .then(data => {
        console.log('Dashboard data: ', data);

        // Iniziamo il messaggio con le info che ci sono sempre

        let message = `${data.city} is in ${data.country}. \n`;

        // Aggiungiamo il meteo SOLO se i dati non sono null/undefined
        if (data.temperature !== null && data.weather !== null) {
            message += `Today there are ${data.temperature} degrees and the weather is ${data.weather}. \n`;
        }

        // Aggiungiamo l'aeroporto SOLO se esiste
        if (data.airport) {
            message += `The main airport is ${data.airport}. `;
        }

        // Stampiamo il messaggio
        console.log(message)


    })
    .catch(error => console.error(error));


