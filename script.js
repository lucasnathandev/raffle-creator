const textArea = document.querySelector("#textarea")

function createTags(input) {
  const tags = input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim())
  return tags
}

function getRandomTag() {
  const tags = document.querySelectorAll(".tag")
  return tags[Math.floor(Math.random() * tags.length)]
}

function addHighlightClass(element) {
  element.classList.add("highlight")
  element.style.transform = "scale(1.2)"
}
function removeHighlightClass(element) {
  element.classList.remove("highlight")
  element.style.transform = "scale(1)"
}

function lucky(tag) {
  tag.style.transition = ".5s ease"
  tag.style.transform = "scale(2)"
  showWinner(tag)
}

function showWinner(tag) {
  const lucky = document.querySelector(".lucky")
  lucky.innerHTML = "Winner:"
  lucky.style.display = "block"

  const winner = document.createElement("span")
  winner.textContent = ` ${tag.textContent}`
  console.log(winner.textContent)

  lucky.appendChild(winner)
}

function clearInput(input) {
  setTimeout(() => {
    input.value = ""
  }, 10)
}

function raffle(times) {
  let auxTimes = times
  const speed = () => 1000 / auxTimes || 1000
  const interval = setInterval(() => {
    const randomTag = getRandomTag()
    addHighlightClass(randomTag)
    setTimeout(() => {
      removeHighlightClass(randomTag)
      auxTimes > 1 ? auxTimes-- : auxTimes++
      console.log(speed())
    }, speed() - 100)
  }, speed())
  setTimeout(() => {
    clearInterval(interval)
    setTimeout(() => {
      const randomTag = getRandomTag()
      console.log(randomTag)
      addHighlightClass(randomTag)
      lucky(randomTag)
    }, speed())
  }, times * 100)
}
function main() {
  let first = true
  // Local functions definition

  function textAreaEvents(e) {
    const tagsText = createTags(e.target.value)
    const validated = Array.from(new Set(tagsText))
    updateTagContainer(validated)
    if (e.key === "Enter") {
      clearInput(e.target)
      console.log(validated.length)
      raffle(validated.length)
    }
  }

  function begin() {
    textArea.addEventListener("keyup", textAreaEvents)
  }

  function updateTagContainer(tags) {
    const tagContainer = document.querySelector("#tags")
    tagContainer.innerHTML = ""
    tagContainer.innerHTML = tags.reduce((acc, current) => {
      return (acc += `<span class="tag">${current}</span>`)
    }, "")
  }

  begin()
}

main()
