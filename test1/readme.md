Netpeople Frontend feladat dokumentáció

Megnéztem a látványtervet, majd ez alapján felépítettem egy drótvázat magamnak. 
Létrehoztam egy gulp és egy webpackes fájlt a fordításhoz. Fejlesztés közben az utóbbit használtam.
Telepítettem a json servert, hogy a fel tudjam használni a tartalmakat. 
A feladatot úgy oldottam, meg hogy a json fájlból egyedi azonosítók alapján generálja ki az adatokat. Az egyszerűségre törekedtem, remélem annyira nem lett bonyolult. 
Egy-egy jsx fájl írja le a “templateket”
A json-t axiossal kérem le. 
A dátumválasztónál sajnos nem tudtam megoldani, a léptetést, ott csak böngésző görgetőjét lehet használni.
Próbáltam a mobil first megoldást, mivel a tablet nézetről nincs látványterv, ezért a mobilt vettem alapul. 
Egyedileg kigenerált fontawesome ikonokat használtam, mert sajnos ezzel a webes programmal nem tudtam kiszedni az ikonokat. Remélem a célnak és a szemléltetésnek megfelel. 

npm json elindítja a json servert 4000 porton.
npm start a projektet localhoston
npm run build vagy gulp paranccsal elindul a build. Dist és Public mappába jön létre a projekt. A gulp-inject miatt érdemes 2x futtatni a gulp paracsot.  # plecsi
