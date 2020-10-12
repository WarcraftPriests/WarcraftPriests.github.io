/*
 * Abstraction layer for creating buttons out of an Array
 */
function createButtonBasicList(divName, buttonArray, event, getLabelMethod, currBtn) {
  let div = document.getElementById(divName);
  for (b in buttonArray) {
    var buttonText = document.createTextNode(getLabelMethod(buttonArray[b]));
    createButtonBasic(div, buttonArray[b], event, buttonText, currBtn);
  }
  styleButtons();
}

/*
 * Creating a real button for the two ways
 * - single button
 * - array button
 */
function createButtonBasic(div, name, event, buttonText, currBtn) {
  let button = document.createElement(buttonName.toUpperCase());
  button.setAttribute(buttonId, name);
  button.setAttribute(buttonClass, buttonName);
  button.setAttribute(onClick, handleOnClickText+ name + attributeSpacer + currBtn + attributeClose);
  button.addEventListener(click, event);
  
  var icon = document.createElement('img');
  icon.src = "images/icons/" + name + ".jpg";
  icon.style = "position: relative; top: 2px; width: 16px; height: 16px;";
  var br = document.createTextNode("  ");
  button.appendChild(icon);
  button.appendChild(br);
  button.appendChild(buttonText);
  div.appendChild(button);
  generateHorizontalSpacer(div);
}