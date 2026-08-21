async function validarFormulario(event){
    event.preventDefault();
    const form = event.target;
    const nome = document.getElementById("input-nome");
    const email = document.getElementById("input-email");
    const mensagem = document.getElementById("input-mensagem");
    const erroNome = document.getElementById("erro-nome");
    const erroEmail = document.getElementById("erro-email");
    const erroMensagem = document.getElementById("erro-mensagem");
    const sucesso = document.getElementById("sucesso");
    const botao = form.querySelector("button");
    let valido = true;
    [erroNome, erroEmail, erroMensagem].forEach(item=>{
        item.classList.remove("visivel");
    });
    [nome,email,mensagem].forEach(item=>{
        item.classList.remove("erro");
    });
    sucesso.classList.remove("visivel");
    sucesso.classList.remove("erro-envio");
    if(nome.value.trim()===""){
        nome.classList.add("erro");
        erroNome.classList.add("visivel");
        valido=false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email.value.trim())){
        email.classList.add("erro");
        erroEmail.classList.add("visivel");
        valido=false;
    }
    if(mensagem.value.trim()===""){
        mensagem.classList.add("erro");
        erroMensagem.classList.add("visivel");
        valido=false;
    }
    if(!valido){
        return;
    }
    const dados = new FormData(form);
    botao.disabled = true;
    botao.textContent = "Enviando...";
    try {
        const resposta = await fetch(form.action, {
            method: "POST",
            body: dados,
            headers: { "Accept": "application/json" }
        });
        if(resposta.ok){
            sucesso.textContent = "Mensagem enviada com sucesso!";
            sucesso.classList.add("visivel");
            nome.value="";
            email.value="";
            mensagem.value="";
        } else {
            throw new Error("Falha no envio");
        }
    } catch(erro) {
        sucesso.textContent = "Não foi possível enviar. Tente novamente em instantes.";
        sucesso.classList.add("visivel");
        sucesso.classList.add("erro-envio");
    } finally {
        botao.disabled = false;
        botao.textContent = "Enviar mensagem";
        setTimeout(()=>{
            sucesso.classList.remove("visivel");
        },5000);

    }

}
document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".formulario-contato");

    if(form){
        form.addEventListener("submit", validarFormulario);
    }
});