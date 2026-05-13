
<p align="center" style="font-size: 2em; font-weight: bold;">
   <img align="center" src="./public/resource/images/fire.png" width="200px"/>
</p>
<div align="center">
 
# Gemeinsam bearbeitbare Elden-Ring-Karte
 
### 𝐄𝐋𝐃𝐄𝐍 𝐑𝐈𝐍𝐆 𝐎𝐍𝐋𝐈𝐍𝐄 𝐌𝐀𝐏
   
![alt GithubStars](https://img.shields.io/github/stars/elpwc/EldenRingOnlineMap.svg?style=flat)
![alt GithubStars](https://img.shields.io/github/forks/elpwc/EldenRingOnlineMap.svg?style=flat)
![alt license](https://img.shields.io/badge/license-MIT-green)
   
 
Adresse: https://www.elpwc.com/eldenringmap/
</div>


<hr/>

## Tech-Stack

- Frontend: Svelte + Leaflet mit TypeScript
- Backend: PHP + MySQL auf Basis von Apache + nginx, WinServer

Das Projekt begann als kleine private Website. Da Svelte damals bereits ausprobiert wurde, kam es direkt als Frontend-Framework zum Einsatz.  
Die Backend-Schnittstellen sind aus Gründen der Einfachheit in reinem PHP geschrieben.

Die Karte basiert auf Leaflet; in der aktuellen Version werden alle Markierungen per DOM gerendert.

## Screenshots

![alt screenshot](./images/ss1.png)
![alt screenshot](./images/ss2.png)

## Mitentwickeln

Die Elden-Ring-Karte hat dauerhaft sehr viele tägliche Aufrufe. Bei dieser großen Nutzerzahl ist jede Hilfe willkommen, um geplante Funktionen umzusetzen und gemeldete Fehler schneller zu beheben. Melde dich gern per E-Mail, QQ oder Issue, wenn du mitentwickeln möchtest.

## Mitwirkende

| <img src="https://avatars.githubusercontent.com/u/52597061?v=4" width = "100" alt="spking11" align=center />|<img src="https://avatars.githubusercontent.com/u/13135477?v=4" width = "100" alt="Ranger" align=center />|
|-|-|
|spking11([@spking11](https://github.com/spking11))|Ranger([@RangerChen](https://github.com/RangerChen))|


## Entwicklung und Deployment

### Frontend

Frontend-Framework:
Svelte ist ein leichtgewichtiges Frontend-Framework. Weitere Informationen findest du auf der [offiziellen Website](https://svelte.dev/).

> Svelte ist ein neuer Ansatz zum Erstellen von Benutzeroberflächen: Arbeit, die klassische Frameworks wie React oder Vue im Browser erledigen, wird bei Svelte in die Build-Phase verschoben.

nodejs version: 16.13.0

npm version: 8.1.2

pnpm version: 7.0.0-beta.2

1. Repository lokal klonen
```bash
   git clone https://github.com/elpwc/EldenRingOnlineMap.git
```

2. Abhängigkeiten installieren

**Da das Projekt aktuell npm zur Paketverwaltung nutzt, wird die Installation mit `npm` oder `pnpm` empfohlen.**

 [pnpm](https://www.pnpm.cn/)

 Wenn du lokal `yarn` verwendest, kann die Datei `yarn.lock` in Pull Requests ignoriert werden.
```bash
   npm i // or pnpm install | yarn 
```

3. Entwicklungsumgebung starten
```bash
   npm run dev // or pnpm dev | yarn dev
```

4. Build erstellen
```bash
   npm run build // or pnpm build | yarn build
```

5. Deployment

Die gebauten statischen Dateien liegen im Ordner `/public` und können direkt auf einem statischen Server bereitgestellt werden.

### Backend

Benötigt werden `php` und `mysql`.

1. Datenbank initialisieren

Führe das Datenbank-Initialisierungsskript `/database.sql` mit einem Datenbankclient aus, z. B. Navicat.

2. Datenbank konfigurieren

Die Datenbankkonfiguration liegt unter `/public/api/private/`:

```bash
├── public
│   ├── api
│   │   ├── private
│   │   │   ├── admin.example.php // Passwort für den Admin-Modus
│   │   │   ├── dbcfg.example.php // Datenbankkonfiguration
│   │   │   └── illegal_words_list.example.php // Liste blockierter Wörter
```  

Start:

Trage deine Werte in die passenden Beispieldateien ein und entferne anschließend `.example` aus dem Dateinamen.

Beispiel: `admin.example.php` -> `admin.php`

Wie der Admin-Modus im Frontend aktiviert wird, lässt sich in `src/pages/About.svelte` nachlesen. Nach der Aktivierung können Daten direkt im Frontend geändert werden; auf der Info-Seite erscheint dann ein Hinweis „(Admin)“.

3. Deployment

Kopiere den Inhalt von `/public` direkt auf einen Apache-Server.

PS: Hinweise zu den einzelnen Dateien stehen in `/src/description.txt`.


## Open-Source-Lizenz

MIT

Der Code von EldenRingMap darf unter Beibehaltung dieser Lizenz frei verwendet, geändert und veröffentlicht werden.
