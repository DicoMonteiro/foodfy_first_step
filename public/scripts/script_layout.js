const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links-header a")

for (item of menuItems) {
    // Adicionando a class no html, e assim manter com o metodo INCLUDES sempre na funcionalidade atual
    if (currentPage.includes(item.getAttribute("href"))) {
        item.classList.add("active")
    }
}
