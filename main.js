//const { response } = require("express");

// Definizione della funzione
function somma(a, b) {
    return a + b;
}

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
// Creazione dell'array longbooks (Filtra i libri > 300 pagine)
const longBooks = books.filter(book => book.pages > 300);

// Creazione dell'array 'longBooksTitles' (Prende solo i titoli)
const longBooksTitles = longBooks.map(book => book.title);

// Stampa in console di ogni titolo
longBooksTitles.forEach(title => {
    console.log(title);
});

//---- SNACK 2 ----
// Filtro i disponibili
const availableBooks = books.filter(b => b.available);

// Mappo per applicare lo sconto del 20%
const discountedBooks = availableBooks.map(book => {

    // trasformo la stringa '15€' in un numero 15
    const priceAsNumber = parseFloat(book.price.replace('€', '').replace(',', '.'));
    const discountedPrice = priceAsNumber * 0.8;
    return {
        ...book,

        // Salviamo il nuovo prezzo
        price: parseFloat(discountedPrice.toFixed(2))
    };

});

// Trovo il primo con il prezzo intero
const fullPrincedBook = discountedBooks[0];

// Stampo per verificare
console.log("---Risultato Snack 2---");
console.log(fullPrincedBook);

//--- snack 3 ---

// Creare un array (authors) che contiene gli autori deei libri
const authors = books.map(book => book.author);

// Variabile booleana. verifica se tutti gli autori sono maggiorenni
const aerAuthorsAdults = authors.every(author => author.age >= 18);

// Ordina l'array authors in base all'età senza creare un'altra array
// Se areAuthorsAdults è true -> ordine crescente, altrimenti decescente
authors.sort((a, b) => {
    if (aerAuthorsAdults) {
        return a.age - b.age; // Crescente
    } else {
        return b.age - a.age; // Decrescente
    }
});

// Verifichiamo i risultati
console.log("Tutti maggiorenni?", aerAuthorsAdults);
console.log("Autori ordinati:", authors);

// --- snack 4 ---

// Creare l'array delle età
const ages = books.map(book => book.author.age);

// Calcolare la somma  con reduce
const agesSum = ages.reduce((acc, age) => acc + age, 0);

// Calcolare e stampare la media
const averageAge = agesSum / ages.length;
console.log("L'età media degli autori è:", averageAge);

// ---Snack 5 (Bonus)

function getBooks(ids) {
    const baseURL = "http://localhost:3333/books";
    const bookPromises = ids.map(id =>
        fetch(`${baseURL}/${id}`)
            .then(res => res.json())
            .catch(error => {
                console.error(`Errore nel parsing del libro con ID ${id}:`, error);
                return null; // Ritorna null se c'è un errore di parsing
            }));

    return Promise.all(bookPromises);
}

// Esempio di chiamata per vedere i risultati dello Snack 5 (Bonus)
/*getBooks([1, 2, 3])
    .then(results => {
        console.log("---Risultati Snack 5 (Bonus)---");
        console.log(results);
    })
    .catch(error => {
        console.error("Errore nello Snack 5:", error);
    });
*/


// --- Snack 6 (Bonus) ---

// Verificare disponibilità book
const areThereAvailableBooks = books.some(book => book.available);

// Nuovo array ordinato per prezzo
const booksSortedByPrice = [...books].sort((a, b) => {
    // Estraiamo i prezzi come numeri
    const priceA = parseFloat(a.price.replace('€', '').replace(',', '.'));
    const priceB = parseFloat(b.price.replace('€', '').replace(',', '.'));

    console.log(`Comparing ${a.title} (${priceA}€) with ${b.title} (${priceB}€)`);

    return priceA - priceB; // Ordine crescente per prezzo
});



// Ordina booksByPrice in base alla disponibilità (in place)
booksSortedByPrice.sort((a, b) => (a.available === b.available) ? 0 : a.available ? -1 : 1);

// Stampa i risultati
console.log("Ci sono libri disponibili?", areThereAvailableBooks);
console.log("Libri ordinati per prezzo e disponibilità:", booksSortedByPrice);

// --- Snack 7 (Bonus) ---
const tagCounts = books.reduce((acc, book) => {

    // Per ogni tag del libro, aggiorniamo il conteggio
    book.tags.forEach(tag => {
        // Se il tag esiste già nell'accumulatore, incrementiamo il conteggio, altrimenti lo inizializziamo a 1
        if (acc[tag]) {
            acc[tag]++;
        } else {
            //
            acc[tag] = 1;
        }
    });

    return acc;
}, {});// Oggetto finale con il conteggio dei tag

console.log("Conteggio tag:", tagCounts);









/*
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
*/




/* Testa la funzione con la query "londra" e stampa il messaggio formattato
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
    
*/

