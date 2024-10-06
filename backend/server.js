require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
// const puppeteer = require("puppeteer");
var cors = require("cors");
// const connectDatabase = require("./configs/connectDB");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// connectDatabase();

// Function to scrape individual product details
const scrapeGenericDetails = async (url, selectors) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const scrapedData = {};
        for (const [key, selector] of Object.entries(selectors)) {
            scrapedData[key] = $(selector).text().trim();
        }

        return scrapedData;
    } catch (error) {
        console.error(`Error scraping data: ${error.message}`);
        return null; // Return null if there's an error
    }
};

app.get("/", (req, res) => {
    return res.status(500).json({ message: "Hello!" });
});

// test endpoint: localhost:8000/scape-general
app.post("/scrape-general", async (req, res) => {
    const { url, selectors } = req.body;

    console.log(url, selectors);

    if (!url || !selectors) {
        return res.status(400).json({
            success: false,
            message: "URL and selectors are required.",
        });
    }

    try {
        const scrapedData = await scrapeGenericDetails(url, selectors);
        console.log(scrapedData);

        // Check if scrapedData is valid
        if (!scrapedData) {
            return res.status(500).json({
                success: false,
                message:
                    "Failed to scrape data. Please check the URL and selectors.",
            });
        }

        res.status(200).json({ success: true, data: scrapedData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
