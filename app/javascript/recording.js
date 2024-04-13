document.addEventListener("turbolinks:load", () => {
  if(document.querySelector('.performances.new, .performances.edit') !== null) {
    let mediaRecorder;
    let recordedChunks = [];
    let videoFile;

    function startRecording(stream) {
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = function(e) {
        if (e.data.size > 0) {
          recordedChunks.push(e.data);
        }
      };

      mediaRecorder.onstop = function() {
        var videoElement = document.getElementById('video_preview');
        const blob = new Blob(recordedChunks, {
          type: "video/webm"
        });

        videoFile = new File([blob], "performance.webm", { type: 'video/webm' });

        videoElement.controls = true;
        videoElement.src = URL.createObjectURL(videoFile); 
        videoElement.load(); 
        videoElement.play(); 

        recordedChunks = []
      };

      mediaRecorder.start();
    }

    const startRecordingButtonHandler = (mediaFetchFunction) => {
      return function() {
        mediaFetchFunction({ video: true, audio: true })
          .then(stream => {
            const videoElement = document.querySelector('#video_preview');
            videoElement.controls = false;
            videoElement.srcObject = stream;

            startRecording(stream);

            this.style.display = 'none';
            document.querySelectorAll('#record_button, #record_screen_button').forEach(element => {
              element.style.display = 'none';
            });
            document.querySelector('#stop_button').style.display = 'block';
            document.querySelector('#save_button').disabled = true;
          })
          .catch(error => {
            console.error('Error accessing media devices.', error);
          });
      }
    }
  
    document.querySelector('#record_button').addEventListener('click', startRecordingButtonHandler(navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices)));
    document.querySelector('#record_screen_button').addEventListener('click', startRecordingButtonHandler(navigator.mediaDevices.getDisplayMedia.bind(navigator.mediaDevices)));

    document.querySelector("#stop_button").addEventListener("click", function(){
      const videoElement = document.querySelector('#video_preview');
      const tracks = videoElement.srcObject.getTracks();

      mediaRecorder.stop();
      tracks.forEach((track) => track.stop());
      videoElement.srcObject = null;

      this.style.display = 'none';
      document.querySelector('#record_button').style.display = 'block';
      document.querySelector('#record_screen_button').style.display = 'block';
      document.querySelector('#save_button').disabled = false;
    });

    document.querySelector("#performance_form").addEventListener("submit", function(event){
      event.preventDefault();

      const title = document.querySelector('#performance_title').value;
      let path;
      let method;

      if(document.querySelector('.performances.new')) {
        path = '/performances';
        method = 'POST';
      } else {
        path = '/performances/' + this.dataset['id'];
        method = 'PUT';
      }

      const formData = new FormData();
      videoFile ? formData.append('performance[video]', videoFile) : '';
      formData.append('performance[title]', title);
      
      fetch(path, { 
        method: method,
        body: formData
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = '/performances';
        document.body.appendChild(a);
        a.click();
      }).catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });
    });
  }
});
