////////////////////////////////////////////////////
// COURSE CSS LOADER - LOADS A CSS FILE IF STORED //
// AT Files/DU Theme/style.css WITHIN A COURSE    //
////////////////////////////////////////////////////
function DUParseCourseID() {
  'use strict';
  const truncator = new RegExp(location.hostname + '\/courses\/[1-9][0-9]*');
  const path = truncator.exec(location.href);
  return (path ? path[0].substring((location.hostname + '/courses/').length) : null);
}


function DUAppendCssFileToDocumentHead(cssFile, documentHead) {
  'use strict';
  try {
    var linkElement = document.createElement('link');
    linkElement.setAttribute('rel', 'stylesheet');
    linkElement.setAttribute('type', 'text/css');
    linkElement.setAttribute('href', cssFile);
    documentHead.appendChild(linkElement);
  } catch (e) {
    console.log('DU Theme (info): style.css not loaded');
  }
}


var coursenum = DUParseCourseID();
if (coursenum) {
  // add the CSS file to the main Canvas page
  var cssPath = '/courses/' + coursenum + '/file_contents/course%20files/DU%20Theme/style.css';
  var head = document.getElementsByTagName('HEAD')[0];
  DUAppendCssFileToDocumentHead(cssPath, head);

  // if the page contains a Rich Content Editor, which is in an iframe, add the
  // CSS to the iframe content as well
  document.onreadystatechange = function () {
    'use strict';
    if (document.readyState != 'loading') {
      var iframeList = document.getElementsByTagName("iframe");
      for (let iframeItem of iframeList) {
        if (iframeItem.id.slice(-4) === '_ifr') {
          head = iframeItem.contentDocument.head;
          DUAppendCssFileToDocumentHead(cssPath, head);
        }
      }
    }
  }
}

////////////////////////////////////////////////////
// END COURSE CSS LOADER                          //
////////////////////////////////////////////////////


////////////////////////////////////////////////////
// EXTERNAL TOOLS CONFIG IN RICH CONTENT EDITOR   //
////////////////////////////////////////////////////
function iconSort(a, b) {
  var aPos = sortOrder.indexOf(a.name);
  var bPos = sortOrder.indexOf(b.name);
  var order;

  if (aPos === bPos) {
    order = 0;
  } else if (aPos > -1 && bPos > -1) {
    order = aPos > bPos ? 1 : -1;
  } else {
    order = aPos > -1 ? -1 : 1;
  }

  return order;
}


var sortOrder = ['Course Video', 'YouTube', 'Vimeo'];
INST.editorButtons.sort(iconSort);
////////////////////////////////////////////////////
// END EXTERNAL TOOLS CONFIG                      //
////////////////////////////////////////////////////
