import Component from "../../core/Component";
import localImages from "../../Assets/Images/*.jpg";

export default class Image extends Component {
  template() {
    return `
      <div class="imageContainer">
        <div class="imageSlider">
          ${this.$state
            .map(
              (item) => `
            <div class="imageFrame">
              <img id="${item.id}-img" class="image" src="${
                localImages[item.id]
              }" alt="어벤져스"/>
            </div>
          `
            )
            .join(" ")}
        </div>
        <div class="selectedImageContent">
          <img class="selectedImage"/>
        </div>
      </div>
    `;
  }

  setEvent() {
    const images = document.querySelectorAll(".image");
    const imageSlider = document.querySelector(".imageSlider");

    // 마우스 휠에 따라 왼쪽 오른쪽 스크롤 이벤트
    imageSlider.addEventListener("wheel", (e) => {
      if (e.wheelDelta > 0) {
        imageSlider.scrollLeft -= 20;
      } else {
        imageSlider.scrollLeft += 20;
      }
    });

    // 이미지 클릭 이벤트
    images.forEach((image) => {
      image.addEventListener("click", (e) => {
        this.changeSelectedImage(e.target.id[0], images);
      });
    });
  }

  changeSelectedImage(id, images) {
    const selectedImage = document.querySelector(".selectedImage");

    images.forEach((image) => {
      if (image.id[0] != id) {
        image.classList.remove("selected");
      } else {
        image.classList.add("selected");

        selectedImage.src = `${localImages[parseInt(id)]}`;
      }
    });
  }

  selectedImage(clickedImage) {
    const { imagesURL } = this.$state;
    const clickedImageIdx = clickedImage.id[0];

    imagesURL.forEach((image) => {
      if (image.idx === clickedImageIdx) {
        image.selected = !image.selected;
      } else {
        image.selected = false;
      }
    });

    this.render();
  }

  setup() {
    this.$state = [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
    ];
  }
}
