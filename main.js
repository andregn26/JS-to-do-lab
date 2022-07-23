let form = document.getElementById("form")
let inputTask = document.getElementById("textInput")
let msg = document.getElementById("msg")

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
  }
}
