const map =
            '1                                1.'+
            '1                                1.'+
            '1                                1.'+
            '1                                1.'+
            '1                                1.'+
            '1                                11111111.'+
            '1                                       1.'+
            '1                                       1.'+
            '1eeeeeeeeeeeeeeeeeeeeeeeeeee     1 c    1.'+
            '1111111111111111111111111111     1      1.'+
            '1                                1      1.'+
            '1                             e c1      1.'+
            '1           c           1111111111      1.'+
            '1     1ss1ss1sss1sss1ss111              1.'+
            '1  1                     1              1.'+
            '1                        1       c      1.'+
            '1                        1 e   e   e   e1111111111111.'+
            '1                        1 1   1   1   1            1.'+
            '1  1                     1   e       e              1.'+
            '1                        1   1       1              1.'+
            '1                        1                          1.'+
            '1                        1                          1.'+
            '1  1                     1                          1.'+
            '1                        1   111   1    1   1111    1.'+
            '1                        1   1     11   1   1   1   1.'+
            '1  e  e                  1   111   1 1  1   1    1  1.'+
            '1111111                  1   1     1  1 1   1   1   1.'+
            '1                        1   111   1   11   1111    1.'+
            '1                        1                          1.'+
            '1                        1111111111111111111111111111.'+
            '1    1111111111111        1.'+
            '1                         1.'+
            '1                         1.'+
            '1                     1   1.'+
            '1                         1.'+
            '1                         1.'+
            '1                         1.'+
            '1                        11.'+
            '1                        1.'+
            '1            c      e1e  1.'+
            '1           e1e          1.'+
            '1    e1e                 1    u.'+
            '1                        1.'+
            '1                        1.'+
            '111                      1.'+
            '1                        1.'+
            '1                        1.'+
            '1  e         e  e        1.'+
            '1111111sss11111111       1.'+
            '1                 1c     1.'+
            '1                  1     1.'+
            '1                   1    1.'+
            '1                        1.'+
            '1                        1.'+
            '1                        1.'+
            '1 c              e      11.'+
            '11s11     1111111111111111.'+
            '1                        1.'+
            '1                        1.'+
            '1                        1.'+
            '1       1                1.'+
            '1         111            1.'+
            '1                        1.'+
            '1                        1.'+
            '1                 1      1    u.'+
            '1                        1.'+
            '1                        1.'+
            '1                        1.'+
            '1                c   1   1.'+
            '1               1111     1.'+
            '1  2                     1.'+
            '1111111ssss111sssssssssss1';
// s = spike
let time = 0
let config = {
  type: Phaser.AUTO,
    backgroundColor: "grey",
    width: 800,
    height: 500,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
      preload: preload,
        create: create,
        update: update
    }
};
const game = new Phaser.Game(config);
function preload(){
  this.load.atlas("player", "player.png", "sprites.json");
  this.load.image("platform", "platform.png");
  this.load.image("spike", "spike.png");
  this.load.image("coin", "coin.png");
  this.load.image("up", "up.png");
  this.load.image("enemy", "enemy.png");
  this.load.image("tramp", "tramp.png");
  this.load.audio("music", ["music.wav"]);
}

function create(){
   music = this.sound.add("music", { loop: true });
  this.cameras.main.setBackgroundColor('#FFFFFF');
  this.spawnPlayer = (x, y)=>{
    this.player = this.physics.add.sprite(x, y, "player", "sprite_0");

    this.player.body.setGravityY(800);

    this.physics.add.collider(this.player, this.platforms);
    this.cameras.main.startFollow(this.player);
    this.player.score = 0;
    this.timeText = this.add.text(0, 0, "Time:"+time, {
      fill:"white",
      fontSize:"20px",
      fontFamily:"Arial Black",
      backgroundColor: "black"
    }).setScrollFactor(0).setDepth(200);
    this.scoreText = this.add.text(0, 20, "Coins: "+this.player.score, {
      fill:"white",
      fontSize:"20px",
      fontFamily:"Arial Black",
      backgroundColor: "black"
    }).setScrollFactor(0).setDepth(200);
  };
  this.collectCoin = (player, coin)=>{
    player.score+=1;
    coin.destroy();
    this.scoreText.setText("Coins: "+ this.player.score);
  };
  this.jump = (player, tramp)=>{
    player.score+=1;
    coin.destroy();
    this.scoreText.setText("Coins: "+ this.player.score);
  };
  this.die = ()=>{
    this.physics.pause();
    let deathText = this.add.text(0, 0, "YOU DIED", {
      color:"#d53636",
      fontFamily:"Arial Black",
      fontSize:"60px",
      backgroundColor: "black"
    }).setScrollFactor(0);
    Phaser.Display.Align.In.Center(deathText, this.add.zone(400, 250, 800, 500));
    setTimeout(()=>location.reload(), 1500);
  };
  this.platforms = this.physics.add.staticGroup();
  this.up = this.physics.add.staticGroup();

  this.coins = this.physics.add.group();
  this.spikes = this.physics.add.group();
  let mapArr = map.split('.');
  let drawX = 0;
  let drawY = 0;
  mapArr.forEach(row=>{
    drawX = 0;
    for(let i = 0; i<row.length; i++){
      if(row.charAt(i)==='1'){
        this.platforms.create(drawX, drawY, "platform");
      }else if(row.charAt(i)==='2'){
        if(row.charAt(i+1)==='1'){
          this.spawnPlayer(drawX-4, drawY-12);
        }else if(row.charAt(i-1)==='1'){
          this.spawnPlayer(drawX+4, drawY-12);
        }else{
          this.spawnPlayer(drawX, drawY-12);					
        }
      }else if(row.charAt(i)==='c'){
        this.coins.create(drawX, drawY+10, "coin");
      }else if(row.charAt(i)==='s'){
        this.spikes.create(drawX, drawY+10, "spike");
      }else if(row.charAt(i)==='u'){
        this.spikes.create(drawX, drawY+10, "up");
      }else if(row.charAt(i)==='e'){
          this.spikes.create(drawX, drawY+10, "enemy");
      }else if(row.charAt(i)==='t'){
        this.spikes.create(drawX, drawY+10, "tramp");
      }

      drawX+=40;
    }
    drawY+=40;
  });
  this.physics.add.overlap(this.player, this.coins, this.collectCoin,this.tramp,this.jump,this.enemy, null, this);
  this.physics.add.overlap(this.player, this.spikes, this.die, null, this);
  this.anims.create({
    key:"walk",
      frames:[{key:"player", frame:"sprite_2"}, {key:"player", frame:"sprite_1"}],
      frameRate:10,
      repeat:-1
  });
  this.anims.create({
    key:"stand",
      frames:[{key:"player", frame:"sprite_0"}],
      frameRate:1
  });
  this.key_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  this.key_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  this.key_UP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  this.key_D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  this.key_LEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  this.key_RIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  this.key_DOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  this.key_M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
}





function update(){

  time +=1
  this.timeText.setText("Time: "+ time);

  this.scoreText.setText("Coins: "+ this.player.score);
  if(this.key_W.isDown && this.player.body.touching.down){
    this.player.setVelocityY(-550);
    console.log(this.key)
  }
  if(this.key_UP.isDown && this.player.body.touching.down){
    this.player.setVelocityY(-550);
    console.log(this.key)
  }
  if(this.key_A.isDown){
    this.player.setVelocityX(-200);

    this.player.flipX = true;
  }else if(this.key_D.isDown){
    this.player.setVelocityX(200);

    this.player.flipX = false;
  }
  else if(this.key_LEFT.isDown){
      this.player.setVelocityX(-200);

      this.player.flipX = true;
  }
  else if(this.key_S.isDown){
      this.player.setVelocityY(800);


  }
  else if(this.key_DOWN.isDown){
        this.player.setVelocityY(800);


    }
  else if(this.key_RIGHT.isDown){
      this.player.setVelocityX(200);

      this.player.flipX = false;
  }else{
    this.player.anims.play("stand", true);
    this.player.setVelocityX(0);
  }
  if(this.key_M.isDown){
    music.play();


  }

}