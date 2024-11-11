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

// Hide the input form, title, and tabs
    document.getElementById("basicMetrics").style.display = "none"; // Hide form
    document.getElementById("skinfoldMeasurements").style.display = "none"; // Hide form
    document.getElementById("bodyMeasurements").style.display = "none"; // Hide form
    document.querySelector("h1").style.display = "none";  // Hides the title
    document.querySelector(".tab-container").style.display = "none";  // Hides the tab buttons


    // Display the results on the webpage
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `
    <h2>Results</h2>
    <p><strong>Body Fat Percentage:</strong> ${bodyFatPercentage.toFixed(2)}%</p>
    <p><strong>Lean Body Mass:</strong> ${leanBodyMass.toFixed(2)} kg</p>
    <p><strong>Waist-to-Height Ratio:</strong> ${waistToHeightRatio.toFixed(2)}</p>
    <p><strong>Waist-to-Chest Ratio:</strong> ${waistToChestRatio.toFixed(2)}</p>

    <!-- Slider for Body Fat Percentage -->
    <div id="slider-container">
        <label for="bodyFatSlider">Body Fat Percentage: </label>
        <input type="range" id="bodyFatSlider" min="0" max="50" value="0" step="0.1" disabled>
        <span id="bodyFatPercentage"></span>
    </div>
`;

    // Ensure results container is visible
    resultsDiv.style.display = "block";

    // Animate the slider from 0 to the body fat percentage value
    const slider = document.getElementById("bodyFatSlider");
    const sliderLabel = document.getElementById("bodyFatPercentage");

    let currentVal = 0;
    const targetVal = bodyFatPercentage;

    // Function to calculate the color based on body fat percentage
function getColorBasedOnPercentage(percentage) {
    if (percentage <= 2) {
        return "white";
    } else if (percentage <= 14) {
        // Transition from light green to bright green
        const greenValue = Math.floor(255 * (percentage - 2) / 12); // 12 range (from 2 to 14)
        return `rgb(0, ${greenValue}, 0)`;
    } else if (percentage <= 21) {
        // Transition from yellow
        const redValue = Math.floor(255 * (percentage - 14) / 7); // 7 range (from 14 to 21)
        return `rgb(${redValue}, 255, 0)`;
    } else if (percentage <= 31) {
        // Transition from pink to red
        const greenValue = Math.floor(255 * (percentage - 21) / 10); // 10 range (from 21 to 31)
        return `rgb(255, ${255 - greenValue}, ${greenValue})`;
    } else {
        // Fully red from 31 to 50
        return "rgb(255, 0, 0)";
    }
}

    // Update the slider and label gradually
    const interval = setInterval(() => {
        if (currentVal < targetVal) {
            currentVal += 0.5; // Adjust speed here, the smaller the number, the slower the slide
            slider.value = currentVal.toFixed(1);
            sliderLabel.textContent = `${currentVal.toFixed(1)}%`;
            
          // Apply the color update for the body fat percentage number
          sliderLabel.style.color = getColorBasedOnPercentage(currentVal);  // Apply color change here
        } else {
            clearInterval(interval); // Stop the interval once the target value is reached
        }
    }, 15); // Set interval to 30ms for smooth animation
}




