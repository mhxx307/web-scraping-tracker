# Web Scraping Tracker

## Project Overview

The Web Scraping Tracker is a web application designed to scrape content from specified URLs using defined selectors. It utilizes Node.js for the backend and allows users to input URLs and selectors to fetch data, which can then be summarized or processed further.

## Features

-   Scrape content from any URL using CSS selectors.
-   Fetch and display scraped data in a user-friendly interface.
-   Integrate with ChatGPT for summarization of the fetched content.

## Technologies Used

-   Node.js
-   Express
-   Axios
-   Cheerio
-   MongoDB (optional for data storage)
-   Puppeteer (optional for headless browsing)

## Getting Started

### Prerequisites

-   Node.js (v14 or higher)
-   MongoDB (if you plan to use the database)
-   npm (Node Package Manager)

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/web-scraping-tracker.git
    cd web-scraping-tracker
    ```

2. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Set up environment variables:**

    Create a `.env` file in the `backend` directory and add your MongoDB connection string:

    ```
    MONGODB_URL=your_mongodb_connection_string
    PORT=8000
    ```

5. **Start the backend server:**

    ```bash
    npm start
    ```

    The server will run on `http://localhost:8000`.

### Running the Frontend

1. **Navigate to the my-scraper-extension directory:**

    ```bash
    cd my-scraper-extension
    ```

2. **Load the extension in your browser:**

    - For Chrome:
        - Go to `chrome://extensions/`
        - Enable "Developer mode"
        - Click "Load unpacked" and select the `my-scraper-extension` directory.

3. **Open the extension and use the UI to input URLs and selectors.**

## Usage

1. Enter the URL you want to scrape in the input field.
2. Specify the CSS selectors for the data you want to extract.
3. Click the "Scrape & Summarize" button to fetch the data.
4. The scraped data will be displayed, and you can use it as needed.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.
