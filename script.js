// Verifica se está logado
if (window.location.pathname.includes('tarefas.html')) {
    if (localStorage.getItem('auth') !== 'true') {
      window.location.href = 'login.html';
    }
  }
  
  // Elementos
  const form = document.getElementById('task-form');
  const input = document.getElementById('task');
  const list = document.getElementById('task-list');
  const logout = document.getElementById('logout');
  
  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
  
  function salvarTarefas() {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }
  
  function renderizar() {
    list.innerHTML = '';
    tarefas.forEach((tarefa, index) => {
      const li = document.createElement('li');
  
      const span = document.createElement('span');
      span.textContent = tarefa.texto;
      if (tarefa.feita) {
        span.style.textDecoration = 'line-through';
      }
  
      // Botão Concluir
      const btnConcluir = document.createElement('button');
      btnConcluir.textContent = tarefa.feita ? 'Desfazer' : 'Concluir';
      btnConcluir.addEventListener('click', () => {
        tarefas[index].feita = !tarefas[index].feita;
        salvarTarefas();
        renderizar();
      });
  
      // Botão Excluir
      const btnExcluir = document.createElement('button');
      btnExcluir.textContent = 'Excluir';
      btnExcluir.style.marginLeft = '10px';
      btnExcluir.style.background = '#dc3545';
      btnExcluir.addEventListener('click', () => {
        if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
          tarefas.splice(index, 1);
          salvarTarefas();
          renderizar();
        }
      });
  
      li.appendChild(span);
      li.appendChild(btnConcluir);
      li.appendChild(btnExcluir);
      list.appendChild(li);
    });
  }
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const texto = input.value.trim();
      if (!texto) return;
  
      tarefas.push({ texto, feita: false });
      salvarTarefas();
      renderizar();
      input.value = '';
      input.focus();
    });
  }
  
  if (logout) {
    logout.addEventListener('click', () => {
      localStorage.removeItem('auth');
      window.location.href = 'login.html';
    });
  }
  
  renderizar();
  const tasks = [];

document.getElementById('task-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const taskText = document.getElementById('task').value.trim();
  if (taskText) {
    tasks.push(taskText);
    document.getElementById('task').value = ''; // Limpa o campo
    renderTasks();
  }
});

function renderTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Limpa a lista antes de renderizar novamente

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = task;
    input.setAttribute('readonly', true); // Deixa o texto como apenas leitura
    input.setAttribute('aria-label', `Tarefa: ${task}`); // Descrição para leitores de tela

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Editar';
    editBtn.className = 'edit-btn';
    editBtn.setAttribute('aria-label', `Editar tarefa "${task}"`); // Descrição do botão para leitores de tela
    editBtn.addEventListener('click', () => {
      input.removeAttribute('readonly'); // Permite editar
      input.focus();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('aria-label', `Excluir tarefa "${task}"`); // Descrição do botão para leitores de tela
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1); // Remove a tarefa
      renderTasks();
    });

    li.appendChild(input);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}