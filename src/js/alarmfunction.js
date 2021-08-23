// dropbox 시간 옵션을 설정하는 함수
export function hoursMenu() {
  var select = document.querySelector(".alarmhrs");
  var hrs = 12;

  for (var i = 0; i < hrs; i++) {
    select.options[select.options.length] = new Option(i < 10 ? "0" + i : i);
  }
}

// dropbox 분 옵션을 설정하는 함수
export function minMenu() {
  var select = document.querySelector(".alarmmins");
  var min = [0, 10, 20, 30, 40, 50];

  for (var i = 0; i < min.length; i++) {
    select.options[select.options.length] = new Option(
      min[i] < 10 ? "0" + min[i] : min[i]
    );
  }
}

// 알람이벤트를 설정하는 함수
export function alarmSet() {
  var hr = document.querySelector(".alarmhrs");
  var min = document.querySelector(".alarmmins");
  var ap = document.querySelector(".ampm");
  var selectedHour = hr.options[hr.selectedIndex].value;
  var selectedMin = min.options[min.selectedIndex].value;
  var selectedAP = ap.options[ap.selectedIndex].value;

  const matchResult = timeMatch(
    [selectedAP, selectedHour, selectedMin],
    getNowTime()
  );
  console.log(matchResult);
}

// 선택한 시간을 가져오는 함수
export function getSelectedTime() {
  var hr = document.querySelector(".alarmhrs");
  var min = document.querySelector(".alarmmins");
  var ap = document.querySelector(".ampm");

  var selectedHour = hr.options[hr.selectedIndex].value;
  var selectedMin = min.options[min.selectedIndex].value;
  var selectedAP = ap.options[ap.selectedIndex].value;

  return [selectedAP, selectedHour, selectedMin];
}

// 현재 시간을 가져오는 함수
function getNowTime() {
  const date = new Date();
  const nowHour = date.getHours();
  const nowMin = date.getMinutes();

  if (nowHour < 12) return ["AM", nowHour, nowMin];
  else
    return [
      "PM",
      `0${nowHour - 12}`,
      `${nowMin < 10 ? `0${nowMin}` : `${nowMin}`}`,
    ];
}

// 두 시각이 일치하는 지 확인하는 함수
function timeMatch(setTime, nowTime) {
  if (
    setTime[0] === nowTime[0] &&
    setTime[1] === nowTime[1] &&
    setTime[2] === nowTime[2]
  )
    return true;
  else return false;
}
