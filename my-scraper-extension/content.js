// Function to create a UI for entering URL and selectors
function createUI() {
    const existingUI = document.getElementById("custom-fetch-ui");
    if (existingUI) return; // Prevent creating multiple UIs

    const container = document.createElement("div");
    container.id = "custom-fetch-ui";
    container.style.position = "fixed";
    container.style.top = "10px";
    container.style.right = "10px";
    container.style.zIndex = "10000";
    container.style.backgroundColor = "#fff";
    container.style.border = "1px solid #ccc";
    container.style.padding = "10px";
    container.style.borderRadius = "5px";
    container.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";

    container.innerHTML = `
        <h3>Fetch Content</h3>
        <label for="url-input">URL:</label><br>
        <input type="text" id="url-input" style="width: 100%;"><br><br>
        <label for="selector-input">Selectors:</label><br>
        <input type="text" id="selector-input" style="width: 100%;"><br><br>
        <button id="fetch-button">Fetch Content</button>
    `;

    document.body.appendChild(container);

    // Add event listener to the button
    document
        .getElementById("fetch-button")
        .addEventListener("click", async () => {
            console.log("click the button");
            // const url = document.getElementById("url-input").value;
            // const selectors = document.getElementById("selector-input").value;

            // Inside the fetch button click event listener
            const url = "https://engfluent.com/course/"; // Updated URL for testing
            const selectors = { heading: "h2.wp-block-heading" }; // Updated selectors for testing

            try {
                const response = await fetch(
                    "http://localhost:8000/scrape-general",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ url, selectors }),
                    }
                );

                const data = await response.json();
                console.log(data);

                if (data.success) {
                    // Fill the ChatGPT input with the fetched data and a prompt
                    const chatInput =
                        document.getElementById("prompt-textarea"); // Select the contenteditable div
                    if (chatInput) {
                        // Set the inner HTML of the contenteditable div
                        chatInput.innerHTML = `Summarize the following content: ${JSON.stringify(
                            data.data
                        )}`;

                        // Ensure the cursor is at the end
                        const range = document.createRange();
                        const sel = window.getSelection();
                        range.selectNodeContents(chatInput);
                        range.collapse(false); // Collapse to the end
                        sel.removeAllRanges();
                        sel.addRange(range);

                        console.log(chatInput);

                        console.log(
                            `Summarize the following content: ${JSON.stringify(
                                data.data
                            )}`
                        );

                        // Trigger input event to notify ChatGPT of the change
                        const event = new Event("input", {
                            bubbles: true,
                            cancelable: true,
                        });
                        chatInput.dispatchEvent(event);
                    }
                } else {
                    console.error("Error fetching data:", data);
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }
        });
}

// Function to ensure the UI remains in place
function ensureUI() {
    const existingUI = document.getElementById("custom-fetch-ui");
    if (!existingUI) {
        createUI(); // Create UI if it doesn't exist
    }
}

// Create the UI initially
createUI();

// Set an interval to check every 1000ms (1 second)
setInterval(ensureUI, 1000);
