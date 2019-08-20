const WIDTH = 384;
const HEIGHT = 384;
const APP_FPS = 60;

// init
let app = new PIXI.Application({
  width: WIDTH,
  height: HEIGHT
});
let canvas = document.getElementById("canvas");
canvas.appendChild(app.view);
app.renderer.backgroundColor = 0x000000;
app.stage.interactive = false;
app.ticker.remove(app.render, app);
const fpsDelta = 60 / APP_FPS;

let bg, star, star2, star3, star4, leaf;
let controledTween;
let elapsedTime = 0;

let container_bg = new PIXI.Container();
container_bg.x = 0;
container_bg.y = 0;
container_bg.interactive = false;
app.stage.addChild(container_bg);


let container = new PIXI.Container();
container.width = 384;
container.height = 384;
container.x = 0;
container.y = 0;
container.pivot.x = 0;
container.pivot.y = 0;
container.interactive = false;
app.stage.addChild(container);



// asset
const ASSET_BG = "images/pic_bg_floor.jpg";
const ASSET_STAR = "images/pic_star.png";
const ASSET_LEAF = "images/pic_leaf.png";

PIXI.loader
  .add("data_bg", ASSET_BG)
  .add("data_star", ASSET_STAR)
  .add("data_leaf", ASSET_LEAF)
  .load(onAssetsLoaded);

/**
 * Asset load Complete
 * @param { object } loader object
 * @param { object } res asset data
 */
function onAssetsLoaded(loader, res) {
  // BG
  bg = new PIXI.Sprite(res.data_bg.texture);
  container_bg.addChild(bg);
  bg.x = 0;
  bg.y = 0;


  // Star
  star = new PIXI.Sprite(res.data_star.texture);
  container.addChild(star);
  star.x = 50;
  star.y = 50;
  star.scale.set(0.5, 0.5);
  star.interactive = false;
  star.anchor.x = 0.5;
  star.anchor.y = 0.5;

  star2 = new PIXI.Sprite(res.data_star.texture);
  container.addChild(star2);
  star2.x = 50;
  star2.y = 100;
  star2.scale.set(0.5, 0.5);
  star2.interactive = false;
  star2.anchor.x = 0.5;
  star2.anchor.y = 0.5;

  star3 = new PIXI.Sprite(res.data_star.texture);
  container.addChild(star3);
  star3.x = 100;
  star3.y = 150;
  star3.scale.set(0.5, 0.5);
  star3.interactive = false;
  star3.anchor.x = 0.5;
  star3.anchor.y = 0.5;

  star4 = new PIXI.Sprite(res.data_star.texture);
  container.addChild(star4);
  star4.x = 50;
  star4.y = 200;
  star4.scale.set(0.5, 0.5);
  star4.interactive = false;
  star4.anchor.x = 0.5;
  star4.anchor.y = 0.5;
  star4.tint = 0xff0033;

  // Leaf
  leaf = new PIXI.Sprite(res.data_leaf.texture);
  container.addChild(leaf);
  leaf.x = 50;
  leaf.y = 300;
  leaf.scale.set(0.5, 0.5);
  leaf.interactive = false;
  leaf.anchor.x = 0.5;
  leaf.anchor.y = 0.5;

  startTween();
  controlTween();

  // ticker
  let ticker = PIXI.ticker.shared;
  ticker.autoStart = false;
  ticker.stop();
  PIXI.settings.TARGET_FPMS = 0.06;
  app.ticker.add(tick);
}

function startTween() {
  console.log("stratTween()");

  // target, duration, vars
  // 現在値から、指定したプロパティまでのトゥイーン
  TweenMax.to(star, 1, { x: 300, rotation: 360, alpha: 0.5 });

  // 指定したプロパティから、現在値までのトゥイーン
  TweenMax.from(star2, 1, { x: 300, rotation: 360, alpha: 0.5 });

  // 開始値と終了値を定義したトゥイーン
  let message = "red star move end !";
  TweenMax.fromTo(
    star3,
    2,
    { x: 100, y: 150, alpha: 1 },
    {
      x: 180,
      y: 50,
      alpha: 0,
      delay: 1, // 開始時のディレイ秒数
      onComplete() {
        // 完了時のコールバック
        console.log(message);
      },
      onCompleteParams: [message] // パラメーターを渡す時は1個でも配列を使用
    }
  );

  TweenMax.to(star4, 2, { x: 300, ease: Bounce.easeOut });
}

/**
 * 操作用のTweenを再生する
 */
function controlTween() {
  // controledTween = TweenMax.to(leaf, 10, { x: 350 });
}

/**
 * tweenを開始・再生する
 */
function btOnPlay() {
  controledTween = TweenMax.to(leaf, 3, {
    x: 350,
    ease: Linear.easeNone,
    rotation: 6.283,
    paused: true
  });
  controledTween.play(); // paused: true指定した時は明示的にplay()する必要有り
}

/**
 * tweenを一時停止する
 */
function btOnPause() {
  if (controledTween) {
    controledTween.pause();
  }
}

/**
 * tweenを再開する
 */
function btOnResume() {
  if (controledTween) {
    controledTween.resume();
  }
}

/**
 * tweenを逆さにする
 */
function btOnReverse() {
  if (controledTween) {
    controledTween.reverse();
  }
}

/**
 * tweenを指定秒数までシークする
 * @param { number } n second
 */
function btOnSeek(n) {
  if (controledTween) {
    controledTween.seek(n);
  }
}

/**
 * tweenを指定パーセントまで進捗させる
 * @param { number } n percent(100% = 1.0)
 */
function btOnProgress(n) {
  if (controledTween) {
    controledTween.progress(n);
  }
}

/**
 * tweenのタイムスケールを指定する
 * @param { number } n (normal speed = 1.0)
 */
function btOnTimeScale(n) {
  if (controledTween) {
    controledTween.timeScale(n);
  }
}

/**
 * tweenを削除する
 */
function btOnKill() {
  if (controledTween) {
    controledTween.kill();
  }
}

/**
 * tweenをリスタートする
 */
function btOnRestart() {
  if (controledTween) {
    controledTween.restart();
  }
}

/**
 * adjust fps
 * @param { number } delta time
 */
function tick(delta) {
  elapsedTime += delta;

  if (elapsedTime >= fpsDelta) {
    // enough time passed, update app
    update(elapsedTime);
    // reset
    elapsedTime = 0;
  }
}

/**
 * rendering
 * @param { number } delta time
 */
function update(delta) {
  // render the canvas
  app.render();
}
