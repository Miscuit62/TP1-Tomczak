document.addEventListener("DOMContentLoaded", () => {
  const container = document.createElement("div");
  container.style.textAlign = "center";
  document.body.appendChild(container);

  const filterSelect = document.createElement("select");
  filterSelect.id = "filterSelect";
  filterSelect.style.marginTop = "20px";
  filterSelect.style.marginRight = "10px";

  const optionAll = document.createElement("option");
  optionAll.value = "all";
  optionAll.textContent = "Toutes les tâches";
  filterSelect.appendChild(optionAll);

  const optionCompleted = document.createElement("option");
  optionCompleted.value = "completed";
  optionCompleted.textContent = "Tâches terminées";
  filterSelect.appendChild(optionCompleted);

  const optionUncompleted = document.createElement("option");
  optionUncompleted.value = "uncompleted";
  optionUncompleted.textContent = "Tâches non terminées";
  filterSelect.appendChild(optionUncompleted);

  container.appendChild(filterSelect);

  const input = document.createElement("input");
  input.type = "text";
  input.id = "taskInput";
  input.placeholder = "Description de la tâche";
  container.appendChild(input);

  const button = document.createElement("button");
  button.id = "addTaskButton";
  button.textContent = "Ajouter une tâche";
  button.style.marginLeft = "10px";
  container.appendChild(button);

  const taskListContainer = document.createElement("div");
  taskListContainer.id = "taskListContainer";
  taskListContainer.style.marginTop = "20px";
  container.appendChild(taskListContainer);

  const TableauTaches = [];
  const TableauTermine = [];

  function AjouterTache() {
    const description = input.value.trim();
    if (description === "") {
      alert("Veuillez entrer une description de tâche.");
      return;
    }

    TableauTaches.push(description);
    TableauTermine.push(false);
    AjouterTacheHTML(description);
    input.value = "";
  }

  function AjouterTacheHTML(item) {
    let table = document.querySelector("table");
    if (!table) {
      table = document.createElement("table");
      table.style.margin = "0 auto";
      table.style.borderCollapse = "collapse";
      table.style.width = "50%";
      table.style.border = "1px solid black";

      const caption = document.createElement("caption");
      caption.textContent = "Liste des tâches";
      caption.style.fontWeight = "bold";
      caption.style.marginBottom = "10px";
      table.appendChild(caption);

      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");

      const th1 = document.createElement("th");
      th1.textContent = "Numéro";
      th1.style.border = "1px solid black";
      th1.style.padding = "10px";

      const th2 = document.createElement("th");
      th2.textContent = "Libellé";
      th2.style.border = "1px solid black";
      th2.style.padding = "10px";

      const th3 = document.createElement("th");
      th3.textContent = "Terminée";
      th3.style.border = "1px solid black";
      th3.style.padding = "10px";

      const th4 = document.createElement("th");
      th4.textContent = "Supprimer";
      th4.style.border = "1px solid black";
      th4.style.padding = "10px";

      headerRow.appendChild(th1);
      headerRow.appendChild(th2);
      headerRow.appendChild(th3);
      headerRow.appendChild(th4);
      thead.appendChild(headerRow);
      table.appendChild(thead);

      const tbody = document.createElement("tbody");
      table.appendChild(tbody);
      taskListContainer.appendChild(table);
    }

    const tbody = table.querySelector("tbody");
    const row = document.createElement("tr");

    const tdNum = document.createElement("td");
    tdNum.textContent = TableauTaches.length;
    tdNum.style.border = "1px solid black";
    tdNum.style.padding = "10px";

    const tdDesc = document.createElement("td");
    tdDesc.textContent = item;
    tdDesc.style.border = "1px solid black";
    tdDesc.style.padding = "10px";
    if (TableauTermine[TableauTaches.length - 1]) {
      tdDesc.style.textDecoration = "line-through";
    }

    const tdCheckbox = document.createElement("td");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = TableauTaches.length - 1;
    checkbox.checked = TableauTermine[TableauTaches.length - 1];
    checkbox.addEventListener("change", Cocher);
    tdCheckbox.appendChild(checkbox);
    tdCheckbox.style.border = "1px solid black";
    tdCheckbox.style.textAlign = "center";

    const tdDelete = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.addEventListener("click", supprimerTache);
    tdDelete.appendChild(deleteButton);
    tdDelete.style.border = "1px solid black";
    tdDelete.style.textAlign = "center";

    row.appendChild(tdNum);
    row.appendChild(tdDesc);
    row.appendChild(tdCheckbox);
    row.appendChild(tdDelete);
    tbody.appendChild(row);
  }

  function filtrer(filterType) {
    const rows = document.querySelectorAll("tr");

    rows.forEach((row, index) => {
      if (index === 0) return;

      const checkbox = row.querySelector("input[type='checkbox']");
      const isCompleted = checkbox.checked;

      switch (filterType) {
        case "all":
          row.style.display = "";
          break;
        case "completed":
          row.style.display = isCompleted ? "" : "none";
          break;
        case "uncompleted":
          row.style.display = !isCompleted ? "" : "none";
          break;
        default:
          row.style.display = "";
      }
    });
  }

  function Cocher(event) {
    const checkbox = event.target;
    const index = checkbox.id;

    TableauTermine[index] = checkbox.checked;

    const tdDesc = checkbox.closest("tr").querySelector("td:nth-child(2)");
    if (checkbox.checked) {
      tdDesc.style.textDecoration = "line-through";
    } else {
      tdDesc.style.textDecoration = "none";
    }
  }

  function supprimerTache(event) {
    const row = event.target.closest("tr");
    const rowIndex = row.rowIndex - 1;

    TableauTaches.splice(rowIndex, 1);
    TableauTermine.splice(rowIndex, 1);

    row.remove();
    console.log(`Tâche ${rowIndex + 1} supprimée`);
    
    const rows = document.querySelectorAll("tbody tr");
    rows.forEach((row, index) => {
      row.querySelector("td:first-child").textContent = index + 1;
    });
  }

  button.addEventListener("click", AjouterTache);

  filterSelect.addEventListener("change", (event) => {
    filtrer(event.target.value);
  });
});
