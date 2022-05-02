song1="";
song2="";

leftWristY=0;
leftWristX=0;

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX=0;
rightWristY=0;

function preload(){
  song1 = loadSound("Beerus.mp3");
  song2 = loadSound("Obito.mp4");
}

function setup(){
canvas = createCanvas(600,500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

PoseNet = ml5.poseNet(video, modelLoaded);
PoseNet.on('pose', gotPoses);
}
function modelLoaded(){
console.log("PoseNet is ready");    
}

function gotPoses(results){
if(results.length > 0){
console.log(results);

  scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

 leftWristX = results[0].pose.leftWrist.x;
 leftWristY = results[0].pose.leftWrist.y; 
 console.log("LeftWristX = "+leftWristX+" leftWristY = "+leftWristY);
 
 rightWristX = results[0].pose.rightWrist.x;
 rightWristY = results[0].pose.rightWrist.y;
 console.log("RightWristX = "+rightWristX+" RightWristY = "+rightWristY);
}    
}

function draw(){
image(video, 0,0,600,500);

  song1_status = song1.isPlaying();
	song2_status = song2.isPlaying();


fill("red");
stroke("red")


if(scoreRightWrist > 0.2)
	{ 
		circle(rightWristX,rightWristY,20);

			song1.stop();

		if(song1_status == false)
		{
			song2.play();
			document.getElementById("Song_Name").innerHTML = "Playing - Obito Song"
		}
	}

  if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);

			song2.stop();

		if(song2_status == false)
		{
			song1.play();
			document.getElementById("Song_Name").innerHTML = "Playing - Beerus Song"
		}
	}
}

function play()
{
	song.play();
	song.setVolume(1);
	song.rate(1);
}
  