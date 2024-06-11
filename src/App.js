import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async play() {
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');
    let randomNumber = MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 3);
    MissionUtils.Console.print(randomNumber);

    MissionUtils.Console.readLine('숫자를 입력해주세요.', (answer) => {

    const firstValue = Math.floor(answer / 100);
    const secondValue = Math.floor((answer - (firstValue * 100)) / 10);
    const thirdValue = Math.floor(answer - (firstValue * 100 + secondValue * 10))
    let strike = 0;
      
    // randomNumber 안에 firstValue, secondValue, thirdValue가 있는지 확인 > 낫싱검사
    const firstValueInRandomNumber = randomNumber.includes(firstValue)
    const secondValueInRandomNumber = randomNumber.includes(secondValue)
    const thirdValueInRandomNumber = randomNumber.includes(thirdValue)
    const ball = firstValueInRandomNumber + secondValueInRandomNumber + thirdValueInRandomNumber;

    // randomNumber와 사용자 입력값 자리까지 비교 > 스트라이크
    const CheckStrike = () => {
      if (randomNumber[0] === firstValue) {
        strike ++
      }

      if (randomNumber[1] === secondValue) {
        strike ++
      }

      if (randomNumber[2] === thirdValue) {
        strike ++
      }
    }

    if (ball) {
      CheckStrike();
      MissionUtils.Console.print(`${strike} 스트라이크`);
      if (ball-strike) {
        MissionUtils.Console.print(`${ball-strike} 볼`);
      }
    } else {
      MissionUtils.Console.print(`낫싱`);
    }

  })
  }
}

const app = new App();
app.play();

export default App;
