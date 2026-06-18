import { TheorySection } from './types';

export const theorySections: TheorySection[] = [
  {
    id: 1,
    title: "1. Indicativo և Subjuntivo տարբերությունը",
    subtitle: "Փաստ, իրականություն ընդդեմ ցանկության և անորոշության",
    content: "Subjuntivo-ն իսպաներենում եղանակ է, որը օգտագործվում է, երբ խոսում ենք ոչ թե հաստատված փաստի, այլ՝ ցանկության, կասկածի, զգացմունքի, խնդրանքի, անհրաժեշտության, նպատակի, անորոշության մասին։ Հայերենում առանձին նման խոնարհման համակարգ չկա, դրա համար սկզբում դժվար է թվում։",
    examples: [
      {
        spanish: "Sé que Ana viene.",
        armenian: "Ես գիտեմ, որ Անան գալիս է (Indicativo — փաստ, իրականություն: Այստեղ խոսողը վստահ է՝ Անան գալիս է):"
      },
      {
        spanish: "Quiero que Ana venga.",
        armenian: "Ես ուզում եմ, որ Անան գա (Subjuntivo — ոչ հաստատ, ցանկություն, կասկած: Այստեղ Անան դեռ չի եկել: Դա ցանկություն է):"
      }
    ]
  },
  {
    id: 2,
    title: "2. Ինչպես կազմել Presente de Subjuntivo",
    subtitle: "Հիմնական կանոնը և բայախմբերը",
    content: "Վերցնում ենք yo ձևը Presente de Indicativo-ից, հանում ենք -o, հետո ավելացնում վերջավորությունները։",
    examples: [
      {
        spanish: "hablar (խոսել) -> yo hablo -> habl- + Subjuntivo վերջավորություններ",
        armenian: "Quiero que hables español. (Ես ուզում եմ, որ դու խոսես իսպաներեն։)"
      },
      {
        spanish: "comer (ուտել) -> yo como -> com- + Subjuntivo վերջավորություններ",
        armenian: "Es importante que comas bien. (Կարևոր է, որ դու լավ սնվես։)"
      },
      {
        spanish: "vivir (ապրել) -> yo vivo -> viv- + Subjuntivo վերջավորություններ",
        armenian: "Espero que vivas feliz. (Հույս ունեմ, որ դու երջանիկ ապրես։)"
      }
    ]
  },
  {
    id: 3,
    title: "3. Հիմնական վերջավորությունները",
    subtitle: "Conjugaciones de Presente de Subjuntivo",
    content: "Հիշելու համար՝\n- -AR բայերը ստանում են -e վերջավորություններ (hablar → hable, hables, hable...)\n- -ER / -IR բայերը ստանում են -a վերջավորություններ (comer → coma, comas, coma...)",
    tables: [
      {
        headers: ["Դեմք / Բայախումբ", "-AR (hablar)", "-ER (comer)", "-IR (vivir)"],
        rows: [
          ["yo", "hable", "coma", "viva"],
          ["tú", "hables", "comas", "vivas"],
          ["él/ella/usted", "hable", "coma", "viva"],
          ["nosotros/as", "hablemos", "comamos", "vivamos"],
          ["vosotros/as", "habléis", "comáis", "viváis"],
          ["ellos/ellas/ustedes", "hablen", "coman", "vivan"]
        ],
        caption: "Presente de Subjuntivo-ի հիմնական խոնարհման աղյուսակը"
      }
    ]
  },
  {
    id: 4,
    title: "4. Ե՞րբ ենք օգտագործում Subjuntivo — 1. Ցանկություն (deseo)",
    subtitle: "Querer, Esperar, Desear, Ojalá",
    content: "Օգտագործվում է querer que, esperar que, desear que, ojalá que արտահայտություններից հետո։",
    examples: [
      {
        spanish: "Quiero que estudies más.",
        armenian: "Ես ուզում եմ, որ դու ավելի շատ սովորես (Querer que — ուզել, որ):"
      },
      {
        spanish: "Mi madre quiere que yo llegue temprano.",
        armenian: "Մայրս ուզում է, որ ես շուտ հասնեմ:"
      },
      {
        spanish: "Espero que tengas un buen día.",
        armenian: "Հույս ունեմ, որ լավ օր կունենաս (Esperar que — հույս ունենալ, որ):"
      },
      {
        spanish: "Esperamos que todo salga bien.",
        armenian: "Հույս ունենք, որ ամեն ինչ լավ կանցնի:"
      },
      {
        spanish: "Ojalá que llueva mañana.",
        armenian: "Երանի վաղը անձրև գա (Ojalá que — երանի / հուսամ):"
      },
      {
        spanish: "Ojalá que apruebes el examen.",
        armenian: "Երանի քննությունը հանձնես:"
      }
    ]
  },
  {
    id: 5,
    title: "5. Զգացմունքներ — emociones",
    subtitle: "Alegria, molestía, sorpresa, miedo, pena",
    content: "Եթե գլխավոր նախադասության մեջ կա զգացմունք, երկրորդականում գրեթե միշտ օգտագործում ենք Subjuntivo, երբ ենթակաները տարբեր են։",
    examples: [
      {
        spanish: "Me alegra que estés aquí.",
        armenian: "Ուրախ եմ, որ դու այստեղ ես (Me alegra que — ուրախ եմ, որ):"
      },
      {
        spanish: "Me molesta que hables tan alto.",
        armenian: "Ինձ նյարդայնացնում է, որ դու այդքան բարձր ես խոսում (Me molesta que — ինձ նյարդայնացնում է, որ):"
      },
      {
        spanish: "Tengo miedo de que él no venga.",
        armenian: "Վախենում եմ, որ նա չգա (Tengo miedo de que — վախենում եմ, որ):"
      },
      {
        spanish: "Es una pena que no puedas venir.",
        armenian: "Ցավալի է, որ չես կարող գալ (Es una pena que — ցավալի է, որ):"
      }
    ]
  },
  {
    id: 6,
    title: "6. Կասկած և անվստահություն — duda",
    subtitle: "Duda, incertidumbre, posibilidad",
    content: "Subjuntivo օգտագործում ենք, երբ կա կասկած կամ երբ լիովին վստահ չենք գործողության իրակությանը։",
    examples: [
      {
        spanish: "Dudo que él sepa la respuesta.",
        armenian: "Կասկածում եմ, որ նա գիտի պատասխանը (Dudo que — կասկածում եմ, որ):"
      },
      {
        spanish: "No creo que María venga hoy.",
        armenian: "Չեմ կարծում, որ Մարիան այսօր կգա (No creo que — չեմ կարծում, որ):"
      },
      {
        spanish: "Es es posible que llueva.",
        armenian: "Հնարավոր է, որ անձրև գա (Es posible que — հնարավոր է, որ):"
      },
      {
        spanish: "Puede que tengamos problemas.",
        armenian: "Գուցե խնդիրներ ունենանք (Puede que — գուցե):"
      }
    ]
  },
  {
    id: 7,
    title: "7. Բայց՝ creer / pensar դրական ձևով Indicativo է",
    subtitle: "Կարևորագույն բացառությունն ու նրբությունը",
    content: "Սա շատ կարևոր կանոն է։ Դրական ձևով կարծիք հայտնելը համարվում է փաստային հաստատում, ուստի պահանջում է Indicativo: Բացասական ձևով այն անցնում է Subjuntivo-ի։",
    examples: [
      {
        spanish: "Creo que él viene. (Indicativo)",
        armenian: "Կարծում եմ, որ նա գալիս է (որովհետև խոսողն իր կարծիքը հայտնում է որպես իր համար փաստ):"
      },
      {
        spanish: "Pienso que tienes razón. (Indicativo)",
        armenian: "Կարծում եմ՝ դու ճիշտ ես:"
      },
      {
        spanish: "No creo que él venga. (Subjuntivo)",
        armenian: "Չեմ կարծում, որ նա գա (բացասական No creo que-ն պահանջում է Subjuntivo):"
      },
      {
        spanish: "No pienso que tengas razón. (Subjuntivo)",
        armenian: "Չեմ կարծում, որ դու ճիշտ ես:"
      }
    ]
  },
  {
    id: 8,
    title: "8. Անհրաժեշտություն և խորհուրդ",
    subtitle: "Es necesario, importante, recomendable",
    content: "Subjuntivo-ն պարտադիր է անձնական գնահատական պարունակող անդեմ կառույցներից հետո, երբ հաջորդում է que-ն։",
    examples: [
      {
        spanish: "Es importante que estudies todos los días.",
        armenian: "Կարևոր է, որ դու ամեն օր սովորես (Es importante que — կարևոր է, որ):"
      },
      {
        spanish: "Es necesario que lleguemos a tempo.",
        armenian: "Անհրաժեշտ է, որ մենք ժամանակին հասնենք (Es necesario que — անհրաժեշտ է, որ):"
      },
      {
        spanish: "Es mejor que descanses.",
        armenian: "Ավելի լավ է, որ դու հանգստանաս (Es mejor que — ավելի լավ է, որ):"
      },
      {
        spanish: "Te recomiendo que leas este libro.",
        armenian: "Խորհուրդ եմ տալիս, որ դու կարդաս այս գիրքը (Te recomiendo/aconsejo que — խորհուրդ եմ տալիս, որ):"
      }
    ]
  },
  {
    id: 9,
    title: "9. Խնդրանք, հրաման, պահանջ",
    subtitle: "Pedir, decir, mandar, exigir, permitir, prohibir",
    content: "Օգտագործվում է, երբ մեկ մարդ ուզում է, որ մյուսը ինչ-որ բան անի կամ չանի, արգելի կամ թույլատրի։",
    examples: [
      {
        spanish: "Te pido que me ayudes.",
        armenian: "Խնդրում եմ, որ դու ինձ օգնես (pedir que — խնդրել, որ):"
      },
      {
        spanish: "La professora dice que escribamos la tarea.",
        armenian: "Ուսուցչուհին ասում է, որ մենք գրենք առաջադրանքը (decir que — հրահանգել/ասել, որ):"
      },
      {
        spanish: "Mi padre no permite que salga tarde.",
        armenian: "Հայրս թույլ չի տալիս, որ ես ուշ դուրս գամ (permitir que — թույլ տալ, որ):"
      },
      {
        spanish: "Está prohibido que fumes aquí.",
        armenian: "Արգելված է, որ այստեղ ծխես (prohibir que — արգելել, որ):"
      }
    ]
  },
  {
    id: 10,
    title: "10. Նպատակ — para que",
    subtitle: "Para que նշանակում է՝ որպեսզի",
    content: "«Para que»-ից հետո միշտ Subjuntivo է գալիս, որովհետև խոսքը նպատակի մասին է, որն իրականանալի է, բայց դեռևս ոչ փաստացի։",
    examples: [
      {
        spanish: "Te llamo para que me ayudes.",
        armenian: "Ես քեզ զանգում եմ, որպեսզի դու ինձ օգնես:"
      },
      {
        spanish: "Estudio español para que pueda viajar a España.",
        armenian: "Ես իսպաներեն եմ սովորում, որպեսզի կարողանամ ճանապարհորդել Իսպանիա:"
      },
      {
        spanish: "Habla más despacio para que te entienda.",
        armenian: "Խոսի՛ր ավելի դանդաղ, որպեսզի ես քեզ հասկանամ:"
      }
    ]
  },
  {
    id: 11,
    title: "11. Ժամանակային կապեր՝ երբ գործողությունը ապագայում է",
    subtitle: "Cuando, después de que, antes de que, hasta que, en cuanto, tan pronto como",
    content: "Այս բառերից հետո Subjuntivo է լինում, եթե խոսքը ապագայի մասին է։ Բայց եթե խոսքը սովորական սովորույթի կամ անցյալի փաստի մասին է, օգտագործում ենք *Indicativo*:",
    examples: [
      {
        spanish: "Cuando llegue a casa, te llamaré. (Subjuntivo — ապագա)",
        armenian: "Երբ տուն հասնեմ, քեզ կզանգեմ (երբ գործողությունը ապագայում է):"
      },
      {
        spanish: "Cuando llego a casa, descanso. (Indicativo — սովորույթ)",
        armenian: "Երբ տուն եմ հասնում, հանգստանում եմ (սովորական գործողություն է, ոչ թե ապագա անորոշություն)։"
      },
      {
        spanish: "Te escribiré en cuanto tenga tiempo.",
        armenian: "Կգրեմ քեզ հենց որ ժամանակ ունենամ:"
      },
      {
        spanish: "No salgas hasta que termine la lluvia.",
        armenian: "Դուրս մի՛ արի, մինչև անձրևը վերջանա:"
      },
      {
        spanish: "Vamos a comer después de que lleguen los niños.",
        armenian: "Մենք կուտենք այն բանից հետո, երբ երեխաները գան:"
      }
    ]
  },
  {
    id: 12,
    title: "12. Aunque — չնայած",
    subtitle: "Aunque-ի երկակի բնույթը",
    content: "Aunque-ից հետո կարող է լինել և՛ Indicativo, և՛ Subjuntivo՝ կախված նրանից, թե փաստը հաստատված է, թե ենթադրական է:",
    examples: [
      {
        spanish: "Aunque está cansado, trabaja. (Indicativo)",
        armenian: "Չնայած նա հոգնած է, աշխատում է (խոսողը հաստատ գիտի, որ նա հոգնած է)։"
      },
      {
        spanish: "Aunque esté cansado, trabajará. (Subjuntivo)",
        armenian: "Նույնիսկ եթե հոգնած լինի, կաշխատի (եթե փաստը հաստատ չէ կամ նշանակություն չունի, այլ ենթադրություն է)։"
      }
    ]
  },
  {
    id: 13,
    title: "13. Անորոշ մարդ կամ բան",
    subtitle: "Ցանկալի, բայց դեռ չգտնված օբյեկտներ",
    content: "Եթե խոսում ենք մարդու կամ բանի մասին, որը կոնկրետ հայտնի չէ, օգտագործվում է Subjuntivo: Եթե այն հայտնի է ու կոնկրետ՝ Indicativo:",
    examples: [
      {
        spanish: "Busco un piso que tenga dos habitaciones. (Subjuntivo)",
        armenian: "Փնտրում եմ բնակարան, որը ունենա երկու սենյակ (փնտրում եմ, բայց դեռ չգիտեմ՝ կգտնեմ, թե չէ)։"
      },
      {
        spanish: "Tengo un piso que tiene dos habitaciones. (Indicativo)",
        armenian: "Ես ունեմ բնակարան, որն ունի երկու սենյակ (բնակարանն իրական է և հայտնի)։"
      },
      {
        spanish: "Necesito alguien que hable español.",
        armenian: "Ինձ պետք է մեկը, ով խոսի իսպաներեն (անորոշ անձ):"
      },
      {
        spanish: "Quiero comprar un coche que sea barato.",
        armenian: "Ուզում եմ գնել մեքենա, որը էժան լինի:"
      }
    ]
  },
  {
    id: 14,
    title: "14. Ամենակարևոր անկանոն Subjuntivo բայերը",
    subtitle: "Ser, Estar, Ir, Haber, Saber, Dar",
    content: "Այս բայերն ունեն ամբողջովին անկանոն հիմքեր, որոնք պետք է անգիր հիշել:",
    tables: [
      {
        headers: ["Դեմք", "Ser (լինել)", "Estar (լինել/գտնվել)", "Ir (գնալ)", "Haber (լինել/օժանդակ)", "Saber (իմանալ)", "Dar (տալ)"],
        rows: [
          ["yo", "sea", "esté", "vaya", "haya", "sepa", "dé"],
          ["tú", "seas", "estés", "vayas", "hayas", "sepas", "des"],
          ["él/ella", "sea", "esté", "vaya", "haya", "sepa", "dé"],
          ["nosotros", "seamos", "estemos", "vayamos", "hayamos", "sepamos", "demos"],
          ["vosotros", "seáis", "estéis", "vayáis", "hayáis", "sepáis", "deis"],
          ["ellos/as", "sean", "estén", "vayan", "hayan", "sepan", "den"]
        ]
      }
    ],
    examples: [
      {
        spanish: "Quiero que seas feliz.",
        armenian: "Ուզում եմ, որ դու երջանիկ լինես (Ser):"
      },
      {
        spanish: "Espero que estés bien.",
        armenian: "Հույս ունեմ, որ լավ ես (Estar):"
      },
      {
        spanish: "No quiero que vayas solo.",
        armenian: "Չեմ ուզում, որ դու մենակ գնաս (Ir):"
      },
      {
        spanish: "Espero que haya comida.",
        armenian: "Հույս ունեմ, որ ուտելիք լինի (Haber):"
      },
      {
        spanish: "Dudo que él sepa la verdad.",
        armenian: "Կասկածում եմ, որ նա գիտի ճշմարտությունը (Saber):"
      },
      {
        spanish: "Quiero que me des una respuesta.",
        armenian: "Ուզում եմ, որ դու ինձ պատասխան տաս (Dar):"
      }
    ]
  },
  {
    id: 15,
    title: "15. Այլ շատ օգտագործվող անկանոններ",
    subtitle: "Tener, Venir, Hacer, Decir, Poner, Salir",
    content: "Այս բայերի Subjuntivo-ն կազմվում է նրանց Presente de Indicativo yo ձևերից (tengo -> tenga, vengo -> venga, hago -> haga, digo -> diga, pongo -> ponga, salgo -> salga):",
    tables: [
      {
        headers: ["Դեմք", "Tener (ունենալ)", "Venir (գալ)", "Hacer (անել)", "Decir (ասել)", "Poner (դնել)", "Salir (դուրս գալ)"],
        rows: [
          ["yo", "tenga", "venga", "haga", "diga", "ponga", "salga"],
          ["tú", "tengas", "vengas", "hagas", "digas", "pongas", "salgas"],
          ["él/ella", "tenga", "venga", "haga", "diga", "ponga", "salga"],
          ["nosotros", "tengamos", "vengamos", "hagamos", "digamos", "pongamos", "salgamos"],
          ["vosotros", "tengáis", "vengáis", "hagáis", "digáis", "pongáis", "salgáis"],
          ["ellos/as", "tengan", "vengan", "hagan", "digan", "pongan", "salgan"]
        ]
      }
    ],
    examples: [
      {
        spanish: "Espero que tengas suerte.",
        armenian: "Հույս ունեմ, որ հաջողություն ունենաս (Tener):"
      },
      {
        spanish: "Quiero que vengas conmigo.",
        armenian: "Ուզում եմ, որ դու ինձ հետ գաս (Venir):"
      },
      {
        spanish: "Es importante que hagas la tarea.",
        armenian: "Կարևոր է, որ դու անես տնայինը (Hacer):"
      },
      {
        spanish: "No quiero que digas eso.",
        armenian: "Չեմ ուզում, որ դու դա ասես (Decir):"
      },
      {
        spanish: "Te pido que ponga el libro aquí.",
        armenian: "Խնդրում եմ, որ գիրքը այստեղ դնես (Poner):"
      },
      {
        spanish: "No quiero que salgas tarde.",
        armenian: "Չեմ ուզում, որ դու ուշ դուրս գաս (Salir):"
      }
    ]
  },
  {
    id: 16,
    title: "16. Subjuntivo Perfecto",
    subtitle: "Haber-ի subjuntivo + participio",
    content: "Օգտագործվում է, երբ գործողությունը արդեն կատարվել է, բայց խոսքը դեռ կապ ունի ներկայի կամ ապագայի գնահատականի հետ։",
    tables: [
      {
        headers: ["Դեմք", "Haber (Subjuntivo)", "Participio (Օրինակ՝ entendido, venido, terminado)"],
        rows: [
          ["yo", "haya", "participio (e.g., hablado / comido / vivido)"],
          ["tú", "hayas", "participio"],
          ["él/ella", "haya", "participio"],
          ["nosotros", "hayamos", "participio"],
          ["vosotros", "hayáis", "participio"],
          ["ellos/ellas", "hayan", "participio"]
        ]
      }
    ],
    examples: [
      {
        spanish: "Espero que hayas entendido.",
        armenian: "Հույս ունեմ, որ հասկացել ես:"
      },
      {
        spanish: "Me alegra que hayas venido.",
        armenian: "Ուրախ եմ, որ եկել ես:"
      },
      {
        spanish: "Dudo que él haya terminado el trabajo.",
        armenian: "Կասկածում եմ, որ նա ավարտել է աշխատանքը:"
      }
    ]
  },
  {
    id: 17,
    title: "17. Imperfecto de Subjuntivo",
    subtitle: "Անցյալ Subjuntivo",
    content: "Սա անցյալ Subjuntivo-ն է։ Օգտագործվում է, երբ գլխավոր նախադասությունը անցյալ ժամանակով է: Օրինակ՝ Quiero que vengas -> Quería que vinieras.",
    tables: [
      {
        headers: ["Դեմք", "hablar (խոսել)", "comer (ուտել) / vivir (ապրել)", "ir / ser (viniendo de fuera)"],
        rows: [
          ["yo", "hablara", "comiera / viviera", "fuera"],
          ["tú", "hablaras", "comieras / vivieras", "fueras"],
          ["él/ella", "hablara", "comiera / viviera", "fuera"],
          ["nosotros", "habláramos", "comiéramos / viviéramos", "fuéramos"],
          ["vosotros", "hablarais", "comierais / vivierais", "fuerais"],
          ["ellos/as", "hablaran", "comieran / vivieran", "fueran"]
        ]
      }
    ],
    examples: [
      {
        spanish: "Quería que hablaras conmigo.",
        armenian: "Ուզում էի, որ դու խոսեիր ինձ հետ:"
      },
      {
        spanish: "Era importante que estudiáramos más.",
        armenian: "Կարևոր էր, որ մենք ավելի շատ սովորեինք:"
      },
      {
        spanish: "No creía que él tuviera razón.",
        armenian: "Չէի կարծում, որ նա ճիշտ էր:"
      }
    ]
  },
  {
    id: 18,
    title: "18. Pluscuamperfecto de Subjuntivo",
    subtitle: "Hubiera / Hubiese + Participio",
    content: "Սա օգտագործվում է անցյալի անիրական կամ ափսոսանքի իրավիճակներում (երրորդ տիպի պայմանական նախադասություններում)։",
    examples: [
      {
        spanish: "Ojalá hubiera estudiado más.",
        armenian: "Երանի ավելի շատ սովորած լինեի:"
      },
      {
        spanish: "No creía que hubieras terminado.",
        armenian: "Չէի կարծում, որ դու ավարտած լինեիր:"
      },
      {
        spanish: "Si hubiera tenido tiempo, habría ido.",
        armenian: "Եթե ժամանակ ունենայի / ունեցած լինեի, կգնայի:"
      }
    ]
  },
  {
    id: 19,
    title: "19. Շատ կարևոր համեմատություններ",
    subtitle: "Infinitivo, Indicativo և Subjuntivo",
    content: "Իսպաներենի քերականության նրբությունները ակնառու համեմատություններով.",
    examples: [
      {
        spanish: "Quiero estudiar. (Infinitivo)",
        armenian: "Ուզում եմ սովորել (նույն մարդն է՝ ես ուզում եմ, ես էլ սովորեմ, չկա 'que'):"
      },
      {
        spanish: "Quiero que estudies. (Subjuntivo)",
        armenian: "Ուզում եմ, որ դու սովորես (երկու տարբեր մարդիկ են՝ ես ուզում եմ, դու սովորես, կա 'que'):"
      },
      {
        spanish: "Espero que todo vaya bien. (Subjuntivo)",
        armenian: "Հույս ունեմ, որ ամեն ինչ լավ կընթանա:"
      },
      {
        spanish: "Espero que no tengas problemas. (Subjuntivo)",
        armenian: "Հույս ունեմ, որ խնդիրներ չունենաս:"
      },
      {
        spanish: "Creo que Ana está en casa. (Indicativo)",
        armenian: "Կարծում եմ, որ Անան տանն է (վստահություն/դրական կարծիք)։"
      },
      {
        spanish: "No creo que Ana esté en casa. (Subjuntivo)",
        armenian: "Չեմ կարծում, որ Անան տանը լինի (ժխտական կարծիք/կասկած)։"
      },
      {
        spanish: "Es importante estudiar. (Infinitivo)",
        armenian: "Կարևոր է սովորել (ընդհանուր միտք է, առանց կոնկրետ ենթակայի)։"
      },
      {
        spanish: "Es importante que estudies. (Subjuntivo)",
        armenian: "Կարևոր է, որ դու սովորես (կոնկրետ մարդ կա՝ դու)։"
      }
    ]
  },
  {
    id: 20,
    title: "20. Ամենաօգտակար օրինակներ",
    subtitle: "Պատրաստի արտահայտություններ առօրյա խոսքի համար",
    content: "Այս նախադասությունները շատ հաճախ են օգտագործվում իսպանախոս միջավայրում. փորձիր անգիր սովորել դրանք:",
    examples: [
      { spanish: "Quiero que me ayudes.", armenian: "Ուզում եմ, որ դու ինձ օգնես:" },
      { spanish: "Espero que estés bien.", armenian: "Հույս ունեմ, որ լավ ես:" },
      { spanish: "No creo que sea difícil.", armenian: "Չեմ կարծում, որ դա դժվար լինի:" },
      { spanish: "Es posible que lleguemos tarde.", armenian: "Հնարավոր է, որ մենք ուշ հասնենք:" },
      { spanish: "Es necesario que practiques todos los días.", armenian: "Անհրաժեշտ է, որ դու ամեն օր պարապես:" },
      { spanish: "Me alegra que te guste España.", armenian: "Ուրախ եմ, որ քեզ դուր է գալիս Իսպանիան:" },
      { spanish: "Tengo miedo de que no tengamos tiempo.", armenian: "Վախենում եմ, որ ժամանակ չունենանք:" },
      { spanish: "Te recomiendo que descanses.", armenian: "Խորհուրդ եմ տալիս, որ հանգստանաս:" },
      { spanish: "Llámame cuando llegues.", armenian: "Զանգիր ինձ, երբ հասնես:" },
      { spanish: "Estudia para que apruebes el examen.", armenian: "Սովորիր, որպեսզի քննությունը հանձնես:" }
    ]
  },
  {
    id: 21,
    title: "21. Կարճ բանաձևեր հիշելու համար",
    subtitle: "Subjuntivo Quick Formulas",
    content: "Արագ հուշաթերթիկներ քննության կամ զրույցի համար.",
    examples: [
      { spanish: "Quiero que + Subjuntivo (Ցանկություն)", armenian: "Quiero que vengas. (Ուզում եմ, որ գաս։)" },
      { spanish: "No creo que + Subjuntivo (Կասկած)", armenian: "No creo que sea verdad. (Չեմ կարծում, որ ճիշտ լինի։)" },
      { spanish: "Me alegra que + Subjuntivo (Զգացմունք)", armenian: "Me alegra que estés aquí. (Ուրախ եմ, որ այստեղ ես։)" },
      { spanish: "Es necesario que + Subjuntivo (Անհրաժեշտություն)", armenian: "Es necesario que estudies. (Անհրաժեշտ է, որ սովորես։)" },
      { spanish: "Para que + Subjuntivo (Նպատակ)", armenian: "Te llamo para que vengas. (Զանգում եմ քեզ, որպեսզի գաս։)" },
      { spanish: "Cuando + Subjuntivo (Ապագա Ժամանակ)", armenian: "Cuando llegue, te llamaré. (Երբ հասնեմ, քեզ կզանգեմ։)" }
    ]
  },
  {
    id: 22,
    title: "22. Փոքր վարժություն",
    subtitle: "Թարգմանիր իսպաներեն",
    content: "Ստորև տրված են 10 հիմնական նախադասություններն ու դրանց ճիշտ պատասխանները: Այս նախադասությունները կարող ես մարզել նաև մեր «Թարգմանչական Խաղ» բաժնում:",
    examples: [
      { spanish: "Quiero que vengas.", armenian: "1. Ես ուզում եմ, որ դու գաս։" },
      { spanish: "Es importante que estudies.", armenian: "2. Կարևոր է, որ դու սովորես։" },
      { spanish: "No creo que tenga razón.", armenian: "3. Չեմ կարծում, որ նա ճիշտ է։" },
      { spanish: "Espero que todo vaya bien.", armenian: "4. Հույս ունեմ, որ ամեն ինչ լավ կլինի։" },
      { spanish: "Te llamo para que me ayudes.", armenian: "5. Ես քեզ զանգում եմ, որպեսզի դու ինձ օգնես։" },
      { spanish: "Cuando llegues a casa, escríbeme.", armenian: "6. Երբ տուն հասնես, գրիր ինձ։" },
      { spanish: "Tengo miedo de que lleguemos tarde.", armenian: "7. Վախենում եմ, որ մենք ուշ կհասնենք։" },
      { spanish: "Me alegra que hayas venido.", armenian: "8. Ուրախ եմ, որ դու եկել ես։" },
      { spanish: "Te recomiendo que descanses.", armenian: "9. Խորհուրդ եմ տալիս, որ հանգստանաս։" },
      { spanish: "Ojalá tuviera más tiempo.", armenian: "10. Երանի ավելի շատ ժամանակ ունենայի։" }
    ]
  }
];
