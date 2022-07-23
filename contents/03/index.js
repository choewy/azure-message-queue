// DOM
const playground = document.querySelector('.playground > ul');
const gameover = document.querySelector('.gameover');
const scorearea = document.querySelector('.scorearea');
const retrybutton = document.querySelector('.gameover > button');

// settings
const GAME_ROWS = 20;
const GAME_COLS = 10;

// variables
let score = 0;
let duration = 500;
let downInterval;
let downTimeout;
let tempMovingItem;
const movingItem = {
  type: '',
  direction: 0,
  top: 0,
  left: 3,
};

// functions
const prependNewLine = () => {
  const li = document.createElement('li');
  const ul = document.createElement('ul');
  for (let x = 0; x < GAME_COLS; x++) {
    const matrix = document.createElement('li');
    ul.prepend(matrix);
  }
  li.prepend(ul);
  playground.prepend(li);
};

const checkEmpty = (target) => {
  if (!target || target.classList.contains('seized')) {
    return false;
  }
  return true;
};

const generateNewBlock = () => {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock('top', 1);
  }, duration);

  const blockKeys = Object.keys(blocks);
  const randomIndex = Math.floor(Math.random() * blockKeys.length);
  const randomDirection = Math.floor(Math.random() * 4);
  movingItem.type = blockKeys[randomIndex];
  movingItem.top = 0;
  movingItem.left = 3;
  movingItem.direction = randomDirection;
  tempMovingItem = { ...movingItem };
  renderBlocks();
};

const checkMatch = () => {
  const childNodes = playground.childNodes;
  childNodes.forEach((child) => {
    let matched = true;

    child.firstChild.childNodes.forEach((li) => {
      if (!li.classList.contains('seized')) {
        matched = false;
      }
    });

    if (matched) {
      child.remove();
      prependNewLine();
      scorearea.innerHTML = score = score += 10;
    }
  });

  generateNewBlock();
};

const seizeBlock = () => {
  const movingBlocks = document.querySelectorAll('.moving');
  movingBlocks.forEach((moving) => {
    moving.classList.remove('moving');
    moving.classList.add('seized');
  });

  checkMatch();
};

const gameOver = () => {
  gameover.style.display = 'flex';
};

const renderBlocks = (moveType = '') => {
  const { type, direction, top, left } = tempMovingItem;
  const movingBlocks = document.querySelectorAll('.moving');
  movingBlocks.forEach((moving) => {
    moving.classList.remove(type, 'moving');
  });

  blocks[type][direction].some((block) => {
    const x = block[0] + left;
    const y = block[1] + top;
    const target = playground.childNodes[y]
      ? playground.childNodes[y].firstChild.childNodes[x]
      : null;
    const isAvailable = checkEmpty(target);
    if (isAvailable) {
      target.classList.add(type, 'moving');
    } else {
      tempMovingItem = { ...movingItem };
      if (moveType === 'fail') {
        clearInterval(downInterval);
        gameOver();
      }
      clearTimeout(downTimeout);
      downTimeout = setTimeout(() => {
        renderBlocks('fail');
        if (moveType === 'top') {
          seizeBlock();
        }
      }, 0);
      return;
    }
  });

  movingItem.direction = direction;
  movingItem.top = top;
  movingItem.left = left;
};

const initialize = () => {
  tempMovingItem = { ...movingItem };
  for (let y = 0; y < GAME_ROWS; y++) {
    prependNewLine();
  }
  scorearea.innerHTML = score = 0;
  generateNewBlock();
};

const moveBlock = (moveType, amount) => {
  tempMovingItem[moveType] += amount;
  renderBlocks(moveType);
};

const changeDirection = () => {
  const direction = tempMovingItem.direction;
  direction === 3
    ? (tempMovingItem.direction = 0)
    : (tempMovingItem.direction += 1);
  renderBlocks();
};

const dropBlock = () => {
  clearInterval(downInterval);
  downInterval = setInterval(() => {
    moveBlock('top', 1);
  }, 10);
};

// runs
initialize();

// addEventListener
document.addEventListener('keydown', (event) => {
  switch (event.keyCode) {
    case 39:
      moveBlock('left', 1);
      break;
    case 37:
      moveBlock('left', -1);
      break;
    case 40:
      moveBlock('top', 1);
      break;
    case 38:
      changeDirection();
      break;
    case 32:
      dropBlock();
      break;
    default:
      break;
  }
});

retrybutton.addEventListener('click', () => {
  playground.innerHTML = '';
  gameover.style.display = 'none';
  initialize();
});
