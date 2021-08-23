import Component from "../../core/Component";
import * as alarmFunc from "../../js/alarmfunction";

export default class Alram extends Component {
  template() {
    const { getSaveAlarm } = this.$props;
    const alarmItems = getSaveAlarm.alarms;
    console.log(alarmItems);

    return `
      <div class="alarmContainer">
        <div class="alarmSetContainer">
          <select class="ampm">
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
          <select class="alarmhrs"></select>
          <p>시</p>
          <select class="alarmmins"></select>
          <p>분</p>
          <button class="setBtn">저장</button>
        </div>
        <div class="alarmList">
          ${alarmItems
            .map(
              (alarmItem) =>
                `
              <div class="alarmItem">
                <p class="alarmTime">${
                  alarmItem.apm === "AM" ? "오전" : "오후"
                } ` +
                `${alarmItem.hour}시 ` +
                `${alarmItem.min}분</p>
                <button data-idx=${alarmItem.id} class="clearAlarmBtn">삭제</button>
              </div>
              `
            )
            .join(" ")}
        </div>
      </div>
    `;
  }

  setEvent() {
    const { insertNewAlarm, deleteAlarm } = this.$props;
    const newBtn = document.querySelector(".newBtn");
    const setBtn = document.querySelector(".setBtn");
    const alarmSetContainer = document.querySelector(".alarmSetContainer");
    const deleteBtns = document.querySelectorAll(".clearAlarmBtn");

    alarmFunc.hoursMenu();
    alarmFunc.minMenu();

    newBtn.classList.add("active");
    newBtn.addEventListener("click", () => {
      alarmSetContainer.classList.add("active");
    });

    setBtn.addEventListener("click", () => {
      insertNewAlarm(alarmFunc.getSelectedTime());
      alarmSetContainer.classList.toggle("active");
    });

    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        deleteAlarm(btn.dataset.idx);
      });
    });
  }
}
