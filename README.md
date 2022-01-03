# Project TherapyTracker

TherapyTracker je aplikacija koja omogucava lako pracenje pacijenata, njihovih klinickih stanja, biopsija koje su odradili, i onkoloskih terapija koje su im prepisane. <br>
Cilj aplikacije da svi podaci budu lako dostupni i pregledni, kao i da njeno koriscenje bude lako i intuitivno. 

# Pokretanje projekta iz izvornog koda:
Da bi se klijent i server pokrenuli, potrebno je prvo na sistemu instalirati [Node](https://nodejs.org/en/download/), [MongoDB](https://www.mongodb.com/try/download/community) i [Mongo Shell](https://www.mongodb.com/try/download/shell) <br>
Za importovanje test podataka u bazu, potrebno je instalirati i dodatne [Mongo alate](https://www.mongodb.com/try/download/database-tools) od kojih je potreban alat `mongoimport`<br>

Da bi se projekat skinuo, na sistemu je potrebno instalirati i [git](https://git-scm.com/downloads) <br>
Izvorni kod projekta preuzeti komandom: `git clone https://gitlab.com/matfpveb/projekti/2021-2022/02-TherapyTracker.git` <br>
i komandom `cd 02-TherapyTracker/` uci u direktorijum projekta

# Pokretanje servera:
Nakon kloniranja projekta, pozicionirati se u folder `server` i u komandoj liniji pokrenuti komandu `npm install` <br>
Ovo ce instalirati sve neophodne biblioteke.
Pokrenuti server komandom `node run server.js`

# Pokretanje klijenta:
Slicno kao i za pokretnaje servera. <br>
Pozicionirati se u folder `client`, i instalirtai sve potrebne biblioteke komandom `npm install`<br>
Nakon toga pokrenuti klijent komandom `ng serve` 



## Developers

- [Jovan Djordjevic, 164/2017](https://gitlab.com/JovanDjordjevic)
- [Selena Hocevar, 140/2017](https://gitlab.com/selena.hocevar)
- [Petar Rondovic, 167/2017](https://gitlab.com/mi17167)
