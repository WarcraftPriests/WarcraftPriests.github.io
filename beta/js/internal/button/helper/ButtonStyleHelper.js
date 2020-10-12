/*
 * Generates the horizontal spacer between the buttons
 */
function generateHorizontalSpacer(div) {
    var horizontalSpacer = document.createElement(span);
    horizontalSpacer.setAttribute(classLabel, divider);
    horizontalSpacer.style.width = fivePixel;
    horizontalSpacer.style.height = auto;
    horizontalSpacer.style.display = inlineBlock;
    div.appendChild(horizontalSpacer);
  }
  
  function addShow(div) {
    document.getElementById(div).classList.add(show);
  }
  
  function removeShow(div) {
    document.getElementById(div.toString()).classList.remove(show);
  }

    /*
 * Handles the colors of the current selected button
 */
function styleButtons() {
    var btnGroup = document.getElementsByClassName(buttonName);
    for (var i = 0; i < btnGroup.length; i++) {
      let btn = document.getElementById(btnGroup[i].id);
      if (btn.id == currTalentBtn 
            || btn.id == currSimsBtn 
            || btn.id == currCovenantBtn
            || btn.id == currEnchantsBtn 
            || btn.id == currConsumablesBtn
            || btn.id == currFightStyleBtn
            || btn.id == currCovenantChoiceBtn ) {
        btn.style.borderColor = buttonBorderColor;
        btn.style.backgroundColor = buttonBackgroundColor;
      } else {
        btn.style.borderColor = buttonBorderColorDefault;
        btn.style.backgroundColor = defaultBackgroundColor;
      }
      btn.style.cursor = pointer;
    }
  }