function generateCaracterList(ls_token) {
  document.getElementById("ls-caracter").innerHTML = "";
  for (const e of ls_token) {
    document.getElementById("ls-caracter").appendChild(aCaracter(e));
  }
}

function aCaracter(token) {
  output_li = document.createElement("li");
  output_img = document.createElement("div");
  output_p = document.createElement("p");

  output_li.className = "caracter";

  output_img.style.backgroundImage = token.picture;
  output_p.textContent = token.stats.Init;
  output_li.appendChild(output_img);
  output_li.appendChild(output_p);

  return output_li;
}
