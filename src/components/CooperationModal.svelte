<script lang="ts">
  import Modal from './Modal.svelte';
  import DownloadOnTheAppStoreIcon from '../assets/icons/icon-download_on_the_App_Store_Badge_CNSC_RGB_wht_092917.svg';
  export let cooperationModalVisibility: boolean = false;
  export let isOpenningWhileSiteStart: boolean = true;
  export let onOKButtonClick: () => void = () => {};
</script>

<Modal
  visible={cooperationModalVisibility}
  showOkButton
  top="0%"
  width="85%"
  backgroundOpacity={0.9}
  title="Vielleicht interessieren dich auch diese Partnerprojekte ..."
  zindex={1919811}
  onOKButtonClick={() => {
    cooperationModalVisibility = false;
    onOKButtonClick();
  }}
  okButtonText={'OK' + (isOpenningWhileSiteStart ? ' (wird nach Updates nur einmal angezeigt)' : '')}
  showCloseButton
  onCloseButtonClick={() => {
    window.open('https://www.wanjiadongli.com/games/2815?tab=2&inviteCode=eldenringmap114514', '_blank');
  }}
  closeButtonText="Mods / Trainer"
>
  <div id="modalContainer">
    <div class="item">
      <div class="title">
        <img src="./resource/images/appicon.webp" width="40px" height="40px" alt="icon" style="border-radius: 8px; margin-right: 10px;" />

        <p class="titlep">Elden-Ring-Karte – Abenteuerführer für die Zwischenlande</p>
      </div>

      <p>Eine sehr gute Offline-Karte für iPhone und iPad mit Markierungen, Erfolgsübersicht und vielen weiteren Funktionen.</p>
      <p>Ein Teil der Daten wird mit dieser Website geteilt, sodass du dort ebenfalls personalisierte Markierungen sehen kannst.</p>
      <div style="display: flex; gap: 30px; width: 100%; justify-content: center;">
        <img src="./resource/images/app.png" width="100px" alt="qrcode for app" />

        <div style="height: auto; width: 0; border: solid 1px #9f9f9f;" />

        <div>
          <p>Zur App-Store-Seite wechseln</p>

          <a href="https://apps.apple.com/cn/app/apple-store/id1615288664?pt=119039382&ct=elpwc&mt=8" target="_blank">
            <DownloadOnTheAppStoreIcon />
          </a>
        </div>
      </div>
    </div>

    <div class="item">
      <div class="title">
        <img src="./resource/images/dodo.png" width="40px" height="40px" alt="icon" style="border-radius: 8px; margin-right: 10px;" />

        <p class="titlep">Elden-Ring-Community – DoDo</p>
      </div>
      <p>Ein Treffpunkt für Elden-Ring-Spieler mit Guides, Gegenstandsdatenbank und Austausch.</p>
      <a href="https://imdodo.com/i?gNo=19255" target="_blank"> Zur Community </a>
    </div>
  </div>
</Modal>

<style>
  #modalContainer {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 40px;
  }

  #modalContainer p {
    color: rgb(228, 223, 210);
    margin: 10px 0;
  }
  a {
    color: rgb(228, 223, 210);
  }
  .item {
    padding: 5px;
  }
  .titlep {
    font-size: x-large;
  }
  .title {
    display: flex;
  }
</style>
