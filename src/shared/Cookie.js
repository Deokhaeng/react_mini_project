// Cookie 가져오기
const getCookie = (name) => {
  let value = "; " + document.cookie;

  let parts = value.split(`; ${name}=`); // [user_id=deokhaeng /; user_pwd=1234] 'key='로 나누어지기 때문에 value만 남는다.
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
    //pop() : 배열의 마지막 요소 추출
    //shift() : 배열의 첫번째 요소 제거
  }
};

// Cookie 생성
const setCookie = (name, value, expires = 5) => {
  let date = new Date();
  date.setTime(date.getTime() + expires * 24 * 60 * 1000);

  document.cookie = `${name} = ${value}; expires = ${date.toUTCString()}`;
};

// Cookie 제거
const deleteCookie = (name) => {
  let date = new Date("2020-01-01").toUTCString();

  console.log(date);
  document.cookie = name + "=; expires=" + date;
};
export { getCookie, setCookie, deleteCookie };
