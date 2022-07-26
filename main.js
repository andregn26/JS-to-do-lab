let form = document.getElementById("form")
let inputTask = document.getElementById("textInput")
let dateInput = document.getElementById("dateInput")
let descriptionInput = document.getElementById("descriptionInput")
let msg = document.getElementById("msg")
let tasks = document.getElementById("tasks")
let addButton = document.getElementById("addButton")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  formValidation()
})

let formValidation = () => {
  if (inputTask.value === "") {
    console.log("failure")
    msg.innerHTML = "Task cannot be blank"
  } else {
    console.log("success")
    msg.innerHTML = ""
    acceptData()
    addButton.setAttribute("data-bs-dismiss", "modal")
    addButton.click()
    ;(() => {
      addButton.setAttribute("data-bs-dismiss", "")
    })()
  }
}

let data = []

let acceptData = () => {
  data.push({
    task: textInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  })
  localStorage.setItem("data", JSON.stringify(data))
  createTasks()
}

let createTasks = () => {
  tasks.innerHTML = ""
  data.map((x, y) => {
    return (tasks.innerHTML += `<div id="${y}" class="card-container">
            <div  class="card-container-header">
              <span class="fw-bold">${x.task}</span>
              <span class="smal text-secondary">${x.date}</span>
            </div>
            <p>${x.description}</p>
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
              <i onClick = "deleteTask(this); createTasks()" class="fa-solid fa-trash-can"></i>
            </span>
          </div>`)
  })
  resetForm()
}

let deleteTask = (e) => {
  e.parentElement.parentElement.remove()
  data.splice(e.parentElement.parentElement.id, 1)
  localStorage.setItem("data", JSON.stringify(data))
  console.log("This is my console log ==> ", data)
}

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement
  textInput.value = selectedTask.children[0].children[0].innerHTML
  dateInput.value = selectedTask.children[0].children[1].innerHTML
  descriptionInput.value = selectedTask.children[1].innerHTML
  deleteTask(e)
}

let resetForm = () => {
  textInput.value = ""
  dateInput.value = ""
  descriptionInput.value = ""
}

;(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  createTasks()
  console.log(data)
})()
