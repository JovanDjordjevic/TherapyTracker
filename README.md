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

# Schema baze podataka 
<table>
<tr>
<th>Patients</th>
<th>Biopsies</th>
<th>Tumors</th>
<th>Therapies</th>
<th>Counter</th>
</tr>
<tr>
<td>

 Polje              | Tip        | Opis                                                         |
 -------------------| -----------|--------------------------------------------------------------|
 _id                | ObjectId   |                                                              |
 jmbg               | String     |                                                              |
 name               | String     |                                                              |
 parentName         | String     |                                                              |
 surname            | String     |                                                              |
 yearOfBirth        | Number     |                                                              |
 gender             | String     |                                                              |
 menopause          | Number     |                                                              |
 address            | String     |                                                              |
 city               | String     |                                                              |
 contact            | String     |                                                              |
 email              | String     |                                                              |
 tumorDateDiagnosis | Date       |                                                              |
 familyAnamnesis    | String     |                                                              |
 date               | Date       | datum otvaranja kartona                                      |
 index              | String     | indeks kartona                                               |
 isClinicalStateSet | Boolean    | flag kojim se obelezava da li je postavljeno klinicko stanje |
 tStage             | String     |                                                              |
 nStage             | Number     |                                                              |
 mStage             | Number     |                                                              |
 tnmStage           | String     |                                                              |
 clinicalStage      | String     |                                                              |
 _biopsyIds         | [ObjectId] | lista biopsija pacijenta                                     |
 _tumorIds          | [ObjectId] | lista tumora pacijenta                                       |
 _therapyIds        | [ObjectId] | lista terapija pacijenta                                     |
</td>
<td>

 Polje              | Tip      | Opis                  |
 -------------------| ---------|-----------------------|
 _id                | ObjectId |                       |
 date               | Date     |                       |
 biopsySide         | String   | strana biopsije       |
 biopsyTypeLeft     | String   |                       |
 numLeft            | String   | indeks leve biopsije  |
 histotypeLeft      | String   |                       |
 multifocalityLeft  | String   |                       |
 biopsyTypeRight    | String   |                       |
 numRight           | String   | indeks desne biopsije |
 histotypeRight     | String   |                       |
 multifocalityRight | String   |                       |
 comment            | String   |                       |
 patient            | ObjectId |                       |
</td>
<td>

 Polje            | Tip      | Opis                                                     |
 -----------------| ---------|----------------------------------------------------------|
 _id              | ObjectId |                                                          |
 date             | Date     |                                                          |
 name             | String   |                                                          |
 biopsyIndex      | String   | indeks biopsije kojom se izvrsila karakterizacija tumora |
 gradus           | String   |                                                          |
 erScore          | Number   |                                                          |
 erScorePercent   | Number   |                                                          |
 erStatus         | Number   |                                                          |
 pgrScore         | Number   |                                                          |
 pgrScorePercent  | Number   |                                                          |
 pgrStatus        | Number   |                                                          |
 her2INC          | Number   |                                                          |
 her2INCPercent   | Number   |                                                          |
 her2_FISH_SICH   | String   |                                                          |
 her2Status       | Number   |                                                          |
 ki67             | String   |                                                          |
 molecularSubtype | Number   |                                                          |
 patient          | ObjectId |                                                          |

</td>
<td>

 Polje                | Tip      | Opis                                                         |
 ---------------------| ---------|--------------------------------------------------------------|
 _id                  | ObjectId |                                                              |
 therapyType          | String   |                                                              |
 isTherapyResponseSet | Boolean  | flag kojim se obelezava da li je postavljen odgovor terapije |
 therapyResponse      | String   |                                                              |
 numCycles            | Number   |                                                              |
 numTaxol             | Number   |                                                              |
 numTxtr              | Number   |                                                              |
 herceptinTherapy     | String   |                                                              |
 date                 | Date     |                                                              |
 therapyShortString   | String   |                                                              |
 comment              | String   |                                                              |
 patient              | ObjectId |                                                              |
 
</td>
<td>

 Polje                 | Tip    | Opis                    |
 ----------------------| -------|-------------------------|
 historyIndexCounter   | Number | najveci indeks kartona  |
 biopsyIndexCounter    | Number | najveci indeks biopsije |
</td>
</tr>
</table>

## Developers

- [Jovan Djordjevic, 164/2017](https://gitlab.com/JovanDjordjevic)
- [Selena Hocevar, 140/2017](https://gitlab.com/selena.hocevar)
- [Petar Rondovic, 167/2017](https://gitlab.com/mi17167)
