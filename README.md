# Project TherapyTracker

This app is my team's project for "Programming for Web" course, held on the 4th year of studies at Faculty of Mathematics in Belgrade. <br>
The repository is forked here for safekeeping. <br>
Link to the original repository: https://gitlab.com/matfpveb/projekti/2021-2022/02-TherapyTracker
<br>
<br>

TherapyTracker is an app that allows easy tracking of patients, their clinical states, biopsies and oncological therapies, and it was made to be used by medical staff at the Belgrade institute of oncology. <br>
The main goal of this app is to make all this data easily accessible and readable, and it's usage to be easy and intuitive <br>
<br>
[Demo video](https://github.com/JovanDjordjevic/TherapyTracker/blob/master/demo.mkv) (in Serbian only)

# Running the app from source:
To run the client and server, [Node](https://nodejs.org/en/download/), [MongoDB](https://www.mongodb.com/try/download/community) and [Mongo Shell](https://www.mongodb.com/try/download/shell) must be installed on the system <br>
To import/export test data to/from the database, additional [Mongo tools](https://www.mongodb.com/try/download/database-tools) are needed, primarily `mongoimport` and `mongoexport`<br>

To download the project source, install [git](https://git-scm.com/downloads) and run: <br>
`git clone https://github.com/JovanDjordjevic/TherapyTracker/` <br>

Position the console in the project directory with `cd TherapyTracker` 

# Starting the server:
After downloading source, position the console in the `server` and run command `npm install` <br>
This will install all needed libraries and when that is finished, run command `node server.js`

# Importing and exporting data to/from database:
Navigate to `server/db_data` directory. <br>
To import data from JSON files, run the `import_data.sh` script <br>
To export data to JSON files, run the `export_data.sh` script <br>

# Starting the client:
Simmilar to starting the server. <br>
Position the console in the `client` firectory, and install all needed libraries with `npm install`<br>
After that start the server with command `ng serve` 

# Running the app with docker:
First install [docker](https://docs.docker.com/engine/install/ubuntu/) and [docker-compose](https://docs.docker.com/compose/install/). When running the app this way, you do not need to install `node` and `mongo` separately <br>
After cloning the project, position the console in the `TherapyTracker` directory where `docker-compose.yml` is located and run command `docker-compose up`. <br>
After a frw minutes, all needed packages will be installed, server and database will be started, and client can be started from a web browser of your choice <br>
(NOTE: at this time, recovery of database data is not possible after stopping the docker container, running with docker is only meant as a quick peek at the project)

# Database schema
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
 date               | Date       | date of patient record opening                               |
 index              | String     | record index                                                 |
 isClinicalStateSet | Boolean    |                                                              |
 tStage             | String     |                                                              |
 nStage             | Number     |                                                              |
 mStage             | Number     |                                                              |
 tnmStage           | String     |                                                              |
 clinicalStage      | String     |                                                              |
 _biopsyIds         | [ObjectId] | list of biopsies of a particular patient                     |
 _tumorIds          | [ObjectId] | list of tumors of a particular patient                       |
 _therapyIds        | [ObjectId] | list of therapies of a particular patien                     |
</td>
<td>

 Polje              | Tip      | Opis                  |
 -------------------| ---------|-----------------------|
 _id                | ObjectId |                       |
 date               | Date     |                       |
 biopsySide         | String   |                       |
 biopsyTypeLeft     | String   |                       |
 numLeft            | String   | index of left biopsy  |
 histotypeLeft      | String   |                       |
 multifocalityLeft  | String   |                       |
 biopsyTypeRight    | String   |                       |
 numRight           | String   | index of right biopsy |
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
 biopsyIndex      | String   | idx of biopsy used to characterize a this specific tumor |
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

 Polje                | Tip      | Opis                      |
 ---------------------| ---------|---------------------------|
 _id                  | ObjectId |                           |
 therapyType          | String   |                           |
 isTherapyResponseSet | Boolean  | flag for therapy response |
 therapyResponse      | String   |                           |
 numCycles            | Number   |                           |
 numTaxol             | Number   |                           |
 numTxtr              | Number   |                           |
 herceptinTherapy     | String   |                           |
 date                 | Date     |                           |
 therapyShortString   | String   |                           |
 comment              | String   |                           |
 patient              | ObjectId |                           |
 
</td>
<td>

 Polje                 | Tip    | Opis                                               |
 ----------------------| -------|----------------------------------------------------|
 historyIndexCounter   | Number | for tracking next available patient record number  |
 biopsyIndexCounter    | Number | for tracking next available biopsy index           |
</td>
</tr>
</table>

## Developers

- [Jovan Djordjevic, 164/2017](https://github.com/JovanDjordjevic)
- [Selena Hocevar, 140/2017](https://github.com/SelenaHocevar)
- [Petar Rondovic, 167/2017](https://github.com/mi17167)
