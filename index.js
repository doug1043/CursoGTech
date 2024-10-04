function abrirTarefa() {
  overlay.classList.add("active");
  criarTarefa.classList.add("active");
}

function fecharModal() {
  overlay.classList.remove("active");
  criarTarefa.classList.remove("active");
}

function buscarTarefas() {
  fetch("http://localhost:3000/tarefas")
    .then((res) => res.json())
    .then((res) => {
      inserirTarefas(res);
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao tentar buscar tarefas.");
    });
}
buscarTarefas();

function inserirTarefas(listaDeTarefas) {
  if (listaDeTarefas.length > 0) {
    lista.innerHTML = "";
    listaDeTarefas.map((tarefa) => {
      lista.innerHTML += `
            <li>
            <h5>${tarefa.titulo}</h5>
            <p>
              ${tarefa.descricao}
            </p>
            <div class="actions">
              <box-icon size="sm" type="solid" name="trash" onclick="deletarTarefa(${tarefa.id})"></box-icon>
            </div>
          </li>
            `;
    });
  }
}

function criarNovaTarefa() {
  event.preventDefault();
  let tarefa = {
    titulo: titulo.value,
    descricao: descricao.value,
  };

  fetch("http://localhost:3000/tarefas", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(tarefa),
  })
    .then((res) => res.json())
    .then((res) => {
      fecharModal();
      buscarTarefas();
      let form = document.querySelector("#crairTarefa form");
      form.reset();
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao tentar criar tarefa.");
    });
}

function deletarTarefa(id) {
  fetch(`http://localhost:3000/tarefas/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      alert("tarefa removida com sucesso!");
      buscarTarefas();
    })
    .catch((error) => {
      console.error("Erro:", error);
      alert("Erro ao tentar remover a tarefa.");
    });
}

function pesquisarTarefa() {
  let lis = document.querySelectorAll("ul li");
  if (busca.value.length > 0) {
    lis.forEach((li) => {
      if (!li.children[0].innerText.includes(busca.value)) {
        li.classList.add("oculto");
      } else {
        li.classList.remove("oculto");
      }
    });
  } else {
    lis.forEach((li) => {
      li.classList.remove("oculto");
    });
  }
}
