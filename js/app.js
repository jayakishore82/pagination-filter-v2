let studentList = [];

/*function to add Search option: Dynamically adds a text box and button to the page header.
When the button is clicked, the text input is checked.  If it is empty, the first page is displayed,
else the function createSearchResult is called to display the list of students matching the
search word.
*/
function   addSearchOption() {

  let studentName;
  let searchOption = "<div class='student-search'><input placeholder='Search for students...'>" +
                     "<button>Search</button></div>";
  $('.page-header').append(searchOption);

  $('button').on('click',function(){
    studentName = ($('input').val()).toLowerCase();
    $('.pagination').remove();
    $('.errmsg').remove();

    if (studentName === "") {
      createPage(1,studentList);
      addPageLinks(studentList);
    }
    else {
      createSearchResult(studentName);
    }

  });

}

/* Function to select the list of students whose email or name contains the search word.  If there
is a match, that element is added to the array matchList.  If the element is not matching,  that
element is hidden. When there is no matching element, an error message is displayed.  If there are more
than 10 maching elements, the functions createpage and addPageLinks are called. If the match count is
less than 10, createPage is called to display the search result in a single page.
*/
function createSearchResult(studentName) {

  let matchList = [];
  let matchFound = false;
 // Loop through the entire student list
  $('.student-list li').each(function(index) {

    let name = $(this).find('h3').text();
    let email = $(this).find('.email').text();

    if ( (name.indexOf(studentName) !== -1) || (email.indexOf(studentName) !== -1) )   {
       matchList.push($(this));
       matchFound = true;
    }
    else {
       $(this).css('display', 'none');
    }

  });

  if (!matchFound) {
     $('.page').append('<div class= "errmsg">No Matching student found !!</div>');
  }

  else if (matchList.length > 9) {
     createPage(1,matchList);
     addPageLinks(matchList);
   }

   else {
      createPage(1,matchList);
   }

  }

 /*Dynamically add page links based on no of students. The old link is removed first, and the
 new link is appended to the page. Then calls the function addPagination.
*/
 function addPageLinks(studentList) {

   let noOfStudents;
   let noOfLinks;
   let pageLink;
   let listElement = "<li> <a class='active'>" + 1 + "</a> </li>";

   $('.pagination').remove();
   noOfStudents = studentList.length;
   noOfLinks = Math.ceil(noOfStudents /10);

   for (i = 2; i <= noOfLinks; i += 1 ) {
     listElement += "<li> <a>" + i + "</a> </li>" ;
   }

   pageLink = $("<div class='pagination'> <ul> " +   listElement +   "</ul>  </div>");
   $('.page').append(pageLink);

   addPagination(studentList);
 }

/* function to do the pagination. When a link is clicked, the already active link is deactivated, and
'active' class is added to the the link which clicked.  Then the page is build by calling createPage
 function.
*/
 function addPagination(studentList) {

   $('.pagination li').on('click', function() {
       let pageNumber = parseInt($(this).text());
       $(".active").toggleClass();
       $(this).find ('a').addClass("active");
       createPage(pageNumber, studentList);
   });
 }

 /*function to create a page corresponding to the page number. Loop through the student list
  and show the list elements based on page number. Hide the other elements.
 */
 function createPage(pageNumber, studentList) {

   $('.errmsg').remove();

   $(studentList).each(function(i) {
     if (i >= ((pageNumber-1)*10) &&  i < (pageNumber*10  )  ) {
       $(this).css("display", "block");
     }
     else {
         $(this).css('display','none');
     }

   });

 }

studentList = $(".student-list li");
createPage(1,studentList);
addPageLinks(studentList);
addSearchOption();
