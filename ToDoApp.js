class ToDoList {
	#tasks = [];

	constructor () {
		this.#tasks = [];
	}

	getTasks() {
		return [...this.#tasks];
	}

	#checkIndex (index) {
		if (this.#tasks.length <= index || index < 0) 
			throw new Error("invalid index, out of range!");
	}

	addTask(title) {
		this.#tasks.push({title, done: false});
		return this;
	}
	
	toggleDone(index) {
		this.#checkIndex(index);
		this.#tasks[index].done = !this.#tasks[index].done;
		return this;
	}
	
	removeTask(index) {
		this.#checkIndex(index);
		this.#tasks.splice(index, 1);
		return this;
	}

	// print in terminal
	// render() {
	// 	console.log("==== To Do List ====");
	// 	this.#tasks.forEach((task, index) => {
	// 		const status = task.done ? "✅" : "❌";
	// 		console.log(`${index + 1}. ${status} ${task.title}`);
	// 	})
	// 	return this;
	// }
}

const todo = new ToDoList();

function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (!title) return;

  todo.addTask(title);
  input.value = "";
  render();
}

function toggleDone(index) {
  todo.toggleDone(index);
  render();
}

function removeTask(index) {
  todo.removeTask(index);
  render();
}

function render() {
  const ul = document.getElementById("taskList");
  ul.innerHTML = "";

  todo.getTasks().forEach((task, index) => {
    const li = document.createElement("li");
	li.classList.add("listItem");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.onclick = () => toggleDone(index);

    const span = document.createElement("span");
    span.textContent = task.title;
    if (task.done) span.classList.add("done");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "🗑";
    removeBtn.onclick = () => removeTask(index);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(removeBtn);
    ul.appendChild(li);
  });
}

document.getElementById("taskInput").addEventListener("keydown", function (e) {
	if (e.key === "Enter") {
		document.getElementById("taskInputButton").click();
	}
});