// const height = "5'10\""
// const weight = ""
// const heightMessage = height ? `My height is ${height}`: ''
// const weightMessage = weight ? `My weight is ${weight}`: ''

// const fakePrompt = `You are my fitness trainer and i want you to a suggest fitness plan, ${heightMessage} ${weightMessage} `

const form = document
  .querySelector("form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value; // TODO: Get help from teacher
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const workoutTypes = document.getElementById("workoutTypes").value;
    const medicalConditions =
      document.getElementById("medicalConditions").value;
    const dietaryPreferences =
      document.getElementById("dietaryPreferences").value;
    const workoutFrequency = document.getElementById("workoutFrequency").value;
    const workoutAvailability = document.getElementById(
      "workoutAvailability"
    ).value;
    const preferredLocation =
      document.getElementById("preferredLocation").value;
    const result = document.getElementById("result");

    const medicalConditionsMessage = medicalConditions
      ? `My medical issue is ${medicalConditions}`
      : "";
    const dietaryPreferencesMessage = `My dietary preferences is ${dietaryPreferences}`;
    const workoutFrequencyMessage = workoutFrequency
      ? `I would like to workout ${workoutFrequency}`
      : "";

    let genderMessage = ''  
    
    if (gender === 'male') {
       genderMessage = 'I am a male'
    } else if (gender === 'female') {
      genderMessage = 'I am a female'
    } 
    const workoutPrompt = `My name is ${name}.I am ${age} years old.${genderMessage}.I am ${height} and ${weight}.My workout type is ${workoutTypes}.${medicalConditionsMessage}.${dietaryPreferencesMessage}.${workoutFrequencyMessage}.I am available to workout ${workoutAvailability}.I prefer to workout ${preferredLocation}.`;

    try {
      const response = await fetch('/fitness-trainer', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workoutPrompt }),
      });

      console.log(workoutPrompt)

      if (response.ok) {
        const data = await response.json();
        const text = document.createElement("p");
        text.textContent = data.content
        result.appendChild(text);
      } else {
        result.textContent = 'Error generating fitness workout advice.'
      }
      
    } catch (error) {
      console.log(error);
    }
  });
