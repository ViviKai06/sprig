/*
@title: ever_hot
@author: Leo H
*/
var points
const melody = tune`
223.88059701492537: c4/223.88059701492537,
223.88059701492537: g4~223.88059701492537 + d4^223.88059701492537,
223.88059701492537: d4^223.88059701492537,
223.88059701492537: g4~223.88059701492537 + d5-223.88059701492537 + c4/223.88059701492537,
223.88059701492537: a4~223.88059701492537 + d4^223.88059701492537 + e5-223.88059701492537,
223.88059701492537: c4/223.88059701492537,
223.88059701492537: g4~223.88059701492537 + d4^223.88059701492537,
223.88059701492537: a4~223.88059701492537 + e4-223.88059701492537 + c4/223.88059701492537,
223.88059701492537: d4^223.88059701492537,
223.88059701492537: g4~223.88059701492537 + d4^223.88059701492537 + g5-223.88059701492537,
223.88059701492537: a4~223.88059701492537 + f5-223.88059701492537 + c4/223.88059701492537,
223.88059701492537: g4~223.88059701492537 + d4^223.88059701492537,
223.88059701492537: g4~223.88059701492537 + c4/223.88059701492537,
223.88059701492537: a4~223.88059701492537 + d4^223.88059701492537 + f5-223.88059701492537,
223.88059701492537: c5~223.88059701492537 + c4/223.88059701492537,
223.88059701492537: b4~223.88059701492537 + f5-223.88059701492537 + c4/223.88059701492537,
223.88059701492537: a4~223.88059701492537 + d4^223.88059701492537,
223.88059701492537: g4~223.88059701492537 + d4^223.88059701492537,
223.88059701492537: c4/223.88059701492537,
223.88059701492537: g4~223.88059701492537 + d4^223.88059701492537 + g5-223.88059701492537,
223.88059701492537: a4~223.88059701492537 + c4/223.88059701492537,
223.88059701492537: d5~223.88059701492537 + d4^223.88059701492537,
223.88059701492537: f5-223.88059701492537 + c4/223.88059701492537,
223.88059701492537: c5~223.88059701492537 + d4^223.88059701492537,
223.88059701492537: a4~223.88059701492537 + d4^223.88059701492537,
223.88059701492537: d5~223.88059701492537 + c4/223.88059701492537,
223.88059701492537: d4^223.88059701492537,
223.88059701492537: b4~223.88059701492537 + g5-223.88059701492537 + c4/223.88059701492537,
223.88059701492537: c5~223.88059701492537 + d4^223.88059701492537 + f5-223.88059701492537,
223.88059701492537: b4~223.88059701492537 + c4/223.88059701492537,
223.88059701492537: a4~223.88059701492537 + d4^223.88059701492537,
223.88059701492537: b4~223.88059701492537 + d4^223.88059701492537`
const playback = playTune(melody, Infinity)
const player = "p";
const wall = "w";
const baddude = "b";
const moveAll=()=>{
  const redguys = getAll(baddude);
  redguys.forEach((redguy) => {
    redguy.y += 1;
  });
};

points = 0
setLegend(
  [ player, bitmap`
................
................
................
................
................
.......0........
......00........
.....0.0........
.......0........
.......0........
.......000......
.......0..0.....
......0..0.0....
......0...0.....
......0000......
................`],
  [ wall, bitmap `
0000000000000000
................
................
................
................
................
................
................
................
................
................
................
................
................
................
0000000000000000`],
  [ baddude, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`]
);

setSolids([ wall, player ]);

let level = 0;
const levels = [
  map`
...
...
...
...
...
...
www
...
.p.
www`,
];

setMap(levels[level]);

setPushables({
  [ player ]: [],
});

onInput("s", () => {
  getFirst(player).y += 1
  moveAll();
  addSprite(1, 1, baddude)  
  points += 1
});

onInput("w", () => {
  getFirst(player).y -= 1
  moveAll();
  addSprite(1, 1, baddude)
  points += 1
});

onInput("a", () => {
  getFirst(player).x -= 1
  moveAll();
  addSprite(0, 1, baddude)
  points += 1
});

onInput("d", () => {
  getFirst(player).x += 1
  moveAll();
  addSprite(2, 1, baddude)
  points += 1
});

afterInput(() => {
  if (tilesWith(player, baddude).length > 0){
    addText("YouLose", {
      x: 7,
      y: 6,
      color: color `5`
  })
   addText(points.toString(), {
      x: 9,
      y: 10,
      color: color `5`
   })
playback.end()
}
})