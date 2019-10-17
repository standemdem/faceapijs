const video = document.getElementById('video')
let result= {}
let results = []

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('static/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('static/models'),
  faceapi.nets.faceRecognitionNet.loadFromUri('static/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('static/models')
]).then(startVideo)

function startVideo() {
  navigator.getUserMedia(
    { video: {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', () => {
  const canvas = faceapi.createCanvasFromMedia(video)
  document.body.append(canvas)
  const displaySize = { width: video.width, height: video.height }
  faceapi.matchDimensions(canvas, displaySize)
  
  setInterval(async () => {
    const date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    filteredDetections = resizedDetections.map(detection => detection.expressions)
    result = {
      'time':`${minutes}:${seconds}`,
      'preds': filteredDetections
    }

    results.push(result)
    localStorage.setItem('myStorage', JSON.stringify(results));
    console.log(results)
   
    
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
    faceapi.draw.drawDetections(canvas, resizedDetections)
    faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
    faceapi.draw.drawFaceExpressions(canvas, resizedDetections)   
    
  }, 2000)
})



