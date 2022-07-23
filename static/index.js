const links = document.getElementById('links');

pageData.forEach((data) => {
  const { href, title } = data;
  const item = document.createElement('li');
  item.innerHTML = `<a href=${href}>${title}</a>`;
  links.appendChild(item);
});
