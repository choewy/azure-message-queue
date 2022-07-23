window.onload = () => {
  // 변수 선언
  const sun = document.getElementById('sun');
  const earth = document.getElementById('earth');
  const moon = document.getElementById('moon');

  // css 스타일 적용
  sun.style.left = '50%';
  sun.style.top = '50%';

  // 변수 선언
  let earthAngle = 0;
  let moonAngle = 0;

  // 애니메이션 시작
  setInterval(() => {
    // 각도를 사용해 지구와 달의 좌표를 구한다.
    const sunLeft = sun.offsetLeft;
    const sunTop = sun.offsetTop;
    const earthLeft = sunLeft + 300 * Math.cos(earthAngle);
    const earthTop = sunTop + 300 * Math.sin(earthAngle);
    const moonLeft = earthLeft + 70 * Math.cos(moonAngle);
    const moonTop = earthTop + 70 * Math.sin(moonAngle);

    // 위치이동
    earth.style.left = earthLeft + 'px';
    earth.style.top = earthTop + 'px';
    moon.style.left = moonLeft + 'px';
    moon.style.top = moonTop + 'px';
    earthAngle += 0.1;
    moonAngle += 0.3;
  }, 100);
};
