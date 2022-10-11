////////////////////////////////////////////////////////////////////////////////
//  HELPER FUNCTIONS                                                          //
//                                                                            //
//  Used by both the COURSE CSS LOADER and the CTLE GLOBAL NAV TOOL.          //
////////////////////////////////////////////////////////////////////////////////


/**
 *  Parse the current URL to determine the Canvas course ID.
 *  @returns {(number|null)} The current course ID or null if not in a course.
 */
function DUParseCourseID() {
    const truncator = new RegExp(location.hostname + '\/courses\/[1-9][0-9]*');
    const path = truncator.exec(location.href);
    return (path ? path[0].substring((location.hostname + '/courses/').length) : null);
}


////////////////////////////////////////////////////////////////////////////////
// END HELPER FUNCTIONS                                                       //
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
//  COURSE CSS LOADER                                                         //
//                                                                            //
//  If a CSS file has been stored at 'Files/DU Theme/style.css' within a      //
//  Canvas course, load that file and apply its styling to all pages within   //
//  that course.                                                              //
////////////////////////////////////////////////////////////////////////////////


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
 *  Load a CSS file into a web page.
 */
function DULoadCSSFile(coursenum) {
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


/**
 *  Course CSS Loader Implementation:
 *    - If a file exists at Files/DU Theme/style.css within a Canvas course,
 *      apply its CSS styling to that course's pages.
 */
var coursenum = DUParseCourseID();
if (coursenum) {
  DULoadCSSFile(coursenum);
}


////////////////////////////////////////////////////////////////////////////////
// END COURSE CSS LOADER                                                      //
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
//  CTLE GLOBAL NAV TOOL                                                      //
//                                                                            //
//  If a user is enrolled in the CTLE Faculty Forum course, add the CTLE      //
//  icon to the Canvas global navigation menu.                                //
////////////////////////////////////////////////////////////////////////////////


/**
 *  Add the CTLE option to the global navigation menu if the current user is
 *  enrolled in the CTLE Faculty Forum course.
 */
function DUAddCtleToGlobalNavigation() {
    'use strict;'
    let new_nav_item = document.createElement("li");
    new_nav_item.innerHTML= '<li class="ic-app-header__menu-list-item">' +
                                '<a id="global_nav_ctle_link" role="button" class="ic-app-header__menu-list-link" data-track-category="help system" data-track-label="help button" href="' + location.origin +'/courses/1292000">' +
                                    '<div class="menu-item-icon-container" role="presentation">' +
                                        '<svg xmlns="http://www.w3.org/2000/svg" class="ic-icon-svg menu-item__icon svg-icon-regalia" version="1.1" x="0" y="0" viewBox="0 0 280 280" enable-background="new 0 0 200 200" xml:space="preserve" fill="currentColor">' +
                                            '<path d="M250.7,279.05H29.3a15.26,15.26,0,0,1-15.25-15.24A125.07,125.07,0,0,1,51.5,174.18a16.09,16.09,0,0,1,22.61.1L140,240.17l65.89-65.89a16.09,16.09,0,0,1,22.61-.1A125.1,125.1,0,0,1,266,263.81,15.26,15.26,0,0,1,250.7,279.05ZM30.15,263h219.7a109.08,109.08,0,0,0-32.6-77.25l-67.87,67.87a13.28,13.28,0,0,1-18.76,0l-67.89-67.9A109.19,109.19,0,0,0,30.15,263Z"/><path d="M270.86,34.79l-123.42-33a32.25,32.25,0,0,0-14.88,0L9.14,34.79C1.54,36.82,1,42.35,1,44s.59,7.18,8.2,9.21l16.47,4.4c0,7.06,0,15.3-.1,18.08a3.76,3.76,0,0,1-1.31,2.46c-7.36,6-7.61,14.13-.65,20.56a3.73,3.73,0,0,1,1.1,2.79c-1,7.41-2.12,14.81-3.19,22.21-1,7.06-2,14.12-3,21.29h26.1c0-.73,0-1.25-.11-1.75Q41.49,123,38.51,102.8c-.28-1.9-.15-3.28,1.59-4.78,6.28-5.38,5.8-14.23-.74-19.47-.75-.6-1.83-1.42-1.86-2.17-.06-1.51-.09-8.85-.1-15.62L61,67.05v42a79.05,79.05,0,0,0,158.1,0V67.05l51.81-13.84c7.6-2,8.19-7.56,8.19-9.21S278.46,36.82,270.86,34.79ZM203,109a62.95,62.95,0,0,1-125.9,0V71.35l55.51,14.83a33,33,0,0,0,12.54.48,21.45,21.45,0,0,0,2.34-.48L203,71.35ZM143.29,70.63a16.94,16.94,0,0,1-6.58,0L126.89,68,37.05,44l99.66-26.63a16.94,16.94,0,0,1,6.58,0L243,44Z"/></path>' +
                                        '</svg>' +
                                    '</div>' +
                                    '<div class="menu-item__text">CTLE</div>' +
                                '</a>' +
                            '</li>';
    let global_nav_courses_item = document.getElementById("global_nav_courses_link").parentNode;
    if(global_nav_courses_item) {
        global_nav_courses_item.after(new_nav_item);
    }
}
DUAddCtleToGlobalNavigation()

////////////////////////////////////////////////////////////////////////////////
// END CTLE GLOBAL NAV TOOL                                                   //
////////////////////////////////////////////////////////////////////////////////
