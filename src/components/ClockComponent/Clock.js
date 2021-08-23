import Component from "../../core/Component";

export default class Clock extends Component {
  template() {
    return `
      <div class="clockContainer">
        <button class="backBtn active">BACK</button>
        <p class="clockInfo active"></p>
        <button class="newBtn">NEW</button>
      </div>
    `;
  }

  mounted() {
    const clockInfo = document.querySelector(".clockInfo");

    setInterval(() => {
      clockInfo.innerText = this.getClockInfo();
    }, 1000);
  }

  clockInterval() {
    setInterval(() => {
      clockInfo.innerText = this.getClockInfo;
    }, 1000);
  }

  getClockInfo() {
    const dateObj = new Date();
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hour = dateObj.getHours();
    const min = dateObj.getMinutes();
    const sec = dateObj.getSeconds();

    return `
      ${year}년 ${month < 10 ? `0${month}` : month}월 ${
      day < 10 ? `0${day}` : day
    }일 ${hour < 10 ? `0${hour}` : hour}시 ${min < 10 ? `0${min}` : min}분 ${
      sec < 10 ? `0${sec}` : sec
    }초
      `;
  }
}
