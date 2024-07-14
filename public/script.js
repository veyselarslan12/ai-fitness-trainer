// const height = "5'10\"" 
// const weight = ""
// const heightMessage = height ? `My height is ${height}`: ''
// const weightMessage = weight ? `My weight is ${weight}`: ''

// const fakePrompt = `You are my fitness trainer and i want you to a suggest fitness plan, ${heightMessage} ${weightMessage} `
 
const form = document.querySelector('form')

const name = document.getElementById('name').value
const age = document.getElementById('age').value ? `I am ${age} years old.`: ''
const gender = document.getElementById('gender').value // TODO: Get help from teacher
const height = document.getElementById('height').value
const weight = document.getElementById('weight').value
const workoutTypes = document.getElementById('workoutTypes').value
const medicalConditions = document.getElementById('medicalConditions').value
const dietaryPreferences = document.getElementById('dietaryPreferences').value
const workoutFrequency = document.getElementById('workoutFrequency').value
const workoutAvailability = document.getElementById('workoutAvailability').value
const preferredLocation = document.getElementById('preferredLocation').value
const result = document.getElementById('result')

const medicalConditionsMessage = medicalConditions ? `My medical issue is ${medicalConditions}`: ''
const dietaryPreferencesMessage = `My dietary preferences is ${dietaryPreferences}`
const workoutFrequencyMessage = workoutFrequency ? `I would like to workout ${workoutFrequency}`: ''

const workoutPrompt = `My name is ${name}.${age}.`