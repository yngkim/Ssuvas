export let note = `'<div id=dim><div id=note-container><textarea id=t-area></textarea></div></div>'`;

document.addEventListener("click", function (event) {
  if (
    !event.target.closest("#note-container") &&
    event.target.id !== "floating-button" &&
    event.target.id !== "floating-icon"
  ) {
    let dimElement = document.getElementById("dim");
    if (dimElement) {
      dimElement.remove();
    }
  }
});
