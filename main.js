class ChorokCaptcha {
  constructor(options) {
    this.container = options.container || document.body;
    this.onSuccess = options.onSuccess || function () {};
    this.onFailure = options.onFailure || function () {};
    this.language = options.language || 'ko'; // 'en' or 'ko'

    this.messages = {
      ko: {
        title: '사람인지 확인해주세요',
        button: '사람입니다',
        checking: '확인 중...',
        math: '다음 문제를 풀어주세요:',
        slider: '슬라이더를 끝까지 이동하세요',
        image: '다음 중 고양이를 선택하세요:',
        success: '✔ 사람 인증 완료',
        failure: '✘ 인증 실패',
      },
      en: {
        title: 'Please confirm you are human',
        button: 'I am human',
        checking: 'Checking...',
        math: 'Solve the following problem:',
        slider: 'Slide to verify',
        image: 'Select the image of a cat:',
        success: '✔ Human verified',
        failure: '✘ Verification failed',
      }
    };

    this._render();
  }

  _render() {
    this.wrapper = document.createElement('div');
    Object.assign(this.wrapper.style, {
      border: '2px solid green',
      borderRadius: '10px',
      padding: '20px',
      display: 'inline-block',
      backgroundColor: '#e6ffe6',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      width: '300px'
    });

    this._step1(); // Start with Step 1
    this.container.appendChild(this.wrapper);
  }

  _clearWrapper() {
    this.wrapper.innerHTML = '';
  }

  _step1() {
    this._clearWrapper();
    const msg = this.messages[this.language];

    const title = document.createElement('p');
    title.innerText = msg.title;

    const button = document.createElement('button');
    button.innerText = msg.button;
    this._styleButton(button);

    button.onclick = () => this._step2_math();

    this.wrapper.appendChild(title);
    this.wrapper.appendChild(button);
  }

  _step2_math() {
    this._clearWrapper();
    const msg = this.messages[this.language];

    const num1 = Math.floor(Math.random() * 10 + 1);
    const num2 = Math.floor(Math.random() * 10 + 1);

    const question = document.createElement('p');
    question.innerText = `${msg.math} ${num1} + ${num2} = ?`;

    const input = document.createElement('input');
    input.type = 'number';
    input.style.marginTop = '10px';

    const button = document.createElement('button');
    button.innerText = msg.button;
    this._styleButton(button);

    button.onclick = () => {
      if (parseInt(input.value) === num1 + num2) {
        this._step3_slider();
      } else {
        this._fail();
      }
    };

    this.wrapper.appendChild(question);
    this.wrapper.appendChild(input);
    this.wrapper.appendChild(document.createElement('br'));
    this.wrapper.appendChild(button);
  }

  _step3_slider() {
    this._clearWrapper();
    const msg = this.messages[this.language];

    const instruction = document.createElement('p');
    instruction.innerText = msg.slider;

    const slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0;
    slider.max = 100;
    slider.value = 0;
    slider.style.width = '100%';
    slider.style.marginTop = '10px';

    slider.oninput = () => {
      if (parseInt(slider.value) >= 100) {
        this._step4_image();
      }
    };

    this.wrapper.appendChild(instruction);
    this.wrapper.appendChild(slider);
  }

  _step4_image() {
    this._clearWrapper();
    const msg = this.messages[this.language];

    const instruction = document.createElement('p');
    instruction.innerText = msg.image;

    // 임의로 고양이, 강아지, 자동차 이미지 사용
    const options = [
      { src: 'https://placekitten.com/100/100', isCorrect: true },
      { src: 'https://placedog.net/100/100', isCorrect: false },
      { src: 'https://via.placeholder.com/100x100?text=Car', isCorrect: false },
    ];

    // 무작위 섞기
    options.sort(() => Math.random() - 0.5);

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.justifyContent = 'space-around';
    container.style.marginTop = '10px';

    options.forEach(opt => {
      const img = document.createElement('img');
      img.src = opt.src;
      img.width = 100;
      img.height = 100;
      img.style.cursor = 'pointer';
      img.style.border = '3px solid transparent';
      img.onclick = () => {
        if (opt.isCorrect) {
          this._success();
        } else {
          this._fail();
        }
      };
      container.appendChild(img);
    });

    this.wrapper.appendChild(instruction);
    this.wrapper.appendChild(container);
  }

  _success() {
    const msg = this.messages[this.language];
    this._clearWrapper();
    this.wrapper.innerHTML = `<strong style="color:green">${msg.success}</strong>`;
    this.onSuccess();
  }

  _fail() {
    const msg = this.messages[this.language];
    this._clearWrapper();
    this.wrapper.innerHTML = `<strong style="color:red">${msg.failure}</strong>`;
    this.onFailure();
  }

  _styleButton(button) {
    button.style.padding = '10px 20px';
    button.style.marginTop = '10px';
    button.style.backgroundColor = 'green';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
  }
}
