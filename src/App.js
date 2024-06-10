import { MissionUtils } from "@woowacourse/mission-utils";

class App {
  async play() {
    MissionUtils.Console.print('숫자 야구 게임을 시작합니다.');
    const randomNumber = MissionUtils.Random.pickUniqueNumbersIsRange(1, 10, 3);
    


  }
}

const app = new App();
app.play();

export default App;
