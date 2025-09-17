document.addEventListener('DOMContentLoaded', function () {
  const videoCover = document.getElementById('videoCover');
  const openBtn = document.getElementById('openBtn');
  const closeBtn = document.getElementById('closeBtn');
  const dialog = document.getElementById('dialogVideo');
  const videoFrame = document.getElementById('videoFrame');

  function openCheck(dialog) {
    if (dialog.hasAttribute('open')) {
      console.log('Dialog open');
    } else {
      console.log('Dialog closed');
    }
  }

  function openDialog() {
    const videoUrl = videoCover.getAttribute('data-video-url');
    videoFrame.src = videoUrl;
    dialog.showModal();
    openCheck(dialog);
  }

  function closeDialog() {
    if (dialog.hasAttribute('open')) {
      videoFrame.src = ''; //Clear src to stop the video
      dialog.close();
      openCheck(dialog);
    }
  }

  videoCover.addEventListener('click', openDialog);
  openBtn.addEventListener('click', openDialog);
  closeBtn.addEventListener('click', closeDialog);

  // Closing the dialog box by pressing the Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog.hasAttribute('open')) {
      closeDialog();
    }
  });
});
