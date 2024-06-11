import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async play() {
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');    
    let randomNumber = MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 3);
    MissionUtils.Console.print(randomNumber);

    let strike = 0;
    
    const handleInput = async() => {

      while (strike < 3) {
        // 다시 돌아왔을 때 값 초기화
        strike = 0;
        let ball = 0;

        // 사용자 입력을 비동기적으로 받음 (프로미스 객체 생성)
        const answer = await new Promise((resolve) => {
          MissionUtils.Console.readLine('숫자를 입력해주세요. : ', (input) => {
            resolve(input);
          });
        });

        // 사용자 입력값을 백의 자리, 십의 자리, 일의 자리로 분류
        const firstValue = Math.floor(answer / 100);
        const secondValue = Math.floor((answer - (firstValue * 100)) / 10);
        const thirdValue = Math.floor(answer - (firstValue * 100 + secondValue * 10))

        // randomNumber 안에 firstValue, secondValue, thirdValue가 있는지 확인 > 낫싱 검사
        const firstValueInRandomNumber = randomNumber.includes(firstValue)
        const secondValueInRandomNumber = randomNumber.includes(secondValue)
        const thirdValueInRandomNumber = randomNumber.includes(thirdValue)
        ball = firstValueInRandomNumber + secondValueInRandomNumber + thirdValueInRandomNumber;
    
        // randomNumber와 사용자 입력값 자리까지 비교 > 스트라이크 검사
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
      } // while문 마지막 부분

    // strike 3개 되면
    MissionUtils.Console.print('세 개의 숫자를 모두 맞히셨습니다! 게임종료.');
    }

    // async 함수니까 await로 실행
    await handleInput();

  }
}

const app = new App();

// 즉시 실행 함수 사용 + await 사용해서 app.play 실행되고 난 후에 실행.
(async () => {
  await app.play();

  MissionUtils.Console.readLine('게임을 새로 시작하려면 1, 종료하려면 2를 입력하세요.', (answer) => {
    if (answer === '1') {
      app.play();
    } else {
      MissionUtils.Console.print('게임이 종료되었습니다.');
    }
  });
})();

export default App;
