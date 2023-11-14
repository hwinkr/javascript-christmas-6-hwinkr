import EventController from './controllers/EventController.js';

class App {
  #eventController;

  constructor() {
    this.#eventController = new EventController();
  }

  async run() {
    await this.#eventController.run();
  }
}

export default App;
