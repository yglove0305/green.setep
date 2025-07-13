# 🌿 초록검사.js 사용법

> 사람인지 확인하는 CAPTCHA 라이브러리를 사용하는 방법을 설명합니다.

---

## ✅ 소개

**초록검사.js**는 클릭, 수학 문제, 슬라이더, 이미지 선택 등 여러 단계를 통해 사용자가 실제 사람인지 판별하는 자바스크립트 라이브러리입니다.

---

## 📦 파일 포함

HTML 문서에서 `초록검사.js` 파일을 `<script>` 태그로 포함합니다:

```html
<script src="초록검사.js"></script>
```

---

## 🚀 기본 사용법

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>초록검사 데모</title>
</head>
<body>
  <h2>사람 인증 테스트</h2>
  <div id="captcha-box"></div>

  <script src="초록검사.js"></script>
  <script>
    new ChorokCaptcha({
      container: document.getElementById('captcha-box'),
      language: 'ko', // 'en'도 가능
      onSuccess: () => alert('사람 인증 성공!'),
      onFailure: () => alert('사람 인증 실패 😢')
    });
  </script>
</body>
</html>
```

---

## ⚙️ 옵션 설명

| 옵션 이름       | 타입          | 기본값             | 설명                    |
| ----------- | ----------- | --------------- | --------------------- |
| `container` | HTMLElement | `document.body` | CAPTCHA가 표시될 요소       |
| `language`  | String      | `'ko'`          | 언어 설정 ('ko', 'en' 지원) |
| `onSuccess` | Function    | `() => {}`      | 인증 성공 시 실행될 콜백 함수     |
| `onFailure` | Function    | `() => {}`      | 인증 실패 시 실행될 콜백 함수     |

---

## 📋 인증 단계 요약

1. **버튼 클릭**: "사람입니다" 버튼 클릭
2. **수학 문제**: 예) "3 + 4 = ?" 문제 해결
3. **슬라이더**: 슬라이더를 오른쪽 끝까지 드래그
4. **이미지 선택**: 고양이 이미지를 선택

---

## 🌐 다국어 지원

```js
language: 'ko' // 한국어
language: 'en' // English
```

---

## 🎨 커스터마이징 팁

* 이미지 선택 문제는 `초록검사.js` 내 `_step4_image()`에서 이미지 URL 변경 가능
* 메시지 문구는 `this.messages` 객체에서 수정 가능
* 스타일 변경은 `this._styleButton()` 또는 `this.wrapper.style` 수정

---

## 🧪 테스트 팁

* 브라우저 콘솔에서 오류 유무 확인
* 실패 확률을 테스트하려면 수학 문제나 이미지 선택에서 일부러 틀려보기

---

## 📄 라이선스

MIT License © 2025 GreenLab
