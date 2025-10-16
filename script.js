document.addEventListener('DOMContentLoaded', function() {
    const addTaskForm = document.getElementById('addTaskForm');
    const taskTitleInput = document.getElementById('taskTitle');
    const taskDescriptionInput = document.getElementById('taskDescription');
    const tasksContainer = document.getElementById('tasksContainer');
    const emptyState = document.getElementById('emptyState');
    
    addTaskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = taskTitleInput.value.trim();
        const description = taskDescriptionInput.value.trim();
        
        if (!title) {
            alert('Пожалуйста, введите название задачи');
            return;
        }
        
        addTask(title, description);
        
        addTaskForm.reset();
    });
    
    function addTask(title, description) {
        if (emptyState.style.display !== 'none') {
            emptyState.style.display = 'none';
        }
        
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        
        taskCard.innerHTML = `
            <h3 class="task-title">${escapeHtml(title)}</h3>
            ${description ? `<p class="task-description">${escapeHtml(description)}</p>` : ''}
            <div class="task-actions">
                <button class="btn-delete">Удалить</button>
            </div>
        `;
        
        const deleteButton = taskCard.querySelector('.btn-delete');
        deleteButton.addEventListener('click', function() {
            taskCard.remove();
            
            
            if (tasksContainer.children.length === 1) { 
                emptyState.style.display = 'block';
            }
        });
        
       
        tasksContainer.appendChild(taskCard);
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});