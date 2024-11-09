// Function to handle the "Start" button click
function startCalculator() {
    // Hide the start button and container
    document.getElementById("startContainer").style.display = "none";

    // Show the tab buttons and open the Body Measurements tab by default
    document.querySelector(".tab-container").style.display = "block";
    openTab('bodyMeasurements');
}

// Function to show the selected tab and hide others
function openTab(tabName) {
    const tabs = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none"; // Hide all tabs
    }
    document.getElementById(tabName).style.display = "block"; // Show selected tab
}

// Function to calculate results based on user input
function calculateResults() {
    console.log("Calculate button clicked");

    // Retrieve and parse all input values as floats
    const chest = parseFloat(document.getElementById("chest").value);
    const waist = parseFloat(document.getElementById("waist").value);

    const chestSkinfold = parseFloat(document.getElementById("chestSkinfold").value);
    const abdomen = parseFloat(document.getElementById("abdomen").value);
    const thighSkinfold = parseFloat(document.getElementById("thighSkinfold").value);
    const tricepSkinfold = parseFloat(document.getElementById("tricepSkinfold").value);
    const subscapular = parseFloat(document.getElementById("subscapular").value);
    const supraliac = parseFloat(document.getElementById("supraliac").value);
    const midaxillary = parseFloat(document.getElementById("midaxillary").value);

    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);
    const age = parseFloat(document.getElementById("age").value); 

    // Check if any of the required values are NaN (invalid input)
    if (isNaN(chest) || isNaN(waist) ||
        isNaN(chestSkinfold) || isNaN(abdomen) || isNaN(thighSkinfold) || isNaN(tricepSkinfold) || 
        isNaN(subscapular) || isNaN(supraliac) || isNaN(midaxillary) || isNaN(weight) || isNaN(height) || isNaN(age)) {
        alert("Please fill in all fields correctly.");
        return; // Stop execution if any input is invalid
    }

    // Summing the skinfolds for the 7-point calculation
    const sumSkinfolds = chestSkinfold + abdomen + thighSkinfold + tricepSkinfold + subscapular + supraliac + midaxillary;

    // Calculate Body Density (Jackson-Pollock 7-point formula for men)
    const bodyDensity = 1.112 - 0.00043499 * sumSkinfolds + 0.00000055 * (sumSkinfolds ** 2) - 0.00028826 * age; // 25 used as an estimated age

    // Calculate Body Fat Percentage
    let bodyFatPercentage = ((4.95 / bodyDensity) - 4.5) * 100;

    // Prevent negative body fat percentage
    if (bodyFatPercentage < 0) {
        bodyFatPercentage = 0;
    }

    // Calculate Lean Body Mass
    const leanBodyMass = weight * (1 - bodyFatPercentage / 100);

    // Calculate Ratios
    const waistToHeightRatio = waist / height;
    const waistToChestRatio = waist / chest;

    // Display the results on the webpage
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
        <h2>Results</h2>
        <p><strong>Body Fat Percentage:</strong> ${bodyFatPercentage.toFixed(2)}%</p>
        <p><strong>Lean Body Mass:</strong> ${leanBodyMass.toFixed(2)} kg</p>
        <p><strong>Waist-to-Height Ratio:</strong> ${waistToHeightRatio.toFixed(2)}</p>
        <p><strong>Waist-to-Chest Ratio:</strong> ${waistToChestRatio.toFixed(2)}</p>
    `;
}




