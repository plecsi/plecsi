A package.json file-ban elérhetőek a függőségek. Fordításhoz a Gulp-ot használtam. Egy config.json file-ban adtam meg, hogy mit fordítson a gulp. A gulp paranccsal lefut a build, amely létrehozza a public mappát. A gulp watch-ra pedig bármelyik src fájlban változás történik, akkor mindig csak az adott fájlt buildeli le. 

A js-ben load-dal hívom meg a html "componenseket", hogy jól átlátható legyen a html struktúra.
A feladat során törekedtem a mobile first megközelítésre! Így mobil nézet megegyezik a terv-vel, sm és md nézet hiányában ígyekeztem a konzisztenciára, majd lg nézettől jelenik meg a terv szerinti desktop nézet. Ha minden jól ment, akkor nem esik szét sehol az oldal. 

Az ikonokat úgy oldottam meg, hogy font-ként jelenítem meg. Ezen kívül az egyszerűség kedvéért külön nem töltöttem le a google font készletet, csak beimportáltam. 
A variebles.scss-ben csak azokat a módosításokat végeztem a bootstap alapon, ami szükséges volt.
Az scss-eseket is külön komponensenként határoztam meg, hogy jól átlátható legyen.