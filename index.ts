import { Server } from "ws";
import { Launchpad } from "./launchpad";

const wss = new Server({ port: 8080 });
const launchpad = new Launchpad(wss);

console.log("Listening on port 8080");

launchpad.set(4, 1, 21);
launchpad.listen(4, 1, "yes");
launchpad.set(5, 1, 5);
launchpad.listen(5, 1, "no");

launchpad.set(4, 2, 45);
launchpad.listen(4, 2, "ding");
launchpad.set(5, 2, 13);
launchpad.listen(5, 2, "bell");

launchpad.set(2, 1, 45);
launchpad.set(7, 1, 45);
launchpad.set(2, 2, 57);
launchpad.set(7, 2, 57);
launchpad.set(2, 3, 13);
launchpad.set(7, 3, 13);

wss.on("connection", (ws, req) => {
  console.log("connection from " + req.connection.remoteAddress);
  ws.on("message", message => {
    console.log("received " + message);
  });
  ws.on("close", () => {
    console.log("disconnected " + req.connection.remoteAddress);
  });
});
