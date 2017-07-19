/*jshint esversion: 6 */
/*
* Welcome to my Pagination & Content Filter project!
* I'm shooting for "Exceeds Expectations."
* Thanks for your time!
*/

// Global variables: Student list, # of items, # of pages, pagination div
let studentList = $('.student-list').children();
let itemCount = 10;
let pageCount = Math.ceil(studentList.length/itemCount);
let pagination = $('.pagination');

// Global variables 2: Search bar, search result variable, name/email selection
let searchBar = '<div class="student-search"><input id="search-input" type="text" placeholder="Search for students..."><button>Search</button><div>';
let searchResult;
let names = $('h3');
let emails = $('.email');

// Function to add page links
function addPages() {
  let ul = $('<ul></ul>'); // Adds the ul tags
  for (let i = 1; i <= pageCount; i++) { // Loops to create each link
    let listLink = $('<li><a href="#" class="pageLink">' + i + '</a></li>'); // Produces link html
    $(ul).append(listLink); // Adds link to list
    pagination.append(ul); // Displays links to page
  }
}

addPages(); // Calls function to actually place links on the page

// Function to show students by page number
function showPage(x, y) {
  $(studentList).hide(); // Hides initial list of all students
  for (let i = 0; i < y.length; i++) { // Loops to check for right range
    if (i < x * itemCount && i + 1 > (x - 1) * itemCount) {
      $(y[i]).show(); // Shows students in correct number range
    }
  }
}

// Event listener for showing chosen page
$('.pageLink').click(function() { // Listens for click on page links
  let pageNumber = event.target.textContent; // Assigns range to function by page
  showPage(pageNumber); // Calls function for that page number
});

// Search function
function searchList() {
  let searchResult = []; // Assigns searchResult to array/clears previous search
  let searchInput = $('#search-input').val().toLowerCase();
  pagination.remove();
  for (let i = 0; i < studentList.length; i++) {
    if (names[i].textContent.search(searchInput) || emails[i].textContent.search(searchInput)) {
      searchResult.push(studentList[i]);
    }
  }
// TODO: 0 searches - error,
// if length <= 10 - show,
// if >10 - show and add pages, 
// fix addPages to have an input variable,
// remove errors in all cases for multiple searches
// add line by line comments
}


// Add search bar via JavaScript
$('.page-header').append(searchBar); // Adds unobtrusive search bar

// Show page 1 on site load
showPage(1, studentList); // Shows default page (1) on page load w/ full list
