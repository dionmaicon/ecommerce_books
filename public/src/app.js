/* jshint esversion:6*/
"use strict";
import tarefaController from "../controllers/TarefaController.js";
import lodash from "lodash";
import moment from "moment";
import TarefaModel from "../models/TarefaModel.js";


// console.log(lodash.sortBy(tarefaController.lista(), ["descricao"]));
// let tarefa = new TarefaModel("Dion Maicon");
// tarefaController.insert(tarefa);
// console.log(lodash.sortBy(tarefaController.lista(), ["descricao"]));
// tarefaController.insert({descricao:"Jesus Salva"});
// console.log("-----------------------------");
// tarefaController.update({id:1, descricao:"Jesus"});
// console.log("-----------------------------");
// console.log(lodash.sortBy(tarefaController.lista(), ["descricao"]));
// console.log("-----------------------------");
// tarefaController.delete({id:0});
// console.log(lodash.sortBy(tarefaController.lista(), ["descricao"]));
// console.log("-----------------------------");
// tarefaController.insert({descricao:"Dion Maicon"});
// console.log(lodash.sortBy(tarefaController.lista(), ["descricao"]));
function insert() {
    let descricao = document.getElementById("input_enviar_tarefa").value;
    console.log("CADE a descricao danado?"+ descricao);
    let tarefa = new TarefaModel(descricao);
    document.getElementById("input_enviar_tarefa").value = "";
    tarefaController.insert(tarefa);
    atualizarTabela();
}

window.deleteE = function(r) {
  var i = r.parentNode.parentNode.rowIndex;
  let userId = r.parentNode.parentNode.id;
  tarefaController.delete({id:userId});
  document.getElementById("myTable").deleteRow(i);
}

window.updateE = function(r) {
  let userId = r.parentNode.parentNode.id;
  // let descricao=  r.parentNode.parentNode.cells[1].innerHTML;
  let descricao = document.getElementById("update"+userId).value;
  let tarefa = new TarefaModel(descricao);
  tarefa.id  = userId;
  tarefaController.update(tarefa);
  atualizarTabela();
}

function atualizarTabela(){
  limparTabela();
  let table = document.getElementById("myTable");
  let tarefas = lodash.sortBy(tarefaController.lista(), ["descricao"]);

  for(var i = 1; i < tarefas.length; i++) {
    let row = table.insertRow(i);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.innerHTML = tarefas[i].id;
    cell2.innerHTML = '<input type="text" id="update'+ tarefas[i].id +'" value="'+ tarefas[i].descricao+'">'; ;
    cell3.innerHTML = '<input type="button" class="button btn-danger" value="Delete" onclick="deleteE(this)">';
    cell4.innerHTML = '<input type="button" class="button btn-primary" value="Update" onclick="updateE(this)">';
    row.id  = tarefas[i].id;
  }
}
function limparTabela(){
  let table = document.getElementById("myTable");
  while(table.rows.length > 1) {
    table.deleteRow(1);
  }
}
function ativarModal(){

    document.getElementById("modal").classList.add('is-active');
}

function desativarModal(){

    document.getElementById("modal").classList.remove('is-active');
}





document.getElementById("button_enviar_tarefa").addEventListener("click", insert);
document.getElementById("button_modal").addEventListener("click", ativarModal);
document.getElementById("button_modal_success").addEventListener("click", desativarModal);
document.getElementById("button_modal_close").addEventListener("click", desativarModal);