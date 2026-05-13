<script lang="ts">
  import Modal from './Modal.svelte';
  import * as config from '../config';

  import SubscriptLink7 from '../assets/icons/icon-subscript-link-7.svg';
  import SubscriptLink10 from '../assets/icons/icon-subscript-link-10.svg';

  export let updateVisibility: boolean = false;
  export let onOKButtonClick: () => void = () => {};
</script>

<Modal
  visible={updateVisibility}
  showOkButton
  top="0%"
  width="85%"
  backgroundOpacity={0.85}
  title="Änderungen"
  zindex={1919811}
  onOKButtonClick={() => {
    onOKButtonClick();
  }}
>
  <div id="modalContainer">
    <div class="update">
      <p class="updateTitle"><date>{config.default.lastUpdated}</date><br />Update (Version {config.default.currentVer})</p>
      <div class="updateSection">
        <p>Bei Fragen oder Problemen kannst du der Feedback-Gruppe beitreten: 161952806.</p>
      </div>
      <div class="updateSection">
        <p class="sectionTitle">💡 Neue Funktionen:</p>
        <p>
          - Im unteren Menü wurde ein Einstieg zu
          <a href="https://www.wanjiadongli.com/games/2815?tab=2&inviteCode=eldenringmap114514" target="_blank"
            >Mods/Trainern
            <sup>
              <SubscriptLink10 />
            </sup>
          </a>
          ergänzt.
        </p>
        <p>- Die Darstellung der Symbole im unteren Menü wurde aktualisiert.</p>
      </div>
      <div class="updateSection">
        <p class="sectionTitle">✨ Hinweise:</p>
        <ul>
          <li>Die Website kann als Desktop-/Startbildschirm-App installiert werden, sofern dein Browser PWA-Installationen unterstützt.</li>
          <li>Markierungen lassen sich per Rechtsklick oder langem Drücken schnell ausblenden oder als Favorit speichern.</li>
          <li>Ausgeblendete Punkte und Favoriten können in den Einstellungen importiert und exportiert werden.</li>
        </ul>
      </div>
    </div>

    <hr />

    <div class="update">
      <p class="updateTitle"><date>2026-1-19 17:31 UT+8</date><br />Update (Version 3.3.1.4)</p>
      <div class="updateSection">
        <p>Erstes Update nach längerer Pause – vielen Dank für eure jahrelange Nutzung und Unterstützung.</p>
        <p>Bei Problemen bitte gern in der Feedback-Gruppe melden: 161952806.</p>
      </div>
      <div class="updateSection">
        <p class="sectionTitle">🐞 Fehlerbehebungen:</p>
        <p>- Suchergebnisse enthalten nach dem Hinzufügen der DLC-Karte keine falschen Untergrund- oder DLC-Koordinaten mehr.</p>
      </div>
      <div class="updateSection">
        <p class="sectionTitle">💡 Neue Funktionen:</p>
        <p>- Kooperation mit Wanjiadongli und ein Link zu Mods/Trainern wurden hinzugefügt.</p>
        <p>- Eine Favoritenübersicht wurde zum unteren Menü ergänzt.</p>
        <p>- Der DLC-Filterbereich erhielt eine Auswahl für Oberfläche/Untergrund.</p>
        <p>- Die Info-Seite enthält jetzt einen Partner-Button.</p>
      </div>
    </div>

    <hr />

    <div class="update">
      <p class="updateTitle">Frühere Updates</p>
      <div class="updateSection">
        <p>- DLC-Kartenmaterial, Filter und Kartentypen wurden ergänzt und verbessert.</p>
        <p>- PWA-Unterstützung wurde eingerichtet, damit die Karte wie eine App genutzt werden kann.</p>
        <p>- Kommentare zu Markierungen, Import/Export lokaler Daten, Quest-Vorschauen und weitere Komfortfunktionen wurden hinzugefügt.</p>
        <p>
          - Kartendaten stammen unter anderem von
          <a href="https://mapgenie.io/elden-ring/maps/the-shadow-realm" target="_blank">
            mapgenie
            <sup>
              <SubscriptLink7 />
            </sup>
          </a>.
        </p>
      </div>
    </div>
  </div>
</Modal>

<style>
  #modalContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #modalContainer p {
    color: rgb(228, 223, 210);
    margin: 10px 0;
  }
  #modalContainer ul {
    color: rgb(228, 223, 210);
    margin: 10px 0;
  }
  .update {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: -webkit-fill-available;
  }
  .updateSection {
    text-align: left;
  }
  .updateTitle {
    font-size: larger;
    font-weight: bold;
  }
  .sectionTitle {
    text-shadow: 0 0 2px rgb(209, 207, 198);
    font-weight: bold;
  }
  hr {
    width: -webkit-fill-available;
    background-color: navajowhite;
  }
  a {
    color: rgb(228, 223, 210);
  }
</style>
