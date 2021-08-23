import Component from "../../core/Component";
import * as dragFunc from "../../js/dragfunction";

export default class Main extends Component {
  template() {
    const { getIconOrder } = this.$props;
    const iconOrder = getIconOrder.iconOrder;

    return `
      <div class="mainContainer">
        <ul class="iconsList">
          ${iconOrder
            .map(
              (icon) => `
            <li class="icon" draggable="true">
              <a class="anchor" href="${icon.path}">${icon.title}</a>
            </li>
          `
            )
            .join(" ")}
        </ul>
      </div>
    `;
  }

  setEvent() {
    const { getIconOrder, changeIconOrder } = this.$props;
    const iconOrder = getIconOrder.iconOrder;

    const backBtn = document.querySelector(".backBtn");
    const newBtn = document.querySelector(".newBtn");

    backBtn.classList.remove("active");
    newBtn.classList.remove("active");

    const anchorIcons = document.querySelectorAll(".anchor");

    anchorIcons.forEach((icon) => {
      icon.addEventListener("click", (e) => {
        if (this.isSame(iconOrder)) {
          changeIconOrder(this.getNowOrder());
        }
        backBtn.classList.add("active");
      });
    });

    dragFunc.addDragEvent();

    // 브라우져가 닫히거나 새로고침을 감지
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      // 아이콘 순서가 바뀔 경우 localStorage에 저장
      if (this.isSame(iconOrder)) {
        changeIconOrder(this.getNowOrder());
      }
    });
  }

  // drag and drop으로 변경된 아이콘 순서
  getNowOrder() {
    const anchors = document.querySelectorAll(".anchor");
    const newOrder = [];

    anchors.forEach((anchor) => {
      newOrder.push({
        path: `/${anchor.href.split("/")[3]}`,
        title: anchor.text,
      });
    });

    return newOrder;
  }

  // 이전 아이콘 값과 동일한지 비교하는 함수
  isSame(oldVal) {
    const newVal = this.getNowOrder();

    for (let i = 0; i < oldVal.length; i++) {
      if (
        oldVal[i].path === newVal[i].path &&
        oldVal[i].title === newVal[i].title
      ) {
        continue;
      } else return true;
    }
    return false;
  }
}
