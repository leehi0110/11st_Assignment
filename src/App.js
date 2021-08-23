import Component from "./core/Component";
import { backEvent } from "./js/router";
import Main from "./components/MainComponent/Main";
import Alarm from "./components/AlarmComponent/Alarm";
import Memo from "./components/MemoComponent/Memo";
import Image from "./components/ImageComponent/Image";

export default class App extends Component {
  setup() {
    // localStorage 값을 이용해 state setup
    const memos = this.getLocalStorage("memos");
    const memoIdx = this.getLocalStorage("memoIdx");
    const alarms = this.getLocalStorage("alarms");
    const alarmIdx = this.getLocalStorage("alarmIdx");
    const iconOrder = this.getLocalStorage("iconOrder");

    this.$state = {
      memoItems: memos,
      memoIdx: memoIdx,
      alarms: alarms,
      alarmIdx: alarmIdx,
      iconOrder: iconOrder,
    };
  }

  template() {
    return `
      <div data-component="content" class="contentComponent"></div>
    `;
  }

  mounted() {
    const {
      getIconOrder,
      changeIconOrder,
      getSaveMemo,
      insertNewMemo,
      getSaveAlarm,
      insertNewAlarm,
      deleteAlarm,
    } = this;

    const $content = this.$target.querySelector('[data-component="content"]');

    // url path에 따른 템플릿 렌더링
    if (location.pathname === "/") {
      new Main($content, {
        getIconOrder,
        changeIconOrder: changeIconOrder.bind(this),
      });
    } else if (location.pathname === "/alarm") {
      new Alarm($content, {
        getSaveAlarm,
        insertNewAlarm: insertNewAlarm.bind(this),
        deleteAlarm: deleteAlarm.bind(this),
      });
    } else if (location.pathname === "/memo") {
      new Memo($content, {
        getSaveMemo,
        insertNewMemo: insertNewMemo.bind(this),
      });
    } else if (location.pathname === "/image") new Image($content);
  }

  // 이벤트 등록
  setEvent() {
    const backBtn = document.querySelector(".backBtn");

    backBtn.addEventListener("click", () => {
      backEvent();
    });
  }

  // key value로 localStorage 데이터 저장
  setLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // key로 localStorage 데이터 가져오기
  getLocalStorage(key) {
    const getJsonData = localStorage.getItem(key);

    if (getJsonData !== null) {
      return JSON.parse(getJsonData);
    }

    // 아무것도 저장되어 있지 않을 때 default state
    if (key === "memoIdx" || key === "alarmIdx") return 1;
    else if (key === "iconOrder") {
      return [
        { path: "/alarm", title: "알람" },
        { path: "/memo", title: "메모" },
        { path: "/image", title: "이미지" },
      ];
    } else return [];
  }

  // app icon 순서 가져오기
  get getIconOrder() {
    const { iconOrder } = this.$state;
    return { iconOrder };
  }

  // app icon 순서 변경
  changeIconOrder(iconOrderContext) {
    const newState = {
      ...this.$state,
      iconOrder: iconOrderContext,
    };

    this.setLocalStorage("iconOrder", newState.iconOrder);
    this.setState(newState);
  }

  // 저장된 메모 가져오기
  get getSaveMemo() {
    const { memoItems } = this.$state;
    return { memoItems };
  }

  // 새로운 메모 추가
  insertNewMemo(memoContext) {
    const newMemo = {
      id: this.$state.memoIdx++,
      memo: memoContext,
      show: false,
    };

    const newState = {
      ...this.$state,
      memoItems: [...this.$state.memoItems, newMemo],
    };

    this.setLocalStorage("memos", newState.memoItems);
    this.setLocalStorage("memoIdx", newState.memoIdx);
    this.setState(newState);
  }

  // 저장된 알람 가져오기
  get getSaveAlarm() {
    const { alarms } = this.$state;
    return { alarms };
  }

  // 새로운 알람 생성
  insertNewAlarm(alarmContext) {
    const newAlarm = {
      id: this.$state.alarmIdx++,
      apm: alarmContext[0],
      hour: alarmContext[1],
      min: alarmContext[2],
    };

    const newState = {
      ...this.$state,
      alarms: [...this.$state.alarms, newAlarm],
    };

    this.setLocalStorage("alarms", newState.alarms);
    this.setLocalStorage("alarmIdx", newState.alarmIdx);
    this.setState(newState);
  }

  // 알람 삭제
  deleteAlarm(id) {
    const alarms = this.$state.alarms;
    const deleteIdx = alarms.findIndex((alarm) => alarm.id === parseInt(id));

    alarms.splice(deleteIdx, 1);

    const newState = {
      ...this.$state,
      alarms: alarms,
    };

    this.setLocalStorage("alarms", newState.alarms);
    this.setState(newState);
  }
}
