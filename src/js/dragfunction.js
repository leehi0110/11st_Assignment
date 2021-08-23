// icon drag and drop event
export function addDragEvent() {
  const icons = document.querySelectorAll(".icon");
  const container = document.querySelector(".iconsList");

  icons.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });

    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  container.addEventListener("dragover", (e) => {
    e.preventDefault();

    const afterElement = getDragAfterElement(container, e.clientX);
    const draggable = document.querySelector(".dragging");
    console.log(afterElement);
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
}

function getDragAfterElement(container, x) {
  const draggableElement = [
    ...container.querySelectorAll(".icon:not(.dragging)"),
  ];

  return draggableElement.reduce(
    (closet, child) => {
      const box = child.getBoundingClientRect();
      const offset = x - box.left - box.width / 2;

      if (offset < 0 && offset > closet.offset) {
        return { offeset: offset, element: child };
      } else {
        return closet;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
