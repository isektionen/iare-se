import {
    VStack,
    Flex,
    Spacer,
    Wrap,
    Text,
    Button,
    Center,
    Square,
    Box,
    Heading,
    Image,
} from "@chakra-ui/react";
import { Color } from "components/brand/Color";
import { Section } from "components/brand/Section";
import { Typography } from "components/brand/Typography";
import Header from "components/layout/Header";
import { LinkComponent } from "components/LinkComponent";
import { NextImage } from "components/NextImage";
import { NextSeo } from "next-seo";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { useHydrater } from "state/layout";
import { LayoutProps } from "types/global";
import { makeTitle } from "utils/seo";
import { Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const tip_titles = [
    "Kortvarig stress är oftast inte farlig",
    "Oroa dig inte över stress - återhämta dig istället",
    "Vikten av återhämtning",
    "Var uppmärksam på dina sömnrutiner.",
    "Ta mikropauser",
    "- Ägna några minuter åt att mentalt lämna arbetet bakom dig.",
    "Fortsätt med de aktiviteter du tycker om att ägna dig åt på din lediga tid.",
    "Träna/motionera regelbundet, helst i dagsljus.",
    "Lägg märke till förändrade energinivåer.",
    "Uppmärksamma och visa omtanke om dina kollegor.",
    "Skapa en sömnrutin",
    "Var uppmärksam på ditt behov av mat och dryck.",
    "Be om hjälp.",
    "Gör fysiska avbrott och bryt mönstret.",
    "Kom tillbaka in i kroppen genom avslappning.",
    "Lös problem tillsammans med dina kollegor.",
    "Tänk på de saker du har löst trots att du först inte visste vad du skulle göra.",
    "Medveten närvaro",
    "Prata med en kollega om era bedrifter och positiva erfarenheter",
    "Kom ut i naturen!",
    "Motion för kognition.",
    "Bekräfta och validera oro.",
    "Visa medkänsla för dig själv",
    "Var tillmötesgående så ofta du kan.",
    "Visa intresse för en kollega och lyssna till problem.",
    "Acceptera känslor med lugn och avslappning",
    "Var den du är så ofta du kan.",
    "Ge dig själv och andra beröm.",
    "Använd tuggummi i samband med stressfulla perioder",
];

const tip_texts = [
    "Stress är en naturlig reaktion på påfrestande situationer som kan uppstå bl a. på jobbet, i relationer, eller av andra skäl. Kroppen och sinnet kan hantera höga nivåer av kortvarig stress utan att detta orsakar ohälsa, och man återhämtar sig vanligtvis snabbt. Denna dagbok går igenom olika faktorer som leder till stress för att hjälpa dig att öka din förståelse för vilka situationer som orsakar stress för just dig, och hur du kan hantera den på bästa sätt. \nTa några minuter nu för att reflektera över hur just du känner dig när du är stressad, och när det uppstår. Vad händer i kroppen när du är stressad? Vad brukar du göra när du känner dig stressad?",
    "Oro och ältande över stress kan ibland vara ett större problem än det som orsakar stress. Oron över stress gör det svårt att slappna av, vilket kan leda till att man slutar göra de saker man mår bra utav av rädsla för att bli stressad.  Exempelvis undviker man utmanande situationer, blir inaktiv, eller minskar sin sociala kontakt. En annan alltför vanlig strategi för att hantera stress är alkohol och tobak, som kan kännas bra i stunden men över tid minska kroppens motståndskraft att hantera stress.  \nMed bättre kunskap om stress och återhämtning kan man lättare släppa sin oro och skapa förutsättningar för återhämtning - genom bra sömn, motion, och ett fritidsintresse som upplevs meningsfullt. Fundera nu en stund – vad vet du om stress och återhämtning? Vad har du för frågor? Vad mer vill du veta?",
    "Återhämtning - nedvarvning av vår aktiveringsnivå - är vårt huvudsakliga botemedel mot stress. Ohälsa orsakas sällan av stressen i sig, men av bristen på effektiv återhämtning.  \nStresshantering handlar således om att skapa effektiva återhämtningsbeteenden. Dagboken kommer ge dig en mer detaljerad bild av återhämtning och hur den kan fungera som bäst för dig.  Du kan börja reflektera kring detta nu: Vad gör du för att återhämta dig? Ger du dig själv tillräckligt mycket tid för återhämtning?",
    "Sömnen är otroligt viktig för vårt välbefinnande och vårt primära sätt att återhämta oss.  Sömnsvårigheter är vanliga vid stress, men kortvariga sömnproblem är inte farligt och det finns enkla praktiska råd för att sova bättre. Försök hålla regelbundna sömntider och komma ut för att aktivera kroppen någon gång under dagen, såsom att ta en promenad i solen eller stretcha på balkongen.  \nDu kan också tänka på att hålla rummet du sover i mörkt, tyst, och svalt. Ta gärna lite tid på kvällen för att varva ned innan det är dags för sömn. Optimalt är att undvika elektronik tätt inpå att du ska lägga dig ifall det är möjligt.",
    "Ett annat sätt att återhämta sig är att vila under dagen - stunder då man helt enkelt kopplar av och släpper kraven på kraven från jobbet. När vi har mycket att göra och känner oss stressade kan det dock vara svårt att hitta tid för längre pauser. Det kan även vara så att gränsen för jobb och rast suddas ut och att de normala uppehållen i arbetet försvinner. Då är det särskilt viktigt och givande att flera gånger dagligen göra korta avbrott – mikropauser – och sätta sig ned, blunda och andas djupt i någon minut.",
    "Tiden mellan arbetspass är viktig för vår återhämtning och ger oss mest vila när vi inte tar med jobbtankar till hemmet och fritiden. Ett sätt att inte ta med sig arbetet hem är att tydligt markera slutet på arbetsdagen. Det är värdefullt med ett tillfälle / rutin som signalerar att dagen är slut - till exempel att byta om, ta en promenad till bussen, eller ventilera arbetsdagen med en kollega.",
    "En viktig del i en hälsosam livsstil är att kunna koppla bort arbetet och ägna sig åt andra meningsfulla aktiviteter. Det sociala livet med intressen, nöjen och umgänge med vänner och familj har en stor betydelse för både vår återhämtning och förmåga att orka stå emot påfrestningar i yrkeslivet. När vi gör sådant vi tycker om brukar vi kunna koppla av och avlägsna oss mentalt från jobb och andra kravfyllda måsten. Även om det kan kännas som att tiden inte räcker till eller att man är alldeles för trött för att orka, är det ändå viktigt att planera in minst en social aktivitet i veckan. Fundera på vad du tycker om att göra och vad som ger dig ny energi!",
    "Motion är viktigt för vår hälsa, men när vi har mycket att göra hinner vi inte gå till gymmet och fysisk aktivitet nedprioriteras. Minst lika viktigt är dock vardagsmotionen, som är lättare att få in även i ett pressat tidsschema. Fundera på om du kan gå eller cykla till jobbet, ta trapporna istället för hissen eller ägna en del av lunchrasten åt att promenera i dagsljus. Några minuter per dag räcker för att få bättre sömn, mer ork och känna sig gladare.",
    "Det är normalt att våra energinivåer förändras under dagen. Genom att uppmärksamma när du är som mest skärpt och har gott om energi kan du anpassa dina aktiviteter utifrån när du fungerar bäst. Om det är möjligt, planera så att du lägger tyngre uppgifter när du är som piggast och lugnare aktiviteter när energinivåerna är som lägst.",
    "Det kan vara nog svårt att påminna sig själv om rutiner och hälsosamma beteenden, men det kan betyda mycket för stämningen på arbetsplatsen om man även visar omsorg för arbetskamraternas mående. Det kan räcka med att erbjuda någon hjälp eller påminna om mat, dryck, en kort paus, eller föreslå att man tar en promenad tillsammans under lunchen.",
    "Sömn är inte bara viktig för att vila kroppen, utan har stor inverkan på vår kognition. En viktig aspekt av att sova bättre är att skapa en rutin du gör innan du lägger dig, så att man kan komma ner i varv och signalera att det är slut på arbete för dagen. Stäng av elektronik, sänk gärna belysningen i hemmet, och gör någon lugn aktivitet. Exempel är att läsa en bok, mjuk yoga, eller en avslappningsövning. Hitta en rutin som funkar för dig!",
    "Vid stress tenderar vi att bli mindre uppmärksamma på kroppens signaler, såsom hunger och törst. Det är lätt att man bara kör på och slarvar med mat och vatten. Skapa en rutin för detta genom att fundera på när behovet att fylla på med energi och näring är som störst, och planera ditt intag utifrån det. Regelbundna matvanor ger ett jämnare blodsocker, vilket får dig att känna minskad trötthet, ökad koncentration och minskat sug efter att småäta.",
    "När problem uppstår är det lätt att man försöker lösa dem på egen hand istället för att be en kollega om hjälp. Speciellt med fysiska krav avgör dagsformen vad man klarar av – har man ont i ryggen en dag går det bra att fråga andra att göra de tyngre lyften. Det kan till och med stärka gruppen så att man känner sig trygg och säker med sina kollegor.",
    "Oavsett vad du gör så är det nyttigt för kroppen att bryta mönstret. Har du suttit länge så res dig och ta en kort stretch. Är du inomhus med en svår arbetsuppgift så gå ut för frisk luft och försök släppa jobb-tankarna ett tag. Är du väldigt spänd i kroppen så gör en avslappningsövning. Överlag så är målet att vara vaken för kroppens signaler och ge sig \nutrymme att svara på kroppens behov.",
    "När vi känner mycket press på jobbet kan vi bli spända och oroliga. Enkla mindfulness-övningar kan då vara till hjälp för att lättare slappna av och flytta fokus från oro och grubblerier till sin egen kropp och återfå lugn. Du kan öva avslappning både hemma och på jobbet, sittande, liggande eller stående. En enkel övning som kan öka kroppslig närvaro är att ta några djupa andetag, känna kroppens tyngd mot underlaget och slappna av kroppen.",
    "Att lösa problem tillsammans med sina kollegor är viktigt för att stärka gemenskapen, svetsa samman gruppen, och få alla att känna sig delaktiga och trygga på arbetsplatsen. Det är dessutom ett fint tillfälle att lära sig av andra och dra nytta av varandras olika erfarenheter och kunskaper. I svåra tider är det viktigt att inte arbeta ensam längre stunder utan social kontakt, särskilt om du märker att du går med tunga tankar. Att lösa en uppgift tillsammans med en kollega kan skingra tankarna och öka känslan av gemenskap och samhörighet.",
    "Alla har varit med om påfrestande perioder på jobbet då man ställts inför helt nya situationer och fått göra uppgifter man inte testat tidigare eller visste hur de skulle lösas. Även om det har varit svårt, nervöst, eller kanske inte alltid gått exakt som planerat har du tagit dig an uppgiften och hanterat problemet. Genom att uppmärksamma situationer som du bemästrat trots rådande omständigheter kan du öka tilltron till din egen förmåga, och denna känsla finns med dig att plocka fram vid framtida svårigheter i arbetet.",
    "Mindfulness, alltså kvalitén av att vara närvarande i nuet, är kopplat till många kognitiva fördelar – exempelvis minskad stress, ökad koncentrationsförmåga, och förbättrad uppmärksamhet. Denna förmåga går att träna upp! Hitta några minuter att sitta still, fokusera på lugna andetag, och släppa andra tankar. När du märker att tankarna försvunnit bort från nuet så för du uppmärksamheten tillbaka till andningen.",
    "En förutsättning för att klara av arbetet och bibehålla ork och energi är att uppmärksamma positiva erfarenheter och händelser. Även om det ibland är svårt att hitta glädjeämnen, så finns de där. Vi har en tendens att låta negativt innehåll helt överskugga sådant som faktiskt fungerat och varit bra. Att prata med en kollega om vad som varit mest betydande kan vara värdefullt, inte minst för att synliggöra dina egna och kollegors bedrifter.",
    "Att vara ute i friska luften och dagsljus har många positiva effekter på vår kognition – bland annat förbättrat arbetsminne och ökad uppmärksamhet. Det ger även tid för reflektion och att kunna släppa jobb-relaterade tankar. Ifall du inte har tid med en lång skogspromenad är det värdefullt att helt enkelt komma utanför dörren för att få i sig dagsljus och titta på himlen, observera träden, och lyssna på fåglarna.",
    "Motion är minst lika viktig för vår mentala som vår fysiska hälsa. Att träna kroppen är att träna hjärnan vilket ger fantastiska fördelar – bland annat leder det till bättre inlärningsförmåga, förbättrade exekutiva funktioner, och bättre förmåga att hantera stress. Tänk på att det inte krävs en avancerad gymrutin för att få en god effekt – det räcker med att få upp pulsen ett par gånger i veckan. Cykla till jobbet, spela en kul sport, eller lek med barnen så ger du hjärnan en bra boost på ett enkelt sätt.",
    "I påfrestande tider finns det ofta ett behov av medkänsla från omgivningen. Om en kollega uttrycker oro är det viktigt att hen känner sig sedd och lyssnad till. Att validera någon innebär att i ord och handling ta en annan individs perspektiv och uttrycka förståelse för dennes situation, känslor och tankar. Istället för att säga ”du behöver inte oroa dig” kan man säga ”jag förstår att du är orolig, finns det något vi kan göra tillsammans för att minska oron?”. Detta icke-dömande förhållningssätt kan man även använda i kommunikationen med sig själv. Vi reagerar olika på svåra omständigheter och det är viktigt att tillåta sig att känna på det sätt man gör och acceptera att man känner just så.",
    "Att visa medkänsla fungerar som ett motgift mot negativa känslor och det finns en rad positiva hälsovinster med att vara snäll mot sig själv. Bland annat kan det ge bättre sömn, ökat psykiskt välbefinnande, och skyddar även mot stress och yttre påfrestningar. Öva på att uppmärksamma dina känslor med mjukhet - använd en inre samtalston som är vänlig och stöttande, och acceptera att du gör så gott du kan.",
    "Att vara generös, tålmodig och överseende är inte så lätt alla gånger, men en tillmötesgående grundinställning bidrar till både ens eget och andras välbefinnande. Att hjälpa andra och stötta kollegor i jobbiga situationer kan motverka stressreaktioner, öka motståndskraften mot påfrestningar och få oss att känna oss välmående betydligt längre än om vi bara hade fokuserat på oss själva. Genom att stötta andra hjälper vi alltså oss själva! Det kan vara svårt att fråga om hjälp och därför brukar det fungera att i förväg komma överens med sina kollegor hur man kan signalera när man behöver stöd eller avlastning i sitt arbete.",
    "Ett sätt att stärka relationen till sina kollegor är att visa medkänsla och omtanke om varandra. Det är viktigt att ha förståelse för andras känslor och bekräfta andras upplevelser (även om de inte stämmer överens med dina egna). Att uppmärksamma andra fungerar även som ett motgift mot egna påfrestande känslor. Ett empatiskt förhållningssätt kan minska risken för konflikter och öka känslan av gemenskap och trygghet.",
    "När vi upplever intensiva känslor blir man lätt spänd och orolig. Istället för att möta frustration och stress med en dömande attityd kan det hjälpa att slappna av och acceptera hur man mår där och då. Enkla mindfulness-övningar kan då vara till hjälp för att lättare slappna av och flytta fokus från oro och grubblerier till sin egen kropp och återfå lugn. En enkel övning som kan göras när och var som helst är att ta ett par djupa och långsamma andetag, där man slappnar av kroppen vid varje utandning.",
    "Vi påverkas olika av påfrestande situationer och det finns inget “rätt” sätt att reagera på. En kraftfull reaktion är till exempel inte nödvändig för att undgå problem senare. Både ens sätt att reagera och behovet av bearbetning skiljer sig åt mellan individer. Vissa kan behöva bearbeta sina känslor direkt, andra vid ett senare tillfälle – och några inte alls. Det viktiga är att känna efter vad man själv mår bra av och acceptera att vi är olika.",
    "I ansträngda tider, när arbetet präglas av stress och hög belastning, är det lätt att falla in i tankemönster som fokuserar på negativa omständigheter. Det är därför viktigt att påminna sig själv om positiva aspekter (de finns!) och reflektera över sina egna och andras prestationer. Se till att ge dig själv och andra beröm! Genom att dagligen ta sig tid till att uppmärksamma sådant som man själv eller någon annan gjort bra kan välmående på arbetsplatsen öka – god stämning smittar och skapar ett positivt sammanhang som man kan trivas i.",
    "Om du har en examination eller en period av mycket arbete kan du testa att tugga tuggummi för att minska stress och ångest samt öka fokus. Flera studier visar på att tuggummi kan ha en positiv effekt för stresshantering och fokus. Mekanismen för hur denna effekt uppnås är inte helt förstådd. En möjlig förklaring skulle kunna vara att tuggumi sätter fokus på käkrörelsen och aktiverar det lugnande parasympatiska nervsystemet. Välj den sockerfria varianten där det står xylitol på framsidan för maximal hälsofördel. Tänk även på att inte tugga mer än 5 tuggummi per dag då det kan ha en laxerande effekt i överdrivna mängder. Du är fri att använda tuggummi när du vill under dagen eller kvällen.",
];

const tip_titles_en = [
    "Kortvarig stress är oftast inte farlig",
    "Oroa dig inte över stress - återhämta dig istället",
    "Vikten av återhämtning",
    "Var uppmärksam på dina sömnrutiner.",
    "Ta mikropauser",
    "- Ägna några minuter åt att mentalt lämna arbetet bakom dig.",
    "Fortsätt med de aktiviteter du tycker om att ägna dig åt på din lediga tid.",
    "Träna/motionera regelbundet, helst i dagsljus.",
    "Lägg märke till förändrade energinivåer.",
    "Uppmärksamma och visa omtanke om dina kollegor.",
    "Skapa en sömnrutin",
    "Var uppmärksam på ditt behov av mat och dryck.",
    "Be om hjälp.",
    "Gör fysiska avbrott och bryt mönstret.",
    "Kom tillbaka in i kroppen genom avslappning.",
    "Lös problem tillsammans med dina kollegor.",
    "Tänk på de saker du har löst trots att du först inte visste vad du skulle göra.",
    "Medveten närvaro",
    "Prata med en kollega om era bedrifter och positiva erfarenheter",
    "Kom ut i naturen!",
    "Motion för kognition.",
    "Bekräfta och validera oro.",
    "Visa medkänsla för dig själv",
    "Var tillmötesgående så ofta du kan.",
    "Visa intresse för en kollega och lyssna till problem.",
    "Acceptera känslor med lugn och avslappning",
    "Var den du är så ofta du kan.",
    "Ge dig själv och andra beröm.",
    "Använd tuggummi i samband med stressfulla perioder",
];

const tip_texts_en = [
    "Stress är en naturlig reaktion på påfrestande situationer som kan uppstå bl a. på jobbet, i relationer, eller av andra skäl. Kroppen och sinnet kan hantera höga nivåer av kortvarig stress utan att detta orsakar ohälsa, och man återhämtar sig vanligtvis snabbt. Denna dagbok går igenom olika faktorer som leder till stress för att hjälpa dig att öka din förståelse för vilka situationer som orsakar stress för just dig, och hur du kan hantera den på bästa sätt. \nTa några minuter nu för att reflektera över hur just du känner dig när du är stressad, och när det uppstår. Vad händer i kroppen när du är stressad? Vad brukar du göra när du känner dig stressad?",
    "Oro och ältande över stress kan ibland vara ett större problem än det som orsakar stress. Oron över stress gör det svårt att slappna av, vilket kan leda till att man slutar göra de saker man mår bra utav av rädsla för att bli stressad.  Exempelvis undviker man utmanande situationer, blir inaktiv, eller minskar sin sociala kontakt. En annan alltför vanlig strategi för att hantera stress är alkohol och tobak, som kan kännas bra i stunden men över tid minska kroppens motståndskraft att hantera stress.  \nMed bättre kunskap om stress och återhämtning kan man lättare släppa sin oro och skapa förutsättningar för återhämtning - genom bra sömn, motion, och ett fritidsintresse som upplevs meningsfullt. Fundera nu en stund – vad vet du om stress och återhämtning? Vad har du för frågor? Vad mer vill du veta?",
    "Återhämtning - nedvarvning av vår aktiveringsnivå - är vårt huvudsakliga botemedel mot stress. Ohälsa orsakas sällan av stressen i sig, men av bristen på effektiv återhämtning.  \nStresshantering handlar således om att skapa effektiva återhämtningsbeteenden. Dagboken kommer ge dig en mer detaljerad bild av återhämtning och hur den kan fungera som bäst för dig.  Du kan börja reflektera kring detta nu: Vad gör du för att återhämta dig? Ger du dig själv tillräckligt mycket tid för återhämtning?",
    "Sömnen är otroligt viktig för vårt välbefinnande och vårt primära sätt att återhämta oss.  Sömnsvårigheter är vanliga vid stress, men kortvariga sömnproblem är inte farligt och det finns enkla praktiska råd för att sova bättre. Försök hålla regelbundna sömntider och komma ut för att aktivera kroppen någon gång under dagen, såsom att ta en promenad i solen eller stretcha på balkongen.  \nDu kan också tänka på att hålla rummet du sover i mörkt, tyst, och svalt. Ta gärna lite tid på kvällen för att varva ned innan det är dags för sömn. Optimalt är att undvika elektronik tätt inpå att du ska lägga dig ifall det är möjligt.",
    "Ett annat sätt att återhämta sig är att vila under dagen - stunder då man helt enkelt kopplar av och släpper kraven på kraven från jobbet. När vi har mycket att göra och känner oss stressade kan det dock vara svårt att hitta tid för längre pauser. Det kan även vara så att gränsen för jobb och rast suddas ut och att de normala uppehållen i arbetet försvinner. Då är det särskilt viktigt och givande att flera gånger dagligen göra korta avbrott – mikropauser – och sätta sig ned, blunda och andas djupt i någon minut.",
    "Tiden mellan arbetspass är viktig för vår återhämtning och ger oss mest vila när vi inte tar med jobbtankar till hemmet och fritiden. Ett sätt att inte ta med sig arbetet hem är att tydligt markera slutet på arbetsdagen. Det är värdefullt med ett tillfälle / rutin som signalerar att dagen är slut - till exempel att byta om, ta en promenad till bussen, eller ventilera arbetsdagen med en kollega.",
    "En viktig del i en hälsosam livsstil är att kunna koppla bort arbetet och ägna sig åt andra meningsfulla aktiviteter. Det sociala livet med intressen, nöjen och umgänge med vänner och familj har en stor betydelse för både vår återhämtning och förmåga att orka stå emot påfrestningar i yrkeslivet. När vi gör sådant vi tycker om brukar vi kunna koppla av och avlägsna oss mentalt från jobb och andra kravfyllda måsten. Även om det kan kännas som att tiden inte räcker till eller att man är alldeles för trött för att orka, är det ändå viktigt att planera in minst en social aktivitet i veckan. Fundera på vad du tycker om att göra och vad som ger dig ny energi!",
    "Motion är viktigt för vår hälsa, men när vi har mycket att göra hinner vi inte gå till gymmet och fysisk aktivitet nedprioriteras. Minst lika viktigt är dock vardagsmotionen, som är lättare att få in även i ett pressat tidsschema. Fundera på om du kan gå eller cykla till jobbet, ta trapporna istället för hissen eller ägna en del av lunchrasten åt att promenera i dagsljus. Några minuter per dag räcker för att få bättre sömn, mer ork och känna sig gladare.",
    "Det är normalt att våra energinivåer förändras under dagen. Genom att uppmärksamma när du är som mest skärpt och har gott om energi kan du anpassa dina aktiviteter utifrån när du fungerar bäst. Om det är möjligt, planera så att du lägger tyngre uppgifter när du är som piggast och lugnare aktiviteter när energinivåerna är som lägst.",
    "Det kan vara nog svårt att påminna sig själv om rutiner och hälsosamma beteenden, men det kan betyda mycket för stämningen på arbetsplatsen om man även visar omsorg för arbetskamraternas mående. Det kan räcka med att erbjuda någon hjälp eller påminna om mat, dryck, en kort paus, eller föreslå att man tar en promenad tillsammans under lunchen.",
    "Sömn är inte bara viktig för att vila kroppen, utan har stor inverkan på vår kognition. En viktig aspekt av att sova bättre är att skapa en rutin du gör innan du lägger dig, så att man kan komma ner i varv och signalera att det är slut på arbete för dagen. Stäng av elektronik, sänk gärna belysningen i hemmet, och gör någon lugn aktivitet. Exempel är att läsa en bok, mjuk yoga, eller en avslappningsövning. Hitta en rutin som funkar för dig!",
    "Vid stress tenderar vi att bli mindre uppmärksamma på kroppens signaler, såsom hunger och törst. Det är lätt att man bara kör på och slarvar med mat och vatten. Skapa en rutin för detta genom att fundera på när behovet att fylla på med energi och näring är som störst, och planera ditt intag utifrån det. Regelbundna matvanor ger ett jämnare blodsocker, vilket får dig att känna minskad trötthet, ökad koncentration och minskat sug efter att småäta.",
    "När problem uppstår är det lätt att man försöker lösa dem på egen hand istället för att be en kollega om hjälp. Speciellt med fysiska krav avgör dagsformen vad man klarar av – har man ont i ryggen en dag går det bra att fråga andra att göra de tyngre lyften. Det kan till och med stärka gruppen så att man känner sig trygg och säker med sina kollegor.",
    "Oavsett vad du gör så är det nyttigt för kroppen att bryta mönstret. Har du suttit länge så res dig och ta en kort stretch. Är du inomhus med en svår arbetsuppgift så gå ut för frisk luft och försök släppa jobb-tankarna ett tag. Är du väldigt spänd i kroppen så gör en avslappningsövning. Överlag så är målet att vara vaken för kroppens signaler och ge sig \nutrymme att svara på kroppens behov.",
    "När vi känner mycket press på jobbet kan vi bli spända och oroliga. Enkla mindfulness-övningar kan då vara till hjälp för att lättare slappna av och flytta fokus från oro och grubblerier till sin egen kropp och återfå lugn. Du kan öva avslappning både hemma och på jobbet, sittande, liggande eller stående. En enkel övning som kan öka kroppslig närvaro är att ta några djupa andetag, känna kroppens tyngd mot underlaget och slappna av kroppen.",
    "Att lösa problem tillsammans med sina kollegor är viktigt för att stärka gemenskapen, svetsa samman gruppen, och få alla att känna sig delaktiga och trygga på arbetsplatsen. Det är dessutom ett fint tillfälle att lära sig av andra och dra nytta av varandras olika erfarenheter och kunskaper. I svåra tider är det viktigt att inte arbeta ensam längre stunder utan social kontakt, särskilt om du märker att du går med tunga tankar. Att lösa en uppgift tillsammans med en kollega kan skingra tankarna och öka känslan av gemenskap och samhörighet.",
    "Alla har varit med om påfrestande perioder på jobbet då man ställts inför helt nya situationer och fått göra uppgifter man inte testat tidigare eller visste hur de skulle lösas. Även om det har varit svårt, nervöst, eller kanske inte alltid gått exakt som planerat har du tagit dig an uppgiften och hanterat problemet. Genom att uppmärksamma situationer som du bemästrat trots rådande omständigheter kan du öka tilltron till din egen förmåga, och denna känsla finns med dig att plocka fram vid framtida svårigheter i arbetet.",
    "Mindfulness, alltså kvalitén av att vara närvarande i nuet, är kopplat till många kognitiva fördelar – exempelvis minskad stress, ökad koncentrationsförmåga, och förbättrad uppmärksamhet. Denna förmåga går att träna upp! Hitta några minuter att sitta still, fokusera på lugna andetag, och släppa andra tankar. När du märker att tankarna försvunnit bort från nuet så för du uppmärksamheten tillbaka till andningen.",
    "En förutsättning för att klara av arbetet och bibehålla ork och energi är att uppmärksamma positiva erfarenheter och händelser. Även om det ibland är svårt att hitta glädjeämnen, så finns de där. Vi har en tendens att låta negativt innehåll helt överskugga sådant som faktiskt fungerat och varit bra. Att prata med en kollega om vad som varit mest betydande kan vara värdefullt, inte minst för att synliggöra dina egna och kollegors bedrifter.",
    "Att vara ute i friska luften och dagsljus har många positiva effekter på vår kognition – bland annat förbättrat arbetsminne och ökad uppmärksamhet. Det ger även tid för reflektion och att kunna släppa jobb-relaterade tankar. Ifall du inte har tid med en lång skogspromenad är det värdefullt att helt enkelt komma utanför dörren för att få i sig dagsljus och titta på himlen, observera träden, och lyssna på fåglarna.",
    "Motion är minst lika viktig för vår mentala som vår fysiska hälsa. Att träna kroppen är att träna hjärnan vilket ger fantastiska fördelar – bland annat leder det till bättre inlärningsförmåga, förbättrade exekutiva funktioner, och bättre förmåga att hantera stress. Tänk på att det inte krävs en avancerad gymrutin för att få en god effekt – det räcker med att få upp pulsen ett par gånger i veckan. Cykla till jobbet, spela en kul sport, eller lek med barnen så ger du hjärnan en bra boost på ett enkelt sätt.",
    "I påfrestande tider finns det ofta ett behov av medkänsla från omgivningen. Om en kollega uttrycker oro är det viktigt att hen känner sig sedd och lyssnad till. Att validera någon innebär att i ord och handling ta en annan individs perspektiv och uttrycka förståelse för dennes situation, känslor och tankar. Istället för att säga ”du behöver inte oroa dig” kan man säga ”jag förstår att du är orolig, finns det något vi kan göra tillsammans för att minska oron?”. Detta icke-dömande förhållningssätt kan man även använda i kommunikationen med sig själv. Vi reagerar olika på svåra omständigheter och det är viktigt att tillåta sig att känna på det sätt man gör och acceptera att man känner just så.",
    "Att visa medkänsla fungerar som ett motgift mot negativa känslor och det finns en rad positiva hälsovinster med att vara snäll mot sig själv. Bland annat kan det ge bättre sömn, ökat psykiskt välbefinnande, och skyddar även mot stress och yttre påfrestningar. Öva på att uppmärksamma dina känslor med mjukhet - använd en inre samtalston som är vänlig och stöttande, och acceptera att du gör så gott du kan.",
    "Att vara generös, tålmodig och överseende är inte så lätt alla gånger, men en tillmötesgående grundinställning bidrar till både ens eget och andras välbefinnande. Att hjälpa andra och stötta kollegor i jobbiga situationer kan motverka stressreaktioner, öka motståndskraften mot påfrestningar och få oss att känna oss välmående betydligt längre än om vi bara hade fokuserat på oss själva. Genom att stötta andra hjälper vi alltså oss själva! Det kan vara svårt att fråga om hjälp och därför brukar det fungera att i förväg komma överens med sina kollegor hur man kan signalera när man behöver stöd eller avlastning i sitt arbete.",
    "Ett sätt att stärka relationen till sina kollegor är att visa medkänsla och omtanke om varandra. Det är viktigt att ha förståelse för andras känslor och bekräfta andras upplevelser (även om de inte stämmer överens med dina egna). Att uppmärksamma andra fungerar även som ett motgift mot egna påfrestande känslor. Ett empatiskt förhållningssätt kan minska risken för konflikter och öka känslan av gemenskap och trygghet.",
    "När vi upplever intensiva känslor blir man lätt spänd och orolig. Istället för att möta frustration och stress med en dömande attityd kan det hjälpa att slappna av och acceptera hur man mår där och då. Enkla mindfulness-övningar kan då vara till hjälp för att lättare slappna av och flytta fokus från oro och grubblerier till sin egen kropp och återfå lugn. En enkel övning som kan göras när och var som helst är att ta ett par djupa och långsamma andetag, där man slappnar av kroppen vid varje utandning.",
    "Vi påverkas olika av påfrestande situationer och det finns inget “rätt” sätt att reagera på. En kraftfull reaktion är till exempel inte nödvändig för att undgå problem senare. Både ens sätt att reagera och behovet av bearbetning skiljer sig åt mellan individer. Vissa kan behöva bearbeta sina känslor direkt, andra vid ett senare tillfälle – och några inte alls. Det viktiga är att känna efter vad man själv mår bra av och acceptera att vi är olika.",
    "I ansträngda tider, när arbetet präglas av stress och hög belastning, är det lätt att falla in i tankemönster som fokuserar på negativa omständigheter. Det är därför viktigt att påminna sig själv om positiva aspekter (de finns!) och reflektera över sina egna och andras prestationer. Se till att ge dig själv och andra beröm! Genom att dagligen ta sig tid till att uppmärksamma sådant som man själv eller någon annan gjort bra kan välmående på arbetsplatsen öka – god stämning smittar och skapar ett positivt sammanhang som man kan trivas i.",
    "Om du har en examination eller en period av mycket arbete kan du testa att tugga tuggummi för att minska stress och ångest samt öka fokus. Flera studier visar på att tuggummi kan ha en positiv effekt för stresshantering och fokus. Mekanismen för hur denna effekt uppnås är inte helt förstådd. En möjlig förklaring skulle kunna vara att tuggumi sätter fokus på käkrörelsen och aktiverar det lugnande parasympatiska nervsystemet. Välj den sockerfria varianten där det står xylitol på framsidan för maximal hälsofördel. Tänk även på att inte tugga mer än 5 tuggummi per dag då det kan ha en laxerande effekt i överdrivna mängder. Du är fri att använda tuggummi när du vill under dagen eller kvällen.",
];

const View = ({ header, footer }: LayoutProps<{}>) => {
    useHydrater({ header, footer });

    const { t, lang } = useTranslation("wellbeing");

    // Calculate day from start of year
    var now: any = new Date();
    var start: any = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);

    var today_tip_index = day % tip_titles.length;

    return (
        <React.Fragment>
            <NextSeo title={makeTitle(t("seo:wellbeing.title"))} />

            <Box
                p={{ base: "0.5em", md: "2em" }}
                margin="0 auto"
                w={{ base: "100%", sm: "80%", md: "60%" }}
            >
                <Flex pb="2em" justifyContent="space-between">
                    <Box flex="1" textAlign="left">
                        <Heading verticalAlign="bottom" mt="2em">
                            {t("title")}
                        </Heading>
                    </Box>
                </Flex>

                {/* Intro */}
                <Box pb="4em">
                    <p>{t("explanation")}</p>
                    <br></br>
                    <Link
                        href="https://drive.google.com/file/d/1bdMQcFk1cjmVgjSzM-Ibv4qi1l5a201O/view?usp=sharing"
                        isExternal
                    >
                        {lang == "sv"
                            ? "Resurser för Välmående"
                            : "Resources for well being"}{" "}
                        <ExternalLinkIcon mx="2px" />
                    </Link>
                    <br></br>
                    <br></br>
                    <p>
                        <b>{lang == "sv" ? tip_titles[0] : tip_titles_en[0]}</b>
                    </p>
                    <p>{lang == "sv" ? tip_texts[0] : tip_texts_en[0]}</p>
                </Box>

                {/* Today Tip */}
                <Box mb="4em" p="1em" bg="yellow.100">
                    <Heading pb="0.5em">{t("header.today")}</Heading>
                    <p>
                        <b>
                            {lang == "sv"
                                ? tip_titles[today_tip_index]
                                : tip_titles_en[today_tip_index]}
                        </b>
                    </p>
                    <p>
                        {lang == "sv"
                            ? tip_texts[today_tip_index]
                            : tip_texts_en[today_tip_index]}
                    </p>
                </Box>

                {/* All Tips */}
                <Box>
                    <Heading pb="0.5em">{t("header.all")}</Heading>
                    <hr></hr>
                    <br></br>
                    {tip_titles.map((item, index) => {
                        return (
                            <div>
                                <p>
                                    <b>
                                        {lang == "sv"
                                            ? tip_titles[index]
                                            : tip_titles_en[index]}
                                    </b>
                                </p>
                                <p>
                                    {lang == "sv"
                                        ? tip_texts[index]
                                        : tip_texts_en[index]}
                                </p>
                                <br></br>
                            </div>
                        );
                    })}
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default View;
