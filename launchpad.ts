const midi = require("midi");

export class Launchpad {
  private input: any;
  private output: any;
  private sockio: any;
  private listeners = {};

  constructor(sockio) {
    this.input = new midi.input();
    this.output = new midi.output();
    this.sockio = sockio;
    this.input.on("message", (deltaTime, message) => {
      if (message[0] === 144 && message[2] === 127) {
        if (this.listeners.hasOwnProperty(message[1])) {
          console.log(this.listeners[message[1]]);
          sockio.emit("sound", this.listeners[message[1]]);
        }
      }
    });
    this.input.openPort(0);
    this.output.openPort(0);
  }

  listen(x: number, y: number, message: string) {
    this.listeners[getCell(x, y)] = message;
  }

  set(x: number, y: number, color: number) {
    this.output.sendMessage([144, getCell(x, y), color]);
  }
}

function getCell(x: number, y: number): number {
  return y * 10 + x;
}