// 컴포넌트 추상화 코드
export default class Comonent {
  $target; // 바인딩할 위치
  $props; // 부모 컴포넌트에서 넘겨줄 값
  $state; // 컴포넌트 값

  constructor($target, $props) {
    this.$target = $target;
    this.$props = $props;
    this.setup();
    this.render();
  }

  setup() {}
  mounted() {}
  template() {
    return "";
  }
  render() {
    this.$target.innerHTML = this.template();
    this.mounted();
    this.setEvent(); // 이벤트 추가
  }

  setEvent() {}
  setState(newState) {
    this.$state = { ...this.$state, ...newState };
    this.render();
  }
}

// setup -> render -> mount -> event
