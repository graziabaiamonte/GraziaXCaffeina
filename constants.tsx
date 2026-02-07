
import { Candidate, ValuePoint } from './types';

export const CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'Marco',
    role: 'Frontend Dev',
    bio: 'Passionato di React e viaggi. Amo il buon cibo e imparare cose nuove ogni giorno. Cerco un team stimolante.',
    imageUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2352&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isTarget: false,
    location: 'Milano, IT',
    passions: ['Travel', 'Cooking', 'Games'],
  },
  {
    id: '2',
    name: 'Sara ',
    role: 'Fullstack Developer',
    bio: 'Sviluppatrice con 3 anni di esperienza. Cerco sfide e un ambiente dinamico. Specializzata in Node.js e Vue.',
    imageUrl: 'https://images.unsplash.com/photo-1604364721460-0cbc5866219d?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isTarget: false,
    location: 'Roma, IT',
    passions: ['Gaming', 'Node.js', 'Hiking'],
  },
  {
    id: '3',
    name: 'Grazia',
    role: 'Junior Frontend Developer',
    bio: 'Ciao, sono Grazia! Ho un debole per il codice pulito e le sfide impossibili. Scopri i miei 6 Values per capire perché siamo fatti l\'uno per l\'altra.',
    imageUrl: '/grazia_baiamonte.jpeg',
    isTarget: true,
    location: 'Alcamo, TP',
    passions: ['Creative Coding', 'UX/UI Design', 'Books'],
  }
];

export const GRAZIA_VALUES: ValuePoint[] = [
  {
    id: 'ambition',
    label: 'Ambizione',
    anecdote: [
      "> Log: Ambition.exe initialized.",
      "> Non accetto lo status quo. Se un processo è lento o inefficiente, il mio istinto è ottimizzarlo immediatamente.",
      "> Ho trasformato un vecchio progetto legacy in una PWA moderna in soli due weekend, riducendo il tempo di caricamento del 70%.",
      "> Il mio obiettivo non è solo scrivere codice, ma creare prodotti che lascino un segno tangibile nel tempo."
    ]
  },
  {
    id: 'problem-solving',
    label: 'Problem Solving',
    anecdote: [
      "> DEBUG MODE: ACTIVE.",
      "> Un bug non è un errore fastidioso, ma un enigma logico che aspetta solo di essere risolto con eleganza.",
      "> Durante un rilascio critico di venerdì sera, ho isolato un memory leak complesso analizzando i dump dell'heap sotto pressione.",
      "> Analisi, calma e una profonda conoscenza degli strumenti di debug sono i miei ferri del mestiere."
    ]
  },
  {
    id: 'teamwork',
    label: 'Teamwork',
    anecdote: [
      "> git checkout -b 'collaboration-culture'.",
      "> Credo fermamente che il codice migliore nasca dalla diversità di pensiero e dal confronto costruttivo.",
      "> Ho introdotto sessioni settimanali di pair programming che hanno ridotto i bug in produzione del 25% nel mio precedente team.",
      "> Insieme siamo più veloci, più forti e, soprattutto, scriviamo codice più scalabile."
    ]
  },
  {
    id: 'clean-code',
    label: 'Clean Code',
    anecdote: [
      "> prettier --write .",
      "> Scrivo codice pensando che chi dovrà leggerlo tra sei mesi sia un collega che merita rispetto e chiarezza.",
      "> Seguo i principi SOLID e i design pattern non come regole astratte, ma come fondamenta per la manutenibilità.",
      "> Un componente da 500 righe è un debito tecnico che va rifattorizzato subito per garantire la qualità del prodotto."
    ]
  },
  {
    id: 'curiosity',
    label: 'Curiosità',
    anecdote: [
      "> New technology release detected. Fetching documentation...",
      "> La mia sete di conoscenza non ha limiti di banda; esploro costantemente le ultime evoluzioni del panorama tech.",
      "> Dalle nuove API di React all'integrazione di modelli AI come Gemini, sono sempre un passo avanti alla curva di apprendimento.",
      "> Sperimentare con nuovi tool come Bun o Vite è il mio modo di mantenere le mie skill affilate e competitive."
    ]
  },
  {
    id: 'reliability',
    label: 'Affidabilità',
    anecdote: [
      "> Status: 100% Commitment Uptime.",
      "> Una deadline non è un suggerimento, è un impegno sacro che onoro con precisione chirurgica.",
      "> Gestisco il mio tempo e le priorità in modo trasparente, garantendo che il team sia sempre allineato sullo stato del lavoro.",
      "> Puoi contare sulla mia presenza e professionalità anche nelle sfide tecniche più complesse e urgenti."
    ]
  }
];
