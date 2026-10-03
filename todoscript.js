document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    const clearAllBtn = document.getElementById("clear-all-btn");
    const emptyImage = document.querySelector(".empty-image");

    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? "block" : "none";
    };

    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();

        if (!taskText) {
            alert("Please enter a task!");
            return;
        }

        const li = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";

        const span = document.createElement("span");
        span.textContent = taskText;

        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "delete-btn";
        deleteBtn.innerHTML = "&times;";

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);

        taskInput.value = "";
        taskInput.focus();
        toggleEmptyState();
    };

    // Form submit handles both clicking the button and pressing Enter
    taskForm.addEventListener("submit", addTask);

    // Event delegation for checkbox and delete
    taskList.addEventListener("click", (event) => {
        const li = event.target.closest("li");
        if (!li) return;

        if (event.target.classList.contains("task-checkbox")) {
            li.classList.toggle("completed", event.target.checked);
        }

        if (event.target.classList.contains("delete-btn")) {
            li.remove();
            toggleEmptyState();
        }
    });

    // Clear all tasks
    clearAllBtn.addEventListener("click", () => {
        taskList.innerHTML = "";
        toggleEmptyState();
    });

    // Initial state check
    toggleEmptyState();
});