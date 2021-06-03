const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg01 = document.getElementById('msg01');
const msg02 = document.getElementById('msg02');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;
  address(location);
});

async function address(loc) {
  const res = await fetch(`/weather?address=${loc}`);
  const data = await res.json();

  if (data.error) {
    msg01.textContent = data.error;
    return;
  }

  msg01.textContent = data.location;
  msg02.textContent = data.forecast;
}

function init() {
  msg01.textContent = 'Loading....';
  msg02.textContent = '';
}

init();
