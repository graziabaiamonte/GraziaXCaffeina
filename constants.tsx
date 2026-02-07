
import { Candidate, ValuePoint } from './types';

export const CANDIDATES: Candidate[] = [
  {
    id: '1',
    name: 'Marco',
    role: 'Backend Developer',
    bio: 'Passionato di React e viaggi. Amo il buon cibo e imparare cose nuove ogni giorno. Cerco un team stimolante.',
    imageUrl: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2352&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isTarget: false,
    location: 'Milano, IT',
    passions: ['Travel', 'Cooking', 'Gaming'],
  },
  {
    id: '2',
    name: 'Sara ',
    role: 'Fullstack Developer',
    bio: 'Sviluppatrice con 3 anni di esperienza. Cerco sfide e un ambiente dinamico. Specializzata in Node.js e Vue.',
    imageUrl: 'https://images.unsplash.com/photo-1604364721460-0cbc5866219d?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    isTarget: false,
    location: 'Roma, IT',
    passions: ['Fitness', 'Node.js', 'Hiking'],
  },
  {
    id: '3',
    name: 'Grazia',
    role: 'Junior Frontend Developer',
    bio: 'Ciao, sono Grazia! Ho un debole per il codice pulito e le sfide impossibili. Scopri i miei 6 Values per capire perché siamo fatti l\'uno per l\'altra.',
    imageUrl: 'grazia_baiamonte.jpeg',
    isTarget: true,
    location: 'Alcamo, TP',
    passions: ['Creative Coding', 'UX/UI Design', 'Books'],
  }
];

export const GRAZIA_VALUES: ValuePoint[] = [
  {
    id: 'ambition',
    label: 'Ambition',
    anecdote: [
      "> Log: Ambition.exe initialized.",
      "> Mio malgrado, è vero che non mi accontento mai, ma LETTERALMENTE per ogni cosa: in palestra voglio ottenere sempre di più, ogni volta aumento sempre di un chilo il peso per vedere se riesco a sopportarlo e se non riesco la prima volta, non vado via finchè non riesco a fare almeno una serie anche di soli 3 ripetizioni con quel nuovo peso;",
      "> quando cucino un nuovo piatto lo riprovo più volte cambiando piccoli dettagli finchè non trovo la ricetta top che mi soddisfa (al costo di preparare la stessa cosa per più cene consecutive rendendomi antipatica a tavola); a lavoro cerco di dare il meglio anche in cose che non ho mai fatto o che non mi vengono chieste poichè penso alla Grazia del futuro e vorrei che avesse quante più competenze trasversali possibili. ",
      "> Mi piace parlare con gente affine al mio mestiere e parlare di lavoro potendo comprendere il contesto e tutto ciò che ci sta dietro. Voglio collezionare quante più cose possibili, cerco con metodi alternativi di appassionarmi in generale a un pò di tutto."
    ]
  },
  {
    id: 'excellence',
    label: 'Excellence',
    anecdote: [
      "> Log: Excellence.exe initialized.",
      "> Frequentando il master in front-end pensavo che sarei diventata una sviluppatrice a tutti gli effetti, ma ai tempi vivevo dentro una bolla di vetro. Guardando in giro, osservando i grandi sviluppatori, seguendo il loro iter e il loro approccio, ho notato che avevano una forma mentis a me quasi sconosciuta, una capacità di pensiero e logica completamente distante dalla mia formazione classica. Ho capito che se volevo firmare in fondo alle mail con << Grazia Baiamonte | Developer >> dovevo fare molto di più, capire i concetti che ci stanno dietro alla realizzazione di un sito/web app. ",
      "> Perciò mi sono incuriosita, ho iniziato a guardare tutorial di come realizzare un’app per mobile, un software gestionale e volevo capire meglio la logica che il tizio di youtube applicava cosi tanto natuaralmente come se per lui fosse semplicemente aggiungere il sale nella pentola che bolle. Mi sono resa conto che per me non era poi così tanto scontato: questo mi procurava quasi ‘disagio’ se cosi si può dire, era come se stavo prendendo in giro me stessa. ",
      "> Sin dopo il master il mio obiettivo era entrare a far parte di una grande realtà, ma volevo presentarmi con le competenze giuste e con un quadro chiaro e completo di quello che significa essere oggi uno sviluppatore. Quindi, mi sono iscritta all’uni."
    ]
  },
  {
    id: 'caring',
    label: 'Caring',
    anecdote: [
      "> Log: Caring.exe initialized.",
      "> Non sono mai stata una tipa egoista, penso che se si voglia costruire qualcosa di solido nel tempo bisogna fare dei sacrifici, chiedere aiuto e non pensare strettamente solo alla crescita personale. Ragion per cui adesso vi informerò di come io e Davide (il mio ragazzo) negli ultimi 5 anni abbiamo deciso di ‘buttare via la vita sociale’ e dedicarci a migliorare il nostro futuro.",
      "> Io lavoravo come commessa full time per pagarmi gli studi, lui da poco aveva iniziato l’uni incredulo e con difficoltà. Super stressati, demotivati molte volte, stanchi, fino a tarda notte ci aiutavamo a vicenda, cercavamo di far pesare meno lo studio e le materie apparentemente inutili per la nostra carriera. Lui ripeteva a me, io a lui, ci sono stati momenti in cui ridevamo poichè trovavamo modi simpatici di come ricordare i concetti, altre volte eravamo solo nervosi e arrabiati di come stavano andando le cose (magari qualche esame andato male), ma grazie alla costanza di entrambi, grazie all’amore che abbiamo riposto nei confronti dell’altro, siamo riusciuti a superare quei momenti davvero pesanti: non uscivamo molto, non partivamo, tutto il contrario delle persone che ci stavano attorno insomma e questo era difficile da sopportare. ",
      "> Ma è stata la prova e la conferma che insieme si riescono ad ottenere cose migliori, che superare le difficoltà insieme a qualcun altro può portare valore ad entrambi. Penso ancora che se non avessi avuto le sue ‘sedute di supporto psicologico’, magari adesso sarei diventata una persona diversa, di certo non migliore. E’ proprio questo quello che mi piacerebbe trovare in azienda, una cura e un interesse nei confronti dell’altro, anche al di fuori dell’aspetto lavorativo e professionale, concentrato sull’aspetto umano, quello che davvero rende le persone speciali e capaci di eccellere in ogni cosa."
    ]
  },
  {
    id: 'growth',
    label: 'Growth',
    anecdote: [
      "> Log: Growth.exe initialized.",
      "> Credo molto nella scalinata infinita che ognuno di noi è chiamato a salire. Da quando mi sono diplomata, ho cercato di studiare il più possibile e impegnarmi per diventare una donna migliore e completa: vorrei che i miei figli un giorno fossero fieri e vorrei dare loro una figura cardine da prendere come riferimento.",
      "> Immagino proprio una scala ideale e ogni volta che imparo una nuova cosa, nella mia testa coloro un gradino, come dire ‘sono riuscita a raggiungere uno step più alto’. Non intendo solo capacità pratiche e strettamente lavorative. Coloro un gradino anche quando riconosco di migliorare il mio carattere. Vi racconto un episodio sciocco se guardato con occhi di persone troppo audaci: quando ho ricevuto l’offerta di entrare all’Adduma (agenzia di comunicazione dove lavoro), sapevo che avrei dovuto sforzarmi al massimo per farmi valere come persona e come sviluppatrice. Sapevo già che avrei dovuto fare passi da gigante per superare la mia timidezza e inizare ad essere un pò più socievole. Dovevo essere adulta a tutti gli effetti, uscire dalla mia confort zone, collaborare con colleghi più grandi e più esperti di me. ",
      "> Con il tempo (per fortuna), sono migliorata, sono cresciuta e sono diventata molto meno timida (non appena sono riuscita più di una volta a partecipare ad un discorso già in corso d’opera senza che nessuno mi interpellasse esplicitamente, ho capito che potevo colorare un gradino 💪🏼). Adesso la timidezza è acqua passata, sono già a lavoro per poter colorare un altro gradino."
    ]
  },
  {
    id: 'courage',
    label: 'Courage',
    anecdote: [
      "> Log: Courage.exe initialized.",
      "> Il coraggio è un behaviour che sto imparando a migliorare con il tempo e con le richieste che ogni giorno la vita mi presenta. Non pretendo che dall’oggi al domani possa entrare nella casa dei Grifondoro, ma ci sto lavorando e sono molto fiduciosa.",
      "> Per me ‘coraggio’ significa anche solo prendere un aereo completamente da sola e raggiungere una nuova città per la prima volta, oppure, caso peggiore, dire al proprio datore di lavoro che una cosa la so fare anche se non ho la certezza effettiva che funzioni. Quando sono entrata qui in agenzia non avevo mai usato wordpress, sapevo che era più semplice e gestibile e che per sviluppare il mio primo sito da dipendente avrei potuto contare su una web designer senior con un esperienza ormai decennale. Completando il master però, la mia intenzione era scrivere codice e utilizzare o vue o react che avevo studiato di recente. ",
      "> La richiesta del mio datore era semplice: realizzare con qualsiasi tecnologia ritenevo opportuno un sito multi pagina con seo base e performance di lighthouse al top. Mi aveva dato carta bianca insomma. Mi sono alzata le maniche e mi sono messa a lavoro, era la mia opportunità per poter usare nextjs (che a differenza di react era più indicato per la seo), per poter dimostrare che il mio approccio era innovativo e diverso rispetto a quello che l’agenzia aveva proposto fino ad allora e dimostrare che sapevo gestire il tutto per un cliente reale. Ho dovuto studiare un pò il framework in generale, fino ad allora avevo solo sviluppato progettini da portfolio, non volevo fare brutte figure per il primo lavoro che mi veniva assegnato, ma credevo nelle mie capacità e sapevo che studiando un pò di più avrei potuto raggiungere l’obiettivo anche gestendo diversi problemi in itenere. Fortunatamente non ho lasciato che l’ansia prevaricasse ed è andata bene🙂‍↕️."
    ]
  },
   {
    id: 'proactivity',
    label: 'Proactivity',
    anecdote: [
      "> Log: Proactivity.exe initialized.",
      "> A lavoro cerco sempre di essere pronta a tutto quello che mi potrebbe essere chiesto. Quando feci il colloquio per l’Adduma, mi era stato detto che cercavano una figura in grado di sviluppare siti, concentrandosi sull’aspetto grafico, sui dettagli e sulle performance generiche. ",
      "> Al momento del colloquio non avevo molta esperienza in ambito grafico, perciò nel tempo libero ho seguito una serie di corsi online che mi potessero dare un’infarinatura di quali strumenti venivano usati dalla maggior parte dei grafici per realizzare wireframe e layout. Ho imparato ad usare Figma e AdobeXD e ho capito alcune tecniche di UX/UI che potevano migliorare l’esperienza utente e che effettivamente, guardando al futuro della mia carriera, era bene sapere e mi avrebbero aiutato nei progetti futuri che avrei potuto fare da sola.",
      ">  Inoltre avendo studiato solo react e vue, dovevo trovare una soluzione che mi aiutasse con le performance, motivo per cui ho iniziato a familiarizzare con Nextjs."
    ]
  }
];
