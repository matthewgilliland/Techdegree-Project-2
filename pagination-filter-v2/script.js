/*jshint esversion: 6 */
/*
* Welcome to my Pagination & Content Filter project!
* I'm shooting for "Exceeds Expectations."
* Thanks for your time!
*/

// Global variables: Student list, # of items, # of pages, pagination div
let studentList = $('.student-list').children();
let itemCount = 10;
let pageCount;
let pagination = $('.pagination');

// Global variables 2: Search bar, search result variable, name/email selection
let searchBar = '<div class="student-search"><input id="search-input" type="text" placeholder="Search for students..."><button id="search-button">Search</button><div>';
let searchResult;
let currentList = '';
let names = $('h3');
let emails = $('.email');

/*FIXME: Took the showPage function from one variable to
two when I added the search bar, but now the page
links from addPages don't work, and I have no idea why */
// Function to add page links
function addPages() {
  let ul = $('<ul></ul>'); // Adds the ul tags
  let pageCount = Math.ceil(currentList.length/itemCount); // Calculates page amount based on current list
  for (let i = 1; i <= pageCount; i++) { // Loops to create each link
    let listLink = $('<li><a href="#" class="pageLink">' + i + '</a></li>'); // Produces link html
    $(ul).append(listLink); // Adds link to list
    pagination.append(ul); // Displays links to page
  }
}


// Function to show students by page number
function showPage(x, y) { // Takes arguments for page number and source list
  $(studentList).hide(); // Hides initial list of all students
  for (let i = 0; i < y.length; i++) { // Loops to check for right range
    if (i < x * itemCount && i + 1 > (x - 1) * itemCount) {
      $(y[i]).show(); // Shows students in correct number range
    }
  }
  currentList = y; // Sets current list so addPages knows how many pages to make
}

// Event listener for showing chosen page
$('.pageLink').click(function() { // Listens for click on page links
  let pageNumber = event.target.textContent; // Assigns range to function by page
  showPage(pageNumber, currentList); // Calls function for that page and current list
});

// Add search bar via JavaScript
$('.page-header').append(searchBar); // Adds unobtrusive search bar

/* FIXME: This works... but the opposite way and I don't know why. when
I search, it removes the searched person from the screen and removes
the links, but never shows results or replaces the links as
the function indicates*/
// Search function
function searchList() {
  let searchResult = []; // Assigns searchResult to empty array/clears previous search
  let searchInput = $('#search-input').val().toLowerCase(); // Sets search to lower-case
  pagination.remove(); // Clears links to get them out of the way
  for (let i = 0; i < studentList.length; i++) {
    if (names[i].textContent.search(searchInput) || emails[i].textContent.search(searchInput)) {
      searchResult.push(studentList[i]); // Loops to search name/email and add to result array
    }
  }
  if (searchResult.length === 0) {
    $(studentList).hide(); // Hides initial list of all students
    $('.sorry').remove(); // Removes previous failed search, if present
    $('.page-header').append('<div class="sorry"><p><strong></strong>Sorry, no results found!</p></div>');
  } else if (searchResult.length <= 10) {
    $('.sorry').remove(); // Removes previous failed search, if present
    $(studentList).hide(); // Hides initial list of all students
    showPage(1, searchResult);
  } else {
    $('.sorry').remove(); // Removes previous failed search, if present
    $(studentList).hide(); // Hides initial list of all students
    showPage(1, searchResult);
    addPages();
  }
}

// Event listener for search button
$('#search-button').click(function() {
  searchList();
});

// Show page 1 on site load
showPage(1, studentList); // Shows default page (1) on page load w/ full list

addPages(); // Calls function to actually place links on the page
