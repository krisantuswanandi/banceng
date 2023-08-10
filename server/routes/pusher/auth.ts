import Pusher from "pusher";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig();
  const pusher = new Pusher({
    appId: config.pusherAppId,
    secret: config.pusherSecret,
    key: config.public.pusherApiKey,
    cluster: config.public.pusherCluster,
  });

  const socketId = body.socket_id;
  const channelName = body.channel_name;

  const auth = pusher.authorizeChannel(socketId, channelName, {
    user_id: Date.now().toString(),
  });

  return auth;
});
