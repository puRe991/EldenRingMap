<script lang="ts">
  import { afterUpdate, onMount } from 'svelte';
  import Drawer from './drawer';
  import type { RouteBox, RouteLayout, RouteLink } from './drawer';
  import { boxes } from './data';
  import './box.css';
  import Modal from '../Modal.svelte';

  // 初始化地图宽高
  /** 地图div高度 */
  let winH: number = window.innerHeight;

  /** 计算后的图 */
  let routeData: RouteLayout | undefined;

  let showEditPanel = false;

  /** Box宽度 */
  const boxWidth = 100;
  /** Box高度 */
  const boxHeight = 50;

  onMount(() => {
    // 地图大小随窗口变化
    window.addEventListener('resize', () => {
      winH = window.innerHeight;
    });

    // 获得计算后的图
    routeData = Drawer.d3DagStratify(Drawer.getTree(boxes));
  });
  /** 全部Box */
  let resultBoxes: RouteBox[] = [];
  /** 全部连线 */
  let resultLinks: RouteLink[] = [];

  /** 刷新显示 */
  const refreshRoutes = () => {
    if (!routeData) {
      return;
    }

    resultBoxes = [];
    resultLinks = [];

    Drawer.draw(
      routeData.result,
      boxes,
      (box: RouteBox, links: RouteLink[]) => {
        resultBoxes.push(box);
        resultBoxes = resultBoxes;
        resultLinks = [...resultLinks, ...links];
      },
      150,
      80
    );
  };

  afterUpdate(() => {
    // 绘制
    refreshRoutes();
  });

  let addBoxModalVisibility = false;
  let boxInfoModalVisibility = false;
  let currentClickedBox: RouteBox;
  let editTarget: { boxId: number; type: number } | undefined;

  const onBoxClick = (box: RouteBox) => {
    currentClickedBox = box;
    showEditPanel = true;
  };

  /**
   * 打开编辑窗口
   * @param box 节点id
   * @param type 默认编辑方式（上加？编辑？下加？
   */
  const onEdit = (boxId: number, type: number = 0) => {
    editTarget = { boxId, type };
    addBoxModalVisibility = true;
  };

  const handleBoxKeydown = (event: KeyboardEvent, box: RouteBox) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onBoxClick(box);
    }
  };

  //alert('支线页开发中，暂不可用');
</script>

<div>
  <div id="routeContainer" style="height: {winH - 60}px;">
    <h1 style="color: white;">Nur eine Vorschau, noch ohne Funktionalität.</h1>
    <p style="color: white;">Die Daten sind Testdaten und nicht garantiert korrekt.</p>
    <p style="color: white;">Falls auf Mobilgeräten nichts zu sehen ist, bitte nach rechts wischen →</p>
    <p style="color: white;">Verbindungslinien können sich überlappen.</p>
    <!--连接线-->
    <svg xmlns="http://www.w3.org/2000/svg" width="1000%" height="1000%">
      {#each resultLinks as link}
        <path
          d={`M${link.points[0].x + boxWidth / 2} ${link.points[0].y + boxHeight / 2} 
              C ${link.points[0].x + boxWidth / 2} ${link.points[0].y + boxHeight / 2 + (link.points[link.points.length - 1].y - link.points[0].y + boxHeight / 2) * 0.5}, 
              ${link.points[link.points.length - 1].x + boxWidth / 2} ${
            link.points[link.points.length - 1].y + boxHeight / 2 - (link.points[link.points.length - 1].y - link.points[0].y + boxHeight / 2) * 0.5
          }, 
              ${link.points[link.points.length - 1].x + boxWidth / 2} ${link.points[link.points.length - 1].y + boxHeight / 2}`}
          fill="transparent"
        />
        <!--
        {#each link.points as point, i}
          {#if i > 0}
            <path
              d={`M${link.points[i - 1].x + boxWidth / 2} ${link.points[i - 1].y + boxHeight / 2} 
              C ${link.points[i - 1].x + boxWidth / 2} ${link.points[i - 1].y + boxHeight / 2 + 30}, 
              ${point.x + boxWidth / 2} ${point.y + boxHeight / 2 - 30}, 
              ${point.x + boxWidth / 2} ${point.y + boxHeight / 2}`}
              fill="transparent"
            />
            !--line x1={link.points[i - 1].x + boxWidth / 2} y1={link.points[i - 1].y + boxHeight / 2} x2={point.x + boxWidth / 2} y2={point.y + boxHeight / 2} /--
          {/if}
        {/each}
      -->
      {/each}
    </svg>

    <!--框-->
    {#each resultBoxes as box}
      <div
        class="box box-type{box.box.type}"
        role="button"
        tabindex="0"
        style="left: {box.left}px; top: {box.top}px; width: {boxWidth}px; height: {boxHeight}px;"
        on:click={() => {
          onBoxClick(box);
        }}
        on:keydown={event => handleBoxKeydown(event, box)}
      >
        <p>{box.box.name}</p>
      </div>
    {/each}

    <!--编辑面板-->
    {#if showEditPanel}
      <div class="editPanel" style="left: {currentClickedBox.left}px; top: {currentClickedBox.top}px;">
        <button
          on:click={() => {
            boxInfoModalVisibility = true;
          }}
        >
          Details
        </button>
        <button
          on:click={() => {
            onEdit(currentClickedBox.box.id, 1);
          }}
        >
          Oberhalb hinzufügen
        </button>
        <button
          on:click={() => {
            onEdit(currentClickedBox.box.id, 0);
          }}
        >
          Ändern
        </button>
        <button
          on:click={() => {
            onEdit(currentClickedBox.box.id, 2);
          }}
        >
          Unterhalb hinzufügen
        </button>
      </div>
    {/if}
  </div>
</div>

<Modal
  visible={addBoxModalVisibility}
  zindex={5}
  backgroundOpacity={0.8}
  top="10%"
  showOkButton
  showCloseButton
  okButtonText="OK"
  closeButtonText="Schließen"
  onCloseButtonClick={() => {
    addBoxModalVisibility = false;
  }}
>
  <div id="addBoxModal">
    {#if editTarget}
      <p>Aktueller Knoten: {editTarget.boxId}</p>
    {/if}
    <div class="linkedBoxHeader">
      <p>Vorgänger</p>
      <button>+</button>
    </div>
    <div class="linkedBoxes">
      <div class="linkBox">Godrick</div>
    </div>

    <div class="centerBox">
      <div class="linkBox">Liurnia</div>
    </div>

    <div class="linkedBoxHeader">
      <p>Nachfolger</p>
      <button>+</button>
    </div>
    <div class="linkedBoxes">
      <div class="linkBox">Roter Wolf</div>

      <div class="linkBox">Ranni</div>
    </div>
  </div>
</Modal>

<Modal
  visible={boxInfoModalVisibility}
  zindex={5}
  backgroundOpacity={0.8}
  top="10%"
  title="Detailseite noch in Arbeit"
  showOkButton
  showCloseButton
  okButtonText="OK"
  closeButtonText="Schließen"
  onCloseButtonClick={() => {
    boxInfoModalVisibility = false;
  }}
>
  <div id="addBoxModal">
    {#if editTarget}
      <p>Aktueller Knoten: {editTarget.boxId}</p>
    {/if}rua</div>
</Modal>

<style>
  #routeContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    overflow: scroll;
  }
  .box {
    border: solid 1px rgb(208, 200, 181);
    color: rgb(234, 230, 219);
    position: absolute;
    background-color: black;
    z-index: 2;
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgb(60, 58, 54);
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box p {
    margin: 0;
  }

  @media (any-hover: hover) {
    .box:hover {
      background-color: rgb(30, 30, 30);
      box-shadow: 0 0 10px 0 rgb(60, 58, 54);
    }
  }

  svg {
    position: absolute;
    z-index: 1;
  }
  svg path {
    stroke: rgb(208, 200, 181);
    stroke-width: 2;
  }

  #addBoxModal {
    padding: 10px 0;
  }

  #addBoxModal p {
    color: white;
  }

  .linkedBoxHeader {
    display: flex;
    align-items: center;
  }

  .linkedBoxHeader button {
    height: fit-content;
  }

  .linkedBoxes {
    border: solid 1px white;
    display: flex;
    padding: 20px;
  }

  .editPanel {
    position: absolute;
    z-index: 3;
    width: max-content;
  }
  .linkBox {
    border: solid 1px rgb(208, 200, 181);
    color: rgb(234, 230, 219);
    background-color: black;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  .centerBox {
    text-align: center;
    width: 200px;
    font-weight: bold;
    margin: 20px auto;
    border: solid 3px;
  }
</style>
