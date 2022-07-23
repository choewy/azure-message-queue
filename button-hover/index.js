let preIndex = 0;
const button = document.getElementById('btn');

const randomContext = () => {
  const max = data.length;
  const number = Math.random() * max;
  const index = Math.floor(number);

  if (index !== preIndex) {
    preIndex = index;
    return data[index];
  }
};

const buttonInitializeEvent = () => {
  button.innerText = '다음 강의 >';
  button.style.color = 'white';
  button.style.border = `2px solid black`;
};

const buttonHoverEvent = () => {
  const context = randomContext();
  if (!context) {
    return buttonHoverEvent();
  }

  const { text, color } = context;
  button.innerText = text;
  button.style.color = color;
  button.style.border = `2px solid ${color}`;
};

window.onload = () => {
  buttonInitializeEvent();
  button.addEventListener('mouseover', buttonHoverEvent);
  button.addEventListener('mouseout', buttonInitializeEvent);
};
