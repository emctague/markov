// Loops to make a new chain.
var timer = 0;
var run = document.getElementById("run");
var input = document.getElementById("input");
var output = document.getElementById("output");
var mkv, intext;
run.onclick = function () {
  intext = input.value.toLowerCase().split(/[\t\n\r ]+/gm);
  //intext = input.value.toLowerCase().split('');
  mkv = new Markov();
  window.mkv = mkv;
  mkv.seed(intext);
  run.innerHTML = "Working...";
  timer = setInterval(work, 1);
}
var work = function () {
  output.value = mkv.chain(intext[Math.floor(Math.random() * intext.length)], parseInt(document.getElementById("num").value)).join(' ');
  //output.value = mkv.chain(intext[Math.floor(Math.random() * intext.length)], parseInt(document.getElementById("num").value)).join('');
  clearInterval(timer);
  run.innerHTML = "Generate New Text";
};
