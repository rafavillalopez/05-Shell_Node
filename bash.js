const commands = require("./commands");

process.stdout.write("prompt > ");
process.stdin.on("data", function (data) {
  let params = data.toString().trim().split(" ");
  let cmd = params[0];
  let args = params.slice(1);
  commands[cmd](args, done);
});

function done(output) {
  process.stdout.write(output);
  process.stdout.write("\npromp > ");
}