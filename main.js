song1="";
song2="";

leftWristY=0;
leftWristX=0;

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

fill("red");
stroke("red")

circle(leftWristX,leftWristY,20);
circle(rightWristX,rightWristY,20);
}

function play(){
if(leftWristY > 0 && leftWristY <= 500){        
song2.stop();
song1.play();
document.getElementById("Song_Name").innerHTML = "Beerus";
}
else if(rightWristY > 0 && rightWristY <= 500){ 
song1.stop();
song2.play();  
document.getElementById("Song_Name").innerHTML = "Obito";  
}
}
  