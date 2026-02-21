const menuItems = document.querySelectorAll(".menu-item");
const pages = document.querySelectorAll(".page");

menuItems.forEach(item => {
  item.addEventListener("click", () => {
    
    menuItems.forEach(i => i.classList.remove("active"));
    pages.forEach(p => p.classList.remove("active"));

    item.classList.add("active");

    const pageId = item.getAttribute("data-page");
    document.getElementById(pageId).classList.add("active");
  });
});
