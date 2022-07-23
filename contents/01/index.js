// 이전 인덱스 번호
let preIndex = 0;

// HTML에서 버튼 tag 불러오기
const button = document.getElementById('btn');

// 랜덤 객체 불러오기
const randomContext = () => {
  const max = data.length;
  const number = Math.random() * max;
  const index = Math.floor(number);

  if (index !== preIndex) {
    preIndex = index;
    return data[index];
  }
};

// 버튼 텍스트, 스타일 초기화
const buttonInitializeEvent = () => {
  button.innerText = '다음 강의 >';
  button.style.color = 'white';
  button.style.border = `2px solid black`;
};

// 버튼 롤오버 이벤트
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

// HTML 로딩 시 실행되는 이벤트
window.onload = () => {
  // 버튼 텍스트, 스타일 초기화
  buttonInitializeEvent();

  // 버튼 롤오버 이벤트 연결
  button.addEventListener('mouseover', buttonHoverEvent);

  // 버튼 롤오버 종료 이벤트 연결
  button.addEventListener('mouseout', buttonInitializeEvent);
};
