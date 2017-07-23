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
let currentList = studentList;
let names = $('h3');
let emails = $('.email');

// Function to add page links
function addPages(x) {
  let ul = $('<ul></ul>'); // Adds the ul tags
  let currentLength = currentList.length;
  let pageCount = Math.ceil(currentLength/itemCount); // Calculates page amount based on current list
  for (let i = 1; i <= pageCount; i++) { // Loops to create each link
    let listLink = $('<li><a href="#" class="pageLink">' + i + '</a></li>'); // Produces link html
    $(ul).append(listLink); // Adds link to list
    pagination.append(ul); // Displays links to page
  }
  $('.pageLink').click(function() { // Listens for click on page links
    let pageNumber = event.target.textContent; // Assigns range to function by page
    showPage(pageNumber, x); // Calls function for that page and current list
  });
}

// Function to show students by page number
function showPage(x, y) { // Takes arguments for page number and source list
  $(studentList).hide(); // Hides initial list of all students
  let currentLength = y.length;
  for (let i = 0; i < currentLength; i++) { // Loops to check for right range
    if (i < x * itemCount && i + 1 > (x - 1) * itemCount) {
      $(y[i]).show(); // Shows students in correct number range
    }
  }
  currentList = y; // Sets current list so addPages knows how many pages to make
}

// Show page 1 on site load
showPage(1, studentList); // Shows default page (1) on page load w/ full list



// Add search bar via JavaScript
$('.page-header').append(searchBar); // Adds unobtrusive search bar

// Search function
function searchList() {
  let searchResult = []; // Assigns searchResult to empty array/clears previous search
  let searchInput = $('#search-input').val().toLowerCase(); // Sets search to lower-case
  pagination.empty(); // Clears links to get them out of the way
  for (let i = 0; i < studentList.length; i++) {
    if (names[i].textContent.search(searchInput) != -1 || emails[i].textContent.search(searchInput) != -1) {
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
  document.getElementById('search-input').value = '';
}

// Event listener for search button
$('#search-button').click(function() {
  searchList();
});



addPages(currentList); // Calls function to actually place links on the page
