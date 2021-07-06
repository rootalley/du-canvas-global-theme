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


////////////////////////////////////////////////////
// BEGIN GOOGLE ANALYTICS CONFIG                  //
////////////////////////////////////////////////////

//In Google Analytics you'll need to set up custom dimensions as follows
// Custom Dimension 1 = Canvas User ID --- Scope = User
// Custom Dimension 2 = Archived --- Scope = User
// Custom Dimension 3 = Canvas User Role --- Scope = User
// Custom Dimension 4 = Canvas Course ID --- Scope = Hit
// Custom Dimension 5 = Canvas Course Name --- Scope = Hit
// Custom Dimension 6 = Canvas Sub-Account ID --- Scope = Hit

(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function() {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js',
  'ga');

$(document).ready(function() {

  // START - More Google Analytics Tracking Code
  var sUserId
  var sUserRole
  var sTemp // Course ID from URL
  var _course
  var sCourseName = null
  var parent_account //Give you the subaccount_id that the course is in

  ////////////////// CHANGE UA # HERE /////////////////////
  ga('create', 'UA-55442442-1', 'auto');

  //Get User Information
  sUserId = ENV["current_user_id"]
  ga('set', 'dimension1', sUserId);


  //Get User Role
  if ($.inArray('admin', ENV['current_user_roles']) == -1 &&
    $.inArray('teacher', ENV['current_user_roles']) == -1 &&
    $.inArray('student', ENV['current_user_roles']) > -1) {
    sUserRole = "student"
  } else if ($.inArray('admin', ENV['current_user_roles']) == -1 &&
    $.inArray('teacher', ENV['current_user_roles']) > -1) {
    sUserRole = "teacher"
  } else if ($.inArray('admin', ENV['current_user_roles']) > -1) {
    sUserRole = "admin"
  } else {
    sUserRole = "other"
  }

  ga('set', 'dimension3', sUserRole);

  //If the user is in a course
  try {
    sTemp = window.location.pathname.match(/\/courses\/(\d+)/);
    if (sTemp[1]) {

      //Get Course information - Course Name and parent sub-account id
      var d1 = $.get('/api/v1/courses/' + sTemp[1], function(_course) {
        parent_account = _course.account_id
        parent_account = parent_account.toString();
        sCourseName = _course.name
      });


      $.when(d1).done(function(_account) {
        // ...do stuff...
        ga('set', 'dimension4', sTemp[1]);
        ga('set', 'dimension5', sCourseName);
        ga('set', 'dimension6', parent_account);
        ga('send', 'pageview');
      });
    } else {
      ga('send', 'pageview');
    }
  } catch (err) {}

  // END - Google Analytics Tracking Code

});
////////////////////////////////////////////////////
// END GOOGLE ANALYTICS CONFIG                    //
////////////////////////////////////////////////////
