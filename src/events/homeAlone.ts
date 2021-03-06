/**
 * Disconnects from the voice channel when there`s no users left.
 */
import { VoiceState } from "discord.js";
import { client } from "../discord";
import { logger } from "../logging";

client.on("voiceStateUpdate", (oldState: VoiceState, newState: VoiceState) => {
  const voiceChannel = oldState.channel;
  if (!voiceChannel) return;

  // state change doesn't have a member or it's a bot
  const member = oldState.member;
  if (!member || member.user.bot) return;

  // user is not leaving a server
  if (oldState.channelID === newState.channelID) return;

  const connection = client.voice?.connections.find((c) =>
    c.channel.equals(oldState.channel!)
  );
  if (!connection) return;

  const members = oldState.channel?.members!;
  if (members.every((m) => m.user.bot)) {
    logger.info(
      { guild: voiceChannel.guild.name, channel: oldState.channel?.name },
      "I was left alone in the channel. Disconnecting."
    );
    connection.disconnect();
  }
});
