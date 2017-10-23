const firstPage = 1;

function createSearchResult(studentName) {

    let matchFound = false;
    $('.student-list').children().each(function(index) {

     let name = $(this).find('h3').text();
     let email = $(this).find('.email').text();

     if ( (name.indexOf(studentName) !== -1) || (email.indexOf(studentName) !== -1) )   {
        $(this).css('display', 'block');
        matchFound = true;
     }
    else {
      $(this).css('display', 'none');
    }

 });

 if (!matchFound) {

   $('.page').append('<div class= "errmsg">No Matching student found !!</div>');
 }

}

/*function to create a page corresponding to the page number. Loop through the student list and hide the list elements
 based on page number
*/
function createPage(pageNumber) {
    $('.errmsg').hide();
    $('.student-list').children().each(function(index) {

    if (index >= ((pageNumber-1)*10) &&  index < (pageNumber*10  )  ) {
      $(this).css('display', 'block');
    }
    else {
      $(this).css('display', 'none');
    }

 });
}

 //Dynamically add page links based on no of students.
 function addPageLinks() {

   let noOfStudents;
   let noOfLinks;
   let listElement = "<li> <a class='active'>" + 1 + "</a> </li>";
   let pageLink;
   noOfStudents = $('.student-list').children().length;
   noOfLinks = Math.ceil(noOfStudents /10);
   for(i = 2; i <= noOfLinks; i += 1 ) {
    listElement += "<li> <a>" + i + "</a> </li>" ;
   }
   pageLink =$("<div class='pagination'> <ul> " +   listElement +   "</ul>  </div>");
   $('.page').append(pageLink);

 }

/* function to do the pagination. When a link is clicked, the already active link is deactivated, and
'active' class is added to the the link which clicked.  Then the page is build by calling createPage function.
*/
 function addPagination() {

   $('.pagination li').on('click', function() {
       let pageNumber = parseInt($(this).text());
        $('.active').toggleClass();
        $(this).find ('a').addClass("active");
        createPage(pageNumber);
   });
 }

 //function to add Search option
 function   addSearchOption() {
   let studentName;
   let searchOption = "<div class='student-search'><input placeholder='Search for students...'>" +
                      "<button>Search</button></div>";
   $('.page-header').append(searchOption);
   $('button').on('click',function(){
     studentName = $('input').val();
     $('.pagination').hide();
     $('.errmsg').hide();
     if (studentName === "") {
         createPage(firstPage);
         addPageLinks();
         addPagination();
      }
      else {
       createSearchResult(studentName);
     }
   });

 }

  createPage(firstPage);
  addPageLinks();
  addPagination();
  addSearchOption();
