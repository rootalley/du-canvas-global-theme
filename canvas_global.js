////////////////////////////////////////////////////////////////////////////////
//  COURSE CSS LOADER                                                         //
//                                                                            //
//  If a CSS file has been stored at 'Files/DU Theme/style.css' within a      //
//  Canvas course, load that file and apply its styling to all pages within   //
//  that course.                                                              //
////////////////////////////////////////////////////////////////////////////////


/**
 *  Parse the current URL to determine the Canvas course ID.
 *  @returns {(number|null)} The current course ID or null if not in a course.
 */
function DUParseCourseID() {
    const truncator = new RegExp(location.hostname + '\/courses\/[1-9][0-9]*');
    const path = truncator.exec(location.href);
    return (path ? path[0].substring((location.hostname + '/courses/').length) : null);
}function DUParseCourseID() {
  'use strict';
  const truncator = new RegExp(location.hostname + '\/courses\/[1-9][0-9]*');
  const path = truncator.exec(location.href);
  return (path ? path[0].substring((location.hostname + '/courses/').length) : null);
}


/**
 *  Append a CSS file to an HTML document head, thereby applying its styling to
 *  that web page.
 */
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


/**
 *  Course CSS Loader Implementation:
 *    - If a file exists at Files/DU Theme/style.css within a Canvas course,
 *      apply its CSS styling to that course's pages.
 */
var coursenum = DUParseCourseID();
if (coursenum) {
  /* add the CSS file to the Canvas page */
  var cssPath = '/courses/' + coursenum + '/file_contents/course%20files/DU%20Theme/style.css';
  var head = document.getElementsByTagName('HEAD')[0];
  DUAppendCssFileToDocumentHead(cssPath, head);

  /* if the page has a Rich Content Editor iframe, add the CSS there as well */
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


////////////////////////////////////////////////////////////////////////////////
// END COURSE CSS LOADER                                                      //
////////////////////////////////////////////////////////////////////////////////
