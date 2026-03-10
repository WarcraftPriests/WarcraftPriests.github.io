export function setTextContentById(elementId, value) {
  var element = document.getElementById(elementId);
  if (!element) {
    return;
  }
  element.textContent = value == null ? '' : value;
}

export function renderChartHeader(headerText) {
  var headerRoot = document.getElementById('header');
  if (!headerRoot) {
    return;
  }

  while (headerRoot.firstChild) {
    headerRoot.removeChild(headerRoot.firstChild);
  }

  var heading = document.createElement('h3');
  heading.style.color = '#ffffff';
  heading.textContent = headerText == null ? '' : headerText;
  headerRoot.appendChild(heading);
}

export function renderChartDescription(descriptionText) {
  var element = document.getElementById('description');
  if (!element) {
    return;
  }
  // Use innerHTML to allow HTML formatting like <br> tags in descriptions
  element.innerHTML = descriptionText == null ? '' : descriptionText;
}

export function renderGuideLink(guideData) {
  var root = document.getElementById('guide-link');
  if (!root) {
    return;
  }

  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  if (!guideData || !guideData.url) {
    return;
  }

  var hint = document.createElement('span');
  hint.textContent = 'Want more context?';

  var link = document.createElement('a');
  link.href = guideData.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'guideLinkAnchor';
  link.textContent = 'Read Icy Veins: ' + (guideData.label || 'Guide');

  root.appendChild(hint);
  root.appendChild(link);
}

export function renderChartUpdatedText(updatedText) {
  setTextContentById('updateData', updatedText);
}

export function renderCsvTable(chartId, rows) {
  var root = document.getElementById(chartId);
  if (!root) {
    return;
  }

  while (root.firstChild) {
    root.removeChild(root.firstChild);
  }

  root.appendChild(document.createElement('br'));

  var table = document.createElement('table');
  rows.forEach(function(entries, rowIndex) {
    var tr = document.createElement('tr');
    entries.forEach(function(entry) {
      var cell = document.createElement(rowIndex === 0 ? 'th' : 'td');
      cell.textContent = entry;
      tr.appendChild(cell);
    });
    table.appendChild(tr);
  });

  root.appendChild(table);
  root.appendChild(document.createElement('br'));
  root.appendChild(document.createElement('br'));
  root.appendChild(document.createElement('br'));
}
