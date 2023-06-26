caracter = { id: "", init: "" };
function generateCaracterList(ls_token) {
  document.getElementById("ls-caracter").innerHTML = "";
  for (const e of ls_token) {
    if (e.stats.alive) {
      document.getElementById("ls-caracter").appendChild(aCaracter(e));
    }
  }
}

function aCaracter(token) {
  output_li = document.createElement("li");
  output_img = document.createElement("div");
  output_p = document.createElement("p");
  output_p2 = document.createElement("p");

  output_li.className = "caracter";

  output_li.onclick = () => confirmeCaracter(token.id, token.stats.Init);
  output_li.ontouchend = () => confirmeCaracter(token.id, token.stats.Init);
  output_img.style.backgroundImage = "url(" + tokenImg[token.id] + ")";
  output_p.textContent = token.stats.Init;
  output_p2.textContent = token.id;
  output_li.appendChild(output_img);
  output_li.appendChild(output_p);
  output_li.appendChild(output_p2);

  return output_li;
}

function confirmeCaracter(id, init) {
  if (confirm("Vous avez selectionner: " + id)) {
    caracter.id = id;
    caracter.init = init;
    document.getElementsByClassName("choose-your-caracter")[0].style.display =
      "none";
  }
}
