# E-Commerce Product Dashboard

Project is hosted on gitHub Pages.
Link to the project: https://sumedhrandhawa.github.io/StrategyWerksProject/

## How to Run This Project on local?

Follow these steps to set up and run the project locally:

1. **Prerequisites**  
   Ensure that the following software is installed on your system:
   - **Node.js** (latest stable version)
   - **npm** (Node Package Manager)

2. **Clone the Repository**  
   Clone the project repository to your local machine:
   ```bash
   git clone <repository_url>

3. **Open the project directory. Ensure the path includes the strategywerksWIP folder:**
   cd path_to_project/strategywerksWIP

4. **Run the following command to install all the necessary dependencies:**
   npm install

5. **Once the dependencies are installed, start the development server by running:**
   npm run start
   
6. **Open your browser and navigate to:**
   http://localhost:3000


## What all is covered in the project.

1. **API Choice**
   I choose a 3rd party API from https://api.escuelajs.co/api/v1/products

2. **Functionality**
   •	Product List: It displays products dynamically fetched from an API.
	•	Implemented infinite scrolling and a “Load More” button for better performance.
	•	Product Filters: It is filtering functionality for product title and price range;
	•	Implemented a “Clear Filters” button to reset all input fields and filters.
	•	Product Sorting: Sorting by creating a dropdown menu with radio buttons for sorting options:
	•	Price: High to Low, Low to High.
	•	Alphabetical: A-Z, Z-A.
	•	Ensured only one option is selectable at a time.
	•	Product Modal: Designed a modal to display additional product details when a product is clicked.
	•	Modal data was fetched dynamically for optimization.
   •	Ensured immutability while updating the state (e.g., in filtering and sorting).
	•	Applied lazy loading and conditional rendering for better performance.
	•	Handled datasets efficiently by appending new data instead of reloading all data.
   •	Displayed meaningful error messages in case of API failures.
	•	Added loading... for a better user experience during data fetches.
   •	Sorting logic with immutability and correct conditions.
	•	Filtering products with edge-case handling.
	•	Smooth scroll restoration during data fetches.


   3. **KNOWN LIMITATIONS OR ADDITIONAL ENHANCEMENTS I WOULD MAKE**
   •  Since we aren't using our own api so filter only works on the received products, If there would have been our own api, we would have applied the filter on the server side itself for better and smooth results.
   •	The API didn't have the provision to handle all filters together, so most of the things I am handling at the front-end side.
   •	I would have made separate burger icon to open filter and make use of those options.
   •	For mobile version, instead of single product I would have made multiple (at least 2) for user to see in a single go.
   •	If there would have been more pictures for single product, I would have put them in a carousel.
