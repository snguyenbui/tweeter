$(document).ready(() => {
  $("textarea").on("input", () => {
    updateCounter();
    changeCounterColor();
  });
});

const updateCounter = () => {
  $(this.document.forms[0][2]).val(140 - $(this.document.forms[0][0]).val().length);
};

const changeCounterColor = () => {
  if ($(this.document.forms[0][2]).val() < 0) {
    this.document.forms[0][2].style.color = "red";
  } else {
    this.document.forms[0][2].style.color = "black";
  }
};