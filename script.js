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