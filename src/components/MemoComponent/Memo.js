import Component from "../../core/Component";

export default class Memo extends Component {
  template() {
    const { getSaveMemo } = this.$props;
    const memoItems = getSaveMemo.memoItems;

    return `
      <div class="memoContainer">
        <input class="memoInput" placeholder="메모를 입력하세요" type="text"/>
        <div class="memoList">
          ${memoItems
            .map(
              (memoItem) => `
            <p class="memoItem">${memoItem.memo}</p>
          `
            )
            .join("")}
        </div>
      </div>
    `;
  }

  setEvent() {
    const { insertNewMemo } = this.$props;
    const newBtn = document.querySelector(".newBtn");
    const memoInput = document.querySelector(".memoInput");
    const memoItems = document.querySelectorAll(".memoItem");
    newBtn.classList.add("active");

    newBtn.addEventListener("click", () => {
      memoInput.classList.add("active");
    });

    memoInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        insertNewMemo(e.target.value);
        e.target.value = "";
        memoInput.classList.remove("active");
      }
    });

    memoItems.forEach((memoItems) => {
      memoItems.addEventListener("click", (e) => {
        e.target.classList.toggle("active");
      });
    });
  }
}
