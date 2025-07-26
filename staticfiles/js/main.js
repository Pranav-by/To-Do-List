document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element References ---
    const elements = {
        taskList: document.getElementById('task-list'),
        addTaskForm: document.getElementById('add-task-form'),
        newTaskInput: document.getElementById('new-task-input'),
        themeSwitcher: document.getElementById('theme-switcher'),
        dateDisplay: document.getElementById('date-display'),
        progressBar: document.getElementById('progress-bar'),
        progressText: document.getElementById('progress-text'),
    };

    // --- State Management ---
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // --- Theme Management ---
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        elements.themeSwitcher.textContent = theme === 'dark' ? '☀️' : '🌙';
    };

    elements.themeSwitcher.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // --- Utility Functions ---
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const updateDate = () => {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        elements.dateDisplay.textContent = now.toLocaleDateString(undefined, options);
    };

    // --- Rendering ---
    const renderTasks = () => {
        elements.taskList.innerHTML = '';
        if (tasks.length === 0) {
            elements.taskList.innerHTML = `<li class="task-item" style="color: var(--text-secondary); justify-content: center; cursor: default;">No tasks yet. Add one below!</li>`;
        } else {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;
                li.dataset.id = task.id;
                li.draggable = true;

                li.innerHTML = `
                    <div class="task-checkbox" role="button" aria-label="Toggle task completion"></div>
                    <span class="task-title">${task.title}</span>
                    <button class="delete-btn" aria-label="Delete Task">&times;</button>
                `;
                elements.taskList.appendChild(li);
            });
        }
        updateProgressBar();
    };

    const updateProgressBar = () => {
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        elements.progressBar.style.width = `${percentage}%`;
        elements.progressText.textContent = `${Math.round(percentage)}%`;
    };

    // --- Event Handlers ---
    elements.addTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = elements.newTaskInput.value.trim();
        if (title) {
            const newTask = {
                id: Date.now().toString(),
                title: title,
                completed: false
            };
            tasks.unshift(newTask); // Add to the beginning of the array
            saveTasks();
            renderTasks();
            
            // Add animation class to the newly added item
            const newItem = elements.taskList.querySelector(`[data-id='${newTask.id}']`);
            if (newItem) {
                newItem.classList.add('adding');
            }

            elements.newTaskInput.value = '';
        }
    });

    elements.taskList.addEventListener('click', (e) => {
        const taskItem = e.target.closest('.task-item');
        if (!taskItem || !taskItem.dataset.id) return;

        const taskId = taskItem.dataset.id;
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if (e.target.classList.contains('delete-btn')) {
            tasks.splice(taskIndex, 1);
            taskItem.style.opacity = '0';
            setTimeout(() => {
                saveTasks();
                renderTasks();
            }, 400);
        } else {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            taskItem.classList.toggle('completed');
            saveTasks();
            updateProgressBar();
        }
    });

    // --- Drag-and-Drop Initialization ---
    new Sortable(elements.taskList, {
        animation: 150,
        onEnd: (evt) => {
            const taskToMove = tasks.splice(evt.oldIndex, 1)[0];
            tasks.splice(evt.newIndex, 0, taskToMove);
            saveTasks();
        }
    });

    // --- Initial Application Load ---
    const init = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);
        updateDate();
        renderTasks();
    };

    init();
});
