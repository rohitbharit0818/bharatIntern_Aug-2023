document.addEventListener("DOMContentLoaded", function () {
    const taskForm = document.getElementById("taskForm");
    const taskList = document.getElementById("taskList");

    taskForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const reward = document.getElementById("reward").value;
        const deadline = document.getElementById("deadline").value;

        const taskItem = createTaskItem(title, description, reward, deadline);
        taskList.appendChild(taskItem);

        taskForm.reset();
    });

    function createTaskItem(title, description, reward, deadline) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        const titleElement = document.createElement("h2");
        titleElement.textContent = title;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = description;

        const rewardElement = document.createElement("p");
        rewardElement.textContent = `Reward: ${reward}`;

        const deadlineElement = document.createElement("p");
        deadlineElement.textContent = `Deadline: ${deadline}`;

        taskItem.appendChild(titleElement);
        taskItem.appendChild(descriptionElement);
        taskItem.appendChild(rewardElement);
        taskItem.appendChild(deadlineElement);

        return taskItem;
    }
});
