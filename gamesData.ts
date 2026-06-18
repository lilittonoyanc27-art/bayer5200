import {
  ConjugationQuestion,
  IndicativoSubjuntivoQuestion,
  WishBuilderQuestion,
  TimeTravelQuestion,
  TriggerCategoryQuestion,
  TranslationQuestion
} from './types';

export const game1Questions: ConjugationQuestion[] = [
  {
    verb: "hablar",
    meaning: "խոսել (կանոնավոր -AR բայ)",
    pronoun: "tú",
    correctAnswer: "hables",
    options: ["hables", "hablas", "hable", "habléis"],
    explanation: "Կանոնավոր -AR բայերն անցնում են -e վերջավորության: Tú դեմքի համար դառնում է 'hables' (համեմատիր Indicativo 'hablas'-ի հետ):"
  },
  {
    verb: "comer",
    meaning: "ուտել (կանոնավոր -ER բայ)",
    pronoun: "yo",
    correctAnswer: "coma",
    options: ["coma", "como", "come", "comas"],
    explanation: "Կանոնավոր -ER բայերն անցնում են -a վերջավորության: Yo դեմքի համար դառնում է 'coma' (համեմատիր Indicativo 'como'-ի հետ):"
  },
  {
    verb: "vivir",
    meaning: "ապրել (կանոնավոր -IR բայ)",
    pronoun: "nosotros",
    correctAnswer: "vivamos",
    options: ["vivamos", "vivimos", "vivas", "vivamos"],
    explanation: "Կանոնավոր -IR բայերը ստանում են -a վերջավորություն: Nosotros դեմքի համար 'vivamos' է (համեմատիր Indicativo 'vivimos'-ի հետ)։"
  },
  {
    verb: "ser",
    meaning: "լինել (անկանոն բայ)",
    pronoun: "tú",
    correctAnswer: "seas",
    options: ["seas", "eres", "sea", "seáis"],
    explanation: "Ser բայի Subjuntivo հիմքն է 'sea-': Tú դեմքի վերջավորությամբ այն դառնում է 'seas':"
  },
  {
    verb: "estar",
    meaning: "լինել / գտնվել (անկանոն բայ)",
    pronoun: "él/ella",
    correctAnswer: "esté",
    options: ["esté", "está", "estés", "estemos"],
    explanation: "Estar բայը ստանում է շեշտված վերջավորություններ Presente de Subjuntivo-ում: Él/ella ձևը 'esté' է (շեշտով)։"
  },
  {
    verb: "ir",
    meaning: "գնալ (անկանոն բայ)",
    pronoun: "nosotros",
    correctAnswer: "vayamos",
    options: ["vayamos", "vamos", "vaya", "vayáis"],
    explanation: "Ir բայի Subjuntivo հիմքն է 'vaya-': Nosotros դեմքում այն դառնում է 'vayamos' (համեմատիր Indicativo 'vamos'-ի հետ)։"
  },
  {
    verb: "tener",
    meaning: "ունենալ (yo-ից կազմվող անկանոն)",
    pronoun: "yo",
    correctAnswer: "tenga",
    options: ["tenga", "tengo", "tiene", "tengas"],
    explanation: "Tener-ի yo ձևն է 'tengo' -> հիմքը 'teng-': Վերջավորությունը -a-ով է, հետևաբար 'tenga'։"
  },
  {
    verb: "hacer",
    meaning: "անել (yo-ից կազմվող անկանոն)",
    pronoun: "tú",
    correctAnswer: "hagas",
    options: ["hagas", "haces", "haga", "hagamos"],
    explanation: "Hacer-ի yo ձևն է 'hago' -> հիմքը 'hag-': Tú դեմքում դառնում է 'hagas'։"
  },
  {
    verb: "saber",
    meaning: "իմանալ (անկանոն բայ)",
    pronoun: "ellos/ellas",
    correctAnswer: "sepan",
    options: ["sepan", "saben", "sepa", "sepáis"],
    explanation: "Saber բայի Subjuntivo հիմքն է 'sepa-': Ellos/ellas դեմքում դառնում է 'sepan'։"
  },
  {
    verb: "venir",
    meaning: "գալ (yo-ից կազմվող)",
    pronoun: "yo",
    correctAnswer: "venga",
    options: ["venga", "vengo", "vienes", "vengamos"],
    explanation: "Venir-ի yo ձևն է 'vengo' -> հիմքը 'veng-': Yo դեմքի Subjuntivo ձևն է 'venga'։"
  },
  {
    verb: "dar",
    meaning: "տալ (անկանոն բայ)",
    pronoun: "yo",
    correctAnswer: "dé",
    options: ["dé", "doy", "da", "des"],
    explanation: "Dar բայի yo և él/ella Subjuntivo ձևն է 'dé' (գրվում է շեշտային նշանով՝ դիակրիտիկ տիլդայով, de նախդիրից տարբերվելու համար)։"
  },
  {
    verb: "decir",
    meaning: "ասել (yo-ից կազմվող անկանոն)",
    pronoun: "nosotros",
    correctAnswer: "digamos",
    options: ["digamos", "decimos", "digan", "diga"],
    explanation: "Decir-ի yo ձևն է 'digo' -> հիմքը 'dig-': Nosotros դեմքի Subjuntivo ձևն է 'digamos'։"
  }
];

export const game2Questions: IndicativoSubjuntivoQuestion[] = [
  {
    sentenceWithBlank: "Sé que Ana _____ hoy.",
    translation: "Գիտեմ, որ Անան գալիս է այսօր։",
    options: [
      { text: "viene", isCorrect: true, mood: "Indicativo" },
      { text: "venga", isCorrect: false, mood: "Subjuntivo" }
    ],
    explanation: "«Sé que...» (Գիտեմ, որ...) արտահայտում է լիակատար վստահություն և փաստ, ուստի պահանջում է Indicativo (viene)։",
    triggerWord: "Sé que"
  },
  {
    sentenceWithBlank: "Quiero que Ana _____ hoy.",
    translation: "Ուզում եմ, որ Անան գա այսօր։",
    options: [
      { text: "venga", isCorrect: true, mood: "Subjuntivo" },
      { text: "viene", isCorrect: false, mood: "Indicativo" }
    ],
    explanation: "«Quiero que...»-ն արտահայտում է ցանկություն (deseo): Subjuntivo-ն պարտադիր է, քանի որ Անան դեռ չի եկել, դա ուղղակի ցանկություն է:",
    triggerWord: "Quiero que"
  },
  {
    sentenceWithBlank: "Creo que él _____ razón.",
    translation: "Կարծում եմ, որ նա ճիշտ է։",
    options: [
      { text: "tiene", isCorrect: true, mood: "Indicativo" },
      { text: "tenga", isCorrect: false, mood: "Subjuntivo" }
    ],
    explanation: "Դրական «Creo que...» (Կարծում եմ, որ...) արտահայտում է սեփական կարծիքը որպես իրական փաստ, ուստի օգտագործվում է Indicativo (tiene)։",
    triggerWord: "Creo que"
  },
  {
    sentenceWithBlank: "No creo que él _____ razón.",
    translation: "Չեմ կարծում, որ նա ճիշտ լինի։",
    options: [
      { text: "tenga", isCorrect: true, mood: "Subjuntivo" },
      { text: "tiene", isCorrect: false, mood: "Indicativo" }
    ],
    explanation: "Բացասական «No creo que...»-ն արտահայտում է կասկած և անվստահություն, ինչը Subjuntivo-ի դասական տրիգեր է (tenga)։",
    triggerWord: "No creo que"
  },
  {
    sentenceWithBlank: "Es seguro que tú _____ español.",
    translation: "Վստահելի է, որ դու խոսում ես իսպաներեն։",
    options: [
      { text: "hablas", isCorrect: true, mood: "Indicativo" },
      { text: "hables", isCorrect: false, mood: "Subjuntivo" }
    ],
    explanation: "«Es seguro que...»-ն արտահայտում է վստահություն և փաստ, հաստատում է իրականությունը, ուստի օգտագործում է Indicativo:",
    triggerWord: "Es seguro que"
  },
  {
    sentenceWithBlank: "No es seguro que tú _____ español hoy.",
    translation: "Վստահ չէ, որ դու այսօր կխոսես իսպաներեն։",
    options: [
      { text: "hables", isCorrect: true, mood: "Subjuntivo" },
      { text: "hablas", isCorrect: false, mood: "Indicativo" }
    ],
    explanation: "Ժխտական «No es seguro que...»-ն բերում է անորոշություն և կասկած, ուստի պահանջում է Subjuntivo (hables)։",
    triggerWord: "No es seguro que"
  },
  {
    sentenceWithBlank: "Tengo un piso que _____ dos habitaciones.",
    translation: "Ես ունեմ մի բնակարան, որն ունի երկու սենյակ։",
    options: [
      { text: "tiene", isCorrect: true, mood: "Indicativo" },
      { text: "tenga", isCorrect: false, mood: "Subjuntivo" }
    ],
    explanation: "Բնակարանն արդեն գոյություն ունի և հայտնի է խոսողին: Քանի որ այն կոնկրետ է, օգտագործվում է Indicativo (tiene)։",
    triggerWord: "Tengo un piso que"
  },
  {
    sentenceWithBlank: "Busco un piso que _____ dos habitaciones.",
    translation: "Փնտրում եմ մի բնակարան, որը կունենա երկու սենյակ։",
    options: [
      { text: "tenga", isCorrect: true, mood: "Subjuntivo" },
      { text: "tiene", isCorrect: false, mood: "Indicativo" }
    ],
    explanation: "Բնակարանը դեռ հայտնի չէ, այն անորոշ է և միայն փնտրվում է: Ցանկալի անորոշ օբյեկտները պահանջում են Subjuntivo (tenga)։",
    triggerWord: "Busco un piso que"
  }
];

export const game3Questions: WishBuilderQuestion[] = [
  {
    sentenceArmenian: "Ես ուզում եմ, որ դու ավելի շատ սովորես։",
    correctWords: ["Quiero", "que", "estudies", "más"],
    scrambledWords: ["estudies", "Quiero", "más", "que", "estudias", "como"],
    explanation: "Ցանկությունը կազմվում է՝ 'Quiero' (Ես ուզում եմ) + 'que' (որ) + 'estudies' (դու սովորես - Subjuntivo) + 'más' (ավելի շատ)։"
  },
  {
    sentenceArmenian: "Մայրս ուզում է, որ ես շուտ հասնեմ։",
    correctWords: ["Mi", "madre", "quiere", "que", "yo", "llegue", "temprano"],
    scrambledWords: ["quiere", "llegue", "Mi", "temprano", "que", "madre", "yo", "llego", "quiero"],
    explanation: "Ենթակաները տարբեր են (խոսողը և մայրը)՝ 'Mi madre quiere que...' (Մայրս ուզում է, որ...) + Subjuntivo ('yo llegue') + 'temprano' (շուտ)։"
  },
  {
    sentenceArmenian: "Հույս ունեմ, որ լավ օր կունենաս։",
    correctWords: ["Espero", "que", "tengas", "un", "buen", "día"],
    scrambledWords: ["Espero", "tengas", "buen", "que", "un", "día", "tienes", "hagas"],
    explanation: "Կառույցն է՝ 'Espero que...' (Հույս ունեմ, որ...) + Subjuntivo ('tengas' - Tener բայի tú ձևը) + 'un buen día' (լավ օր)։"
  },
  {
    sentenceArmenian: "Երանի վաղը անձրև գա։",
    correctWords: ["Ojalá", "que", "llueva", "mañana"],
    scrambledWords: ["Ojalá", "llueva", "que", "mañana", "llueve", "venga"],
    explanation: "«Ojalá (que)»-ից հետո միշտ գալիս է Subjuntivo: 'Llover' (անձրև գալ) բայից դառնում է 'llueva'։"
  }
];

export const game4Questions: TimeTravelQuestion[] = [
  {
    sentenceWithBlank: "Cuando yo _____ a casa, siempre descanso.",
    translation: "Երբ տուն եմ հասնում, միշտ հանգստանում եմ։",
    context: "habit",
    options: [
      { text: "llego", isCorrect: true, mood: "Indicativo" },
      { text: "llegue", isCorrect: false, mood: "Subjuntivo" }
    ],
    explanation: "Սա սովորություն է/առօրյա ռեժիմ (siempre descanso - միշտ հանգստանում եմ), ոչ թե ապագայի անորոշություն, ուստի օգտագործվում է Indicativo (llego)։"
  },
  {
    sentenceWithBlank: "Cuando _____ a casa, te llamaré.",
    translation: "Երբ տուն հասնեմ, քեզ կզանգեմ։",
    context: "future",
    options: [
      { text: "llegue", isCorrect: true, mood: "Subjuntivo" },
      { text: "llego", isCorrect: false, mood: "Indicativo" }
    ],
    explanation: "Գործողությունը տեղի է ունենալու ապագայում (te llamaré - կզանգեմ): 'Cuando'-ից հետո ապագա իրադարձության մասին խոսելիս պարտադիր է Subjuntivo (llegue)։"
  },
  {
    sentenceWithBlank: "Te escribiré en cuanto _____ tiempo.",
    translation: "Կգրեմ քեզ հենց որ ժամանակ ունենամ։",
    context: "future",
    options: [
      { text: "tenga", isCorrect: true, mood: "Subjuntivo" },
      { text: "tengo", isCorrect: false, mood: "Indicativo" }
    ],
    explanation: "«En cuanto...» (հենց որ) ժամանակային կապն ապագային վերաբերելու դեպքում (te escribiré - կգրեմ քեզ) անմիջապես պահանջում է Subjuntivo (tenga)։"
  },
  {
    sentenceWithBlank: "No salgas hasta que _____ la lluvia.",
    translation: "Դուրս մի՛ արի, մինչև անձրևը վերջանա։",
    context: "future",
    options: [
      { text: "termine", isCorrect: true, mood: "Subjuntivo" },
      { text: "termina", isCorrect: false, mood: "Indicativo" }
    ],
    explanation: "«Hasta que...» (մինչև որ) կապակցությունն ապագա անորոշ սպասման համար պահանջում է Subjuntivo (termine):"
  }
];

export const game5Questions: TriggerCategoryQuestion[] = [
  {
    sentence: "Espero que tengas un buen viaje.",
    translation: "Հույս ունեմ, որ լավ ճանապարհորդություն կունենաս։",
    correctCategory: "Deseo",
    explanation: "«Espero»-ն արտահայտում է ՑԱՆԿՈՒԹՅՈՒՆ (Deseo)՝ հույս ունենալ, որ ինչ-որ իրադարձություն տեղի կունենա։"
  },
  {
    sentence: "Me molesta que la gente hable tan alto.",
    translation: "Ինձ նյարդայնացնում է, որ մարդիկ այդքան բարձր են խոսում։",
    correctCategory: "Emoción",
    explanation: "«Me molesta» (ինձ նյարդայնացնում է) արտահայտում է ԶԳԱՑՄՈՒՆՔ/ԷՄՈՑԻԱ (Emoción)՝ գրգռվածություն։"
  },
  {
    sentence: "Dudo que ellos entiendan la lección.",
    translation: "Կասկածում եմ, որ նրանք կհասկանան դասը։",
    correctCategory: "Duda",
    explanation: "«Dudo» (կասկածում եմ) բայը ուղղակիորեն արտահայտում է ԿԱՍԿԱԾ (Duda)։"
  },
  {
    sentence: "Es necesario que practiques todos los días.",
    translation: "Անհրաժեշտ է, որ դու ամեն օր պարապես։",
    correctCategory: "Necesidad",
    explanation: "«Es necesario que» կառույցն արտահայտում է ԱՆՀՐԱԺԵՇՏՈՒԹՅՈՒՆ (Necesidad)։"
  },
  {
    sentence: "Te pido que me escuches con atención.",
    translation: "Խնդրում եմ, որ ինձ ուշադիր լսես։",
    correctCategory: "Petición",
    explanation: "«Pedir» (Te pido - խնդրում եմ քեզ) բայը արտահայտում է ԽՆԴՐԱՆՔ կամ ՊԱՀԱՆՋ (Petición)։"
  },
  {
    sentence: "Estudio español para que pueda hablar con mis amigos.",
    translation: "Իսպաներեն եմ սովորում, որպեսզի կարողանամ խոսել ընկերներիս հետ։",
    correctCategory: "Para que",
    explanation: "«Para que pueda» արտահայտում է ՆՊԱՏԱԿ (Para que): Այն միշտ պահանջում է Subjuntivo:"
  }
];

export const game6Questions: TranslationQuestion[] = [
  {
    armenian: "Ես ուզում եմ, որ դու գաս։",
    correctSpanish: "Quiero que vengas.",
    options: ["Quiero que vengas.", "Quiero que vienes.", "Espero que vienes.", "Quiero venir."],
    explanation: "«Quiero que...»-ից հետո գալիս է Subjuntivo: Venir բայի tú ձևը Presente de Subjuntivo-ում 'vengas' է:"
  },
  {
    armenian: "Կարևոր է, որ դու սովորես։",
    correctSpanish: "Es importante que estudies.",
    options: ["Es importante que estudies.", "Es importante que estudias.", "Es importante estudiar.", "Te recomiendo estudiar."],
    explanation: "«Es importante que...» (անձնական անդեմ ձև + que) պահանջում է Subjuntivo (estudies)։"
  },
  {
    armenian: "Չեմ կարծում, որ նա ճիշտ է։",
    correctSpanish: "No creo que tenga razón.",
    options: ["No creo que tenga razón.", "Creo que tiene razón.", "No creo que tiene razón.", "No creo de tener razón."],
    explanation: "«No creo que» (Չեմ կարծում) արտահայտությունն ունի կասկածի իմաստ, ուստի պահանջում է Subjuntivo (tenga)։"
  },
  {
    armenian: "Հույս ունեմ, որ ամեն ինչ լավ կլինի։",
    correctSpanish: "Espero que todo vaya bien.",
    options: ["Espero que todo vaya bien.", "Espero que todo va bien.", "Dudo que todo sea bien.", "Ojalá todo va bien."],
    explanation: "«Espero que...»-ն արտահայտում է հույս/ցանկություն: Ir բայի 'todo' դեմքի Subjuntivo ձևն է 'vaya'։"
  },
  {
    armenian: "Ես քեզ զանգում եմ, որպեսզի դու ինձ օգնես։",
    correctSpanish: "Te llamo para que me ayudes.",
    options: ["Te llamo para que me ayudes.", "Te llamo para que me ayudas.", "Me llamas para ayudarte.", "Te llamo para ayudarme."],
    explanation: "Նպատակային «Para que» (որպեսզի) կոնստրուկտը միշտ պահանջում է Subjuntivo-ի օգտագործում (ayudes)։"
  },
  {
    armenian: "Երբ տուն հասնես, գրիր ինձ։",
    correctSpanish: "Cuando llegues a casa, escríbeme.",
    options: ["Cuando llegues a casa, escríbeme.", "Cuando llegas a casa, escríbeme.", "Antes de llegar, me escribes.", "Cuando llegues a casa, me escribes."],
    explanation: "Քանի որ տուն հասնելը ապագա անորոշ ժամանակում է (դեռ տանը չես)՝ 'Cuando'-ից հետո դրվում է Subjuntivo (llegues)։"
  },
  {
    armenian: "Վախենում եմ, որ մենք ուշ կհասնենք։",
    correctSpanish: "Tengo miedo de que lleguemos tarde.",
    options: ["Tengo miedo de que lleguemos tarde.", "Tengo miedo de llegar tarde.", "Me alegra que lleguemos tarde.", "Tengo miedo de que llegamos tarde."],
    explanation: "«Tengo miedo de que...» (Վախենում եմ, որ...) արտահայտությանը հաջորդում է Subjuntivo (lleguemos / nosotros դեմք)։"
  },
  {
    armenian: "Ուրախ եմ, որ դու եկել ես։",
    correctSpanish: "Me alegra que hayas venido.",
    options: ["Me alegra que hayas venido.", "Me alegra que has venido.", "Es una pena que hayas venido.", "Me alegra de venir."],
    explanation: "Սա արդեն կատարված անցյալ գործողության զգացմունքային գնահատականն է՝ օգտագործվում է Subjuntivo Perfecto (hayas venido)։"
  },
  {
    armenian: "Խորհուրդ եմ տալիս, որ հանգստանաս։",
    correctSpanish: "Te recomiendo que descanses.",
    options: ["Te recomiendo que descanses.", "Te recomiendo de descansar.", "Es mejor descansar.", "Te aconsejo que descansas."],
    explanation: "«Te recomiendo que...»-ին հաջորդում է Subjuntivo՝ խորհրդատվություն արտահայտելու համար (descanses)։"
  },
  {
    armenian: "Երանի ավելի շատ ժամանակ ունենայի։",
    correctSpanish: "Ojalá tuviera más tiempo.",
    options: ["Ojalá tuviera más tiempo.", "Ojalá tenga más tiempo.", "Quiero tener más tiempo.", "Ojalá tuviese menos tiempo."],
    explanation: "«Ojalá»-ից հետո անցյալի կամ ներկայի անիրական/անհնարին ցանկություն արտահայտելիս օգտագործվում է Imperfecto de Subjuntivo (tuviera)։"
  }
];
