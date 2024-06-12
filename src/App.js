import { Message } from "./message.js";
import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async play() {
    MissionUtils.Console.print(Message.START);    
    let randomNumber = MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 3);
    let strike = 0;

    async function getUserAnswer() {
      strike = 0;
      let ball = 0;

      const answer = await MissionUtils.Console.readLineAsync(Message.INPUT);
      
      if (answer.length === 3) { //입력한 값이 3자리인지 확인하는 유효성 검사

        // 사용자 입력값을 백의 자리, 십의 자리, 일의 자리로 분류
        const firstValue = Math.floor(answer / 100);
        const secondValue = Math.floor((answer - (firstValue * 100)) / 10);
        const thirdValue = Math.floor(answer - (firstValue * 100 + secondValue * 10))

        // randomNumber 안에 firstValue, secondValue, thirdValue가 있는지 확인 > 낫싱&볼 검사
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
        
        // 검사 후 화면에 출력하기
        MissionUtils.Console.print(`${strike}` + Message.STRIKE);
          if (ball-strike) {
            MissionUtils.Console.print(`${ball-strike}` + Message.BALL);
          }
          } else {
              MissionUtils.Console.print(Message.NOTHING);
          }    

        // strike 3개가 된다면?
        if (strike === 3) {
          MissionUtils.Console.print(Message.MATCH + Message.FINISH);
          const response = await MissionUtils.Console.readLineAsync(Message.REPLAY_OR_FINISH);

          // 1과 2 중 입력 제대로 받았는지 확인
          if (response === Message.REPLAY_ONE) {
            randomNumber = MissionUtils.Random.pickUniqueNumbersInRange(1, 9, 3);
            getUserAnswer(); // 1 선택 시 새 게임 시작
          } else if (response === Message.FINISH_TWO) {
            MissionUtils.Console.print(Message.FINISH); // 2 선택 시 게임 종료
          } else {
            MissionUtils.Console.print(Message.ERROR_ONE_OR_TWO + Message.FINISH); // 다른 숫자 입력시 오류 알림 후 게임 종료
          }

        } else { // strike가 3개가 아니라면, 계속해서 다음 입력 받기
          getUserAnswer(); 
        }

      } else { // 입력값이 숫자 3개가 아니라면, 오류 알림 후 계속해서 다음 입력 받기
          MissionUtils.Console.print(Message.ERROR_THREE_NUMBER);
          getUserAnswer();
      }

    }

    getUserAnswer(); // 처음 입력받기

  }
}

const app = new App();
app.play();

export default App;
