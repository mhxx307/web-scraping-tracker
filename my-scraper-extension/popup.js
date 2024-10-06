document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("scrape").addEventListener("click", async () => {
        console.log("Scrape button clicked!"); // Debug log

        const url = "https://engfluent.com/course/"; // Updated URL for testing
        const selectors = { heading: "h2.wp-block-heading" }; // Updated selectors for testing

        try {
            const response = await fetch(
                "http://localhost:8000/scrape-general",
                {
                    // Your server endpoint
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ url, selectors }),
                }
            );

            const data = await response.json();
            console.log("Fetched data:", data);

            if (data && data.success) {
                document.getElementById("result").innerText = JSON.stringify(
                    data.data,
                    null,
                    2
                ); // Convert to string for display

                const summaryPrompt = `Summarize the following: ${JSON.stringify(
                    data.data
                )}`;
                console.log("Generated summaryPrompt: ", summaryPrompt);

                // Selector for the ChatGPT input field
                const inputField = document.querySelector(
                    'div[contenteditable="true"]'
                );
                console.log("Found input field: ", inputField);

                if (inputField) {
                    // Since it's a contenteditable div, you should set innerHTML or innerText
                    inputField.innerHTML = summaryPrompt; // Insert summary into ChatGPT input field
                } else {
                    console.error("ChatGPT input field not found.");
                }
            } else {
                document.getElementById("result").innerText =
                    data.message || "An error occurred during scraping.";
            }
        } catch (error) {
            console.error("Error during fetch:", error);
            document.getElementById("result").innerText =
                "An error occurred while trying to scrape and summarize.";
        }
    });
});
