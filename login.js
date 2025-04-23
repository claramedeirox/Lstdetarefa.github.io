function logar(event) {
    event.preventDefault();
  
    const login = document.getElementById('login').value.trim();
    const senha = document.getElementById('senha').value;
  
    // Criptografar senha com hash simples (simulação)
    const hashedSenha = btoa(senha); // base64 (exemplo simples, não é seguro em produção)
  
    const usuarioAutorizado = "Clara00";
    const senhaCorretaCripto = btoa("123456");
  
    if (login === usuarioAutorizado && hashedSenha === senhaCorretaCripto) {
      alert("Login realizado com sucesso!");
      window.location.href = "lista.html";
    } else {
      alert("Usuário ou senha incorretos.");
    }
  }