// Create an empty object to store movie titles and ratings
let movieHist= {};

// Get references to various HTML elements
const inp = document.querySelector("input"); // Input field
const myMovieList = document.querySelector("ul"); // Unordered list element to display movie titles
const table = document.createElement('table'); // Table element to display movie titles and ratings
const movieHistoryCard = document.getElementById('movieHistoryCard'); // Div element to display the table
const filter_input = document.getElementById(`filter`); // Input field to filter displayed movie titles

// Function to filter displayed movie titles based on user input
const filter_movies = (event) => {
    // Get user input from the filter_input field
    input = event.target.value;
    // Filter movie titles based on user input (case-insensitive)
    let arr = Object.keys(movieHist).filter(movie => {
        return movie.toLowerCase().includes(input.toLowerCase());
    });
    // Clear current movie list HTML content
    myMovieList.innerHTML = ``;
    // Log the filtered movie titles to the console
    console.log(arr);
    // Loop through filtered movie titles
    arr.forEach(textToInsert => {
        // Create a new text node containing the current movie title
        const list_text = document.createTextNode(textToInsert);
        // Create a new list element to display the current movie title
        const li = document.createElement("li");
        // Add the class "movie_list" to the new list element
        li.classList.add('movie_list');
        // Append the text node to the new list element
        li.appendChild(list_text);
        // Set the list style of the new list element to "none"
        li.style.listStyleType = "none";
        // Append the new list element to the unordered list element in the HTML document
        myMovieList.appendChild(li);
    });
};

// Function to clear the input field
const clearInput = () => {
    inp.value = "";
};

// Function to clear the movieHist object, the movie list HTML content, and the table HTML content
const clearMovies = () => {
    movieHist = {};
    myMovieList.innerHTML = '';
    table.innerHTML = '';
};

// Function to add a new movie to the movieHist object and update the displayed movie list and table
const addMovie = () => {
    // Get the user's typed input from the input field and remove any leading or trailing white space
    const userTypedText = inp.value.trim();
    // Check if the user's input is not empty
    if (userTypedText !== '') {
        // Convert the user's input to title case (capitalize first letter of each word)
        let textToInsert = userTypedText.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        // Check if the current movie title already exists in the movieHist object
        if (textToInsert in movieHist) {
            // If the movie title already exists, increment its count in the movieHist object
            movieHist[textToInsert] += 1;
        } else {
            // If the movie title does not already exist, add it to the movieHist object with a count of 1
            movieHist[textToInsert] = 1;
            // Create a new list element to display the new movie title in the HTML document
            const li = document.createElement("li");
            // Add the class "movie_list" to the new list element
            li.classList.add('movie_list');
            // Create a new text node containing the new movie title
            const list_text = document.createTextNode(textToInsert);
            // Append the new text node to the new list element
            li.appendChild(list_text);
            // Set the list style of the new list element to "none"
            li.style.listStyleType = "none";
            // Append the new list element to the unordered list element in the HTML document
            myMovieList.appendChild(li);  
        };

        // Update the table HTML content with the current movieHist object data
        table.innerHTML = `
            <tr>
                <th>Movie</th>
                <th>Count</th>
            </tr>
            <tr>
                <td>${textToInsert}</td>
                <td>${movieHist[textToInsert]}</td>
            </tr>
        `;

        // Loop through each movie title and count in the movieHist object
        for (const [movie, count] of Object.entries(movieHist)) {
            // Check if the current movie title is not the same as the new movie title (to avoid duplicating the new row)
            if (movie !== textToInsert) {
                // If the current movie title is different, add a new row to the table HTML content with the movie title and count
                table.innerHTML += `
                    <tr>
                        <td>${movie}</td>
                        <td>${count}</td>
                    </tr>
                `;
            };
        };

        // Clear the movieHistoryCard div element's HTML content
        movieHistoryCard.innerHTML = '';
        // Append the updated table to the movieHistoryCard div element in the HTML document
        movieHistoryCard.appendChild(table);
        // Set the width of the table to 100% to fill the available space in the movieHistoryCard div element
        table.style.width = "100%";
    };

    // Clear the input field after the new movie is added
    clearInput();
};

filter_input.addEventListener('input', filter_movies);