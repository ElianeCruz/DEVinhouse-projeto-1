var ul = document.getElementById("minhaLista");
var li;
var itemId;
var item;
var list;

carregarEventos();

function carregarEventos() {
  document.addEventListener("DOMContentLoaded", carregarStorage)
}

function addTarefa() {
  if (tarefa.value === "") {
    alert("Adicione uma tarefa!")
  }

  if (document.getElementById("tarefa").value != "") {
    item = document.getElementById("tarefa");
    itemId = ul.childElementCount;
    li = criarItem(item.value, itemId);
    li.appendChild(removerTarefaBtn(itemId));
    ul.appendChild(li);
    var objTarefa = {
      id: itemId,
      tarefa: item.value,
      status: false
    }
    salvarStorage(objTarefa);
    item.value = "";
  }
}

function criarItem(itemValue, itemId) {
  let li = document.createElement("li");
  li.setAttribute("index", itemId);
  li.appendChild(document.createTextNode(itemValue));
  return li;
}

function removerTarefa(itemId) {
  var tarefas = localStorage.getItem("tarefas") === null ? [] :
    JSON.parse(localStorage.getItem("tarefas"));

  for (i = 0; i < ul.children.length; i++) {
    if (ul.children[i].getAttribute("index") == itemId) {
      ul.children[i].remove();
      tarefas.splice(itemId, 1)
    }
  }
  localStorage.setItem("tarefas", JSON.stringify(tarefas))
}

function removerTarefaBtn(itemId) {
  var btn = document.createElement("button");
  btn.setAttribute("onclick", "removerTarefa(" + itemId + ")");
  btn.innerHTML = "X";
  return btn;
}

var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('tarefaConcluida');
  }
  console.log('TarefaConcluida', ev.target)
  atualizarLocalStorage(ev.target);
}, false);

function limparLista() {
  document.getElementById("minhaLista").innerHTML = "";
  localStorage.clear();
}

function salvarStorage(objTarefa) {
  var tarefas = localStorage.getItem("tarefas") === null ? [] :
    JSON.parse(localStorage.getItem("tarefas"));
  tarefas.push(objTarefa);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarStorage() {
  var tarefas = localStorage.getItem("tarefas") === null ? [] :
    JSON.parse(localStorage.getItem("tarefas"));

  tarefas.forEach(function (item) {
    itemId = ul.childElementCount
    li = criarItem(item.tarefa, itemId);
    li.appendChild(removerTarefaBtn(itemId));
    if (item.status) {
      li.classList.add("tarefaConcluida")
    }
    ul.appendChild(li);
  })
}

function atualizarLocalStorage(item) {
  var tarefas = localStorage.getItem("tarefas") === null ? [] :
    JSON.parse(localStorage.getItem("tarefas"));
  tarefas.forEach(function (tarefa) {
    if (parseInt(item.getAttribute("index")) === tarefa.id) {
      item.classList.contains("tarefaConcluida") ? (tarefa.status = true) : (tarefa.status = false);
    }
  })
  localStorage.setItem("tarefas", JSON.stringify(tarefas))
}