import { Message } from "discord.js";
import Queue from "../Queue";

export default class Stop implements CommandHandler {
  constructor(
    private args: string[],
    private message: Message,
    private queue: Queue
  ) {}

  public async accepts(): Promise<boolean> {
    return ["-stop", "-kill"].includes(this.args[0]);
  }

  public async handle(): Promise<void> {
    this.queue.stop();
  }
}
