function putResult(item, data) {
    var datoAct;
    var template = document.querySelector(".template-cant-resultados");
    var templateDiv = template.content.querySelector("div");
    var contProductos = document.querySelector(".contenedor-resultados");
    if (
        contProductos.contains(
            document.querySelector(".contenedor-cantidad-resultado-busqueda")
        )
    ) {
        contProductos.removeChild(
            document.querySelector(".contenedor-cantidad-resultado-busqueda")
        );
    }
    if (data == "") {
        templateDiv.getElementsByClassName("resultado")[0].textContent =
            "Ingrese un producto.";
        var clone = document.importNode(template.content, true);
        contProductos.appendChild(clone);
    } else if (datoAct != data || datoAct == data) {
        templateDiv.getElementsByClassName("resultado")[0].textContent =
            "Resultados: " + item.paging.total;
        var clone = document.importNode(template.content, true);
        contProductos.appendChild(clone);

        datoAct = data;
    }
}

function countWords(title) {
    var titleCantWords = title.split(" ");
    if (titleCantWords.length > 5) {
        var newTitle = "";
        for (let index = 0; index < 5; index++) {
            var text = titleCantWords[index] + " ";
            newTitle = newTitle + text;
        }
        newTitle = newTitle.replace("-", "")
        newTitle = newTitle.trim();
        return newTitle + "...";
    }
}

function condition(cond) {
    if (cond == "new") {
        return "Nuevo";
    }
    return "Usado";
}

function putProduct(item, data) {
    var template = document.querySelector(".template-ml");
    var templateDiv = template.content;
    var contProductos = document.querySelector(".contenedor-resultados");
    if (
        contProductos.contains(document.querySelector(".contenedor-producto"))
    ) {
        for (let index = 0; index < 4; index++) {
            contProductos.removeChild(
                document.querySelector(".contenedor-producto")
            );
        }
    }
    if(data != ""){
        for (let index = 0; index < 4; index++) {
            templateDiv
                .querySelector(".link-pagina-ml")
                .setAttribute("href", item.results[index].permalink);
            templateDiv
                .querySelector(".imagen-producto")
                .setAttribute("src", item.results[index].thumbnail);
            templateDiv.querySelector(".span-nombre-producto").textContent =
                countWords(item.results[index].title);
            templateDiv.querySelector(".span-estado-producto").textContent =
                condition(item.results[index].condition);
            templateDiv.querySelector(".span-ventas-producto").textContent =
                "Vendidos: " + item.results[index]["sold_quantity"];
            templateDiv.querySelector(".span-precio-producto").textContent =
                item.results[index].price + "$";
            var clone = document.importNode(template.content, true);
            contProductos.appendChild(clone);
        }
    }
}

function deleteContent() {
    var contProductos = document.querySelector(".contenedor-resultados");
    if (
        contProductos.contains(
            document.querySelector(".contenedor-cantidad-resultado-busqueda")
        )
    ) {
        {
            contProductos.removeChild(
                document.querySelector(".contenedor-cantidad-resultado-busqueda")
            );
        } 
    }
}

function getNameProd() {
    var nameProd = document.forms[0];
    nameProd.addEventListener("submit", (evento) => {
        evento.preventDefault();
        var data = evento.target.buscar.value;
        var url = "https://api.mercadolibre.com/sites/MLA/search?q=";
        data = data.trim();
        data = data.replace(/ /g, "%20");
        url = url + data;
        fetch(url)
            .then((item) => {
                return item.json();
            })
            .then((item) => {
                putResult(item, data);
                putProduct(item, data);
            });
    });
}

function main() {
    getNameProd();
}

main();
