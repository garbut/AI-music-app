left_Wrist_x = 0;
left_Wrist_y = 0;
right_Wrist_x = 0;
right_Wrist_y = 0;
song = "";

scorerightwrist = 0;
scoreleftwrist = 0;


function preload()
{
    song = loadSound("mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotposes);
}

function modelloaded()
{
    console.log("modelloaded");
}

function draw()
{
    Image(video,0,0,600,500);
    fill("red");
    stroke("red");

    if(scorerightwrist > 0.2)
    {

   circle(rightWristX,rightWristY,20);

   if(rightWristY >0 && rightWristY <= 100)
   {
    document.getElementById("speed").innerHTML = "Speed = 0.5x";
    song.rate(0.5);
   }

   else if(rightWristY >100 && rightWristY <= 200)
   {
    document.getElementById("speed").innerHTML = "speed = 1x";
    song.rate(1);
   }

   else if(rightWristY >200 && rightWristY <= 300)
   {
    document.getElementById("speed").innerHTML = "speed = 1.5x";
    song.rate(1.5);
   }

   else if(rightWristY >300 && rightWristY <= 400)
   {
    document.getElementById("speed").innerHTML = "speed = 2x";
    song.rate(2);
   }

   else if(rightWristY >400 && rightWristY <= 500)
   {
    document.getElementById("speed").innerHTML = "speed = 2.5x";
    song.rate(2.5);
   }
}

    if(scoreleftwrist > 0.2)
    {
        circle(left_Wrist_x,left_Wrist_y,20);
        innumberleftwristy = Number(left_Wrist_y);
        remvedecimals = floor(innumberleftwristy);
        volume = removedecimals/500;
        document.getElementById("volume").innerHTML = "volume" + volume ;
        song.setVolume(volume);
    }

}

function play()
{
    song.play();
    song.setVolume(1); 
    song.rate(1);
}

function gotposes()
{
    if (results.length > 0)
    {
        console.log("results");

        scorerightwrist = results[0].pose.keypoints[10].score;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("scoreleftwrist = " + scoreleftwrist + "scorerightwrist" + scorerightwrist);

        left_Wrist_x = results[0].pose.leftWrist.x;
        left_Wrist_y = results[0].pose.leftWrist.y;
        console.log("leftwristx = " + left_Wrist_x + "leftwristy" + left_Wrist_y);

        right_Wrist_x = results[0].pose.rightWrist.x;
        right_Wrist_y = results[0].pose.rightWrist.y;
        console.log("rightwristx = " + right_Wrist_x + "rightwristy" + right_Wrist_y);

    }

}