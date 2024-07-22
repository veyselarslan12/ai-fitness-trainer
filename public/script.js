const form = document
  .querySelector("form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const workoutTypes = document.getElementById("workoutTypes").value;
    const workoutFrequency = document.getElementById("workoutFrequency").value;
    
    const result = document.getElementById("result");

    let genderMessage = ''  
    
    if (gender === 'male') {
       genderMessage = 'I am a male'
    } else if (gender === 'female') {
      genderMessage = 'I am a female'
    } 
    const workoutPrompt = `My name is ${name}.I am ${age} years old.${genderMessage}.I am ${height} and ${weight}.My workout type is ${workoutTypes}.${workoutFrequency}.`;

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
        result.innerHTML = formatWorkoutPlan(data.content)
      } else {
        result.textContent = 'Error generating fitness workout advice.'
      }
      
    } catch (error) {
      console.log(error);
    }
  });

function formatWorkoutPlan(content) {
  const lines = content.split('\n');
  let html = '';
  let currentDay = '';
  let currentWorkouts = [];

  lines.forEach(line => {
      if (line.startsWith('Day ')) {
          if (currentDay) {
              html += createCard(currentDay, currentWorkouts);
              currentWorkouts = [];
          }
          currentDay = line;
      } else if (line.startsWith('- ')) {
          currentWorkouts.push(line.slice(2));
      } else if (line.trim()) {
          if (currentDay) {
              html += createCard(currentDay, currentWorkouts);
              currentDay = '';
              currentWorkouts = [];
          }
          html += `<h2>${line}</h2>`;
      }
  });

  if (currentDay) {
      html += createCard(currentDay, currentWorkouts);
  }

  return `<div class="grid grid-cols-1 gap-4">${html}</div>`;
}

function createCard(day, workouts) {
  let workoutItems = workouts.map(workout => `<li>${workout}</li>`).join('');
  return `
      <div class="card shadow-lg bg-white">
          <div class="card-body">
              <h3 class="card-title">${day}</h3>
              <ul>${workoutItems}</ul>
          </div>
      </div>
  `;
}
