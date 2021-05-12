const fs = require("fs");
const request = require("request");

module.exports = {
  pwd: function (args, done) {
    var output = process.cwd();
    done(output);
  },
  date: function (args, done) {
    let output = Date();
    done(output);
  },
  ls: function (args, done) {
    let output = "";
    fs.readdir(".", function (err, files) {
      if (err) throw err;
      files.forEach(function (file) {
        output += file.toString() + "\n";
      });
      done(output);
    });
  },
  echo: function (args, done) {
    let out = "";
    args.forEach((arg) => {
      if (process.env[arg.slice(1)]) {
        out = process.env[arg.slice(1)] + " ";
      } else {
        out += arg + " ";
      }
    });
   done(out);
  },
  cat: function (args, done) {

    fs.readFile(`./${args}`, (err, file) => {
      if (err) throw err;
      done(file);
    });
  },
  head: function (args, done) {
    let out = "";
    fs.readFile(`./${args}`,"utf-8",(err, file) => {
      if (err) throw err;
      let arr = file.split("\n");
      out = arr.slice(0,10).join("\n")
      done(out);
    });
  },
  tail: function (args, done) {
    let out = "";
    fs.readFile(`./${args}`, "utf-8", (err, file) => {
      if (err) throw err;
      let arr = file.split("\n");
      out = arr.slice(arr.length -10).join("\n");
      done(out);
    });
  },
  sort: function (args, done) {
    fs.readFile(`./${args}`, (err, file) => {
      if (err) throw err;
      let arr = file.toString().split("\n").sort().join("\n");
      done(arr + "\n");
    });
  },
  wc: function (args, done) {
    fs.readFile(`./${args}`, (err, file) => {
      if (err) throw err;
      let arr = file.toString().split("\n").length;
      let letras = file
        .toString()
        .split("")
        .filter((x) => x !== " ")
        .join("").length;
      let palabras = file.toString().split(" ").length;
      done(`Lines:${arr} Palabras:${palabras} Letras:${letras}\n`);
    });
  },
  uniq: function (args, done) {
    fs.readFile(`./${args}`, (err, file) => {
      if (err) throw err;
      let arr = file.toString().split("\n");
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === arr[i + 1]) {
          arr = arr.slice(0, i).concat(arr.slice(i + 1));
        }
      }
      done(arr.join("\n") + "\n");
    });
  },
  curl: function (args, done) {
    request(args.toString(), function (err, res, body) {
      if (err) throw err;
      done(body);
    });
  },
};
