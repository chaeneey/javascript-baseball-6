import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async play() {
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');    
    let randomNumber = MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 3);
    MissionUtils.Console.print(randomNumber);

    let strike = 0;
    
    const handleInput = async () => {
      strike = 0;
      MissionUtils.Console.readLine('숫자를 입력해주세요. : ', (answer) => {

        // 사용자 입력값을 백의 자리, 십의 자리, 일의 자리로 분류
        const firstValue = Math.floor(answer / 100);
        const secondValue = Math.floor((answer - (firstValue * 100)) / 10);
        const thirdValue = Math.floor(answer - (firstValue * 100 + secondValue * 10))

        // randomNumber 안에 firstValue, secondValue, thirdValue가 있는지 확인 > 낫싱검사
        const firstValueInRandomNumber = randomNumber.includes(firstValue)
        const secondValueInRandomNumber = randomNumber.includes(secondValue)
        const thirdValueInRandomNumber = randomNumber.includes(thirdValue)
        const ball = firstValueInRandomNumber + secondValueInRandomNumber + thirdValueInRandomNumber;
    
        // randomNumber와 사용자 입력값 자리까지 비교 > 스트라이크
    
      if (ball) {
        if (randomNumber[0] === firstValue) {
          strike ++
        }
        if (randomNumber[1] === secondValue) {
          strike ++
        }
        if (randomNumber[2] === thirdValue) {
          strike ++
        }
      
        MissionUtils.Console.print(`${strike} 스트라이크`);
        if (ball-strike) {
          MissionUtils.Console.print(`${ball-strike} 볼`);
        }
      } else {
              MissionUtils.Console.print(`낫싱`);
      }

      if (strike < 3) {
        handleInput();
      } else {
        MissionUtils.Console.print('세 개의 숫자를 모두 맞히셨습니다! 게임종료.');
      }
    
      })
    } 

  handleInput();

  }
}

const app = new App();
app.play()
// .then(() => {
//   MissionUtils.Console.readLine('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.', (answer) => {
//     if (answer === 1) {
//       app.play();
//     } else {
//       app.close();
//     }
//   });
// })

export default App;
