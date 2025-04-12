function openViewer(pdfName) {
        const viewerWindow = window.open('', '_blank', 'toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=' + screen.width + ',height=' + screen.height);
      
        viewerWindow.document.write(`
          <html>
          <head>
            <title>PDF Viewer</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.min.js"><\/script>
            <style>
            body { margin: 0; overflow: auto; background: #111; color: white; }
            canvas { display: block; margin: 10px auto; }
            .watermark {
              position: fixed;
              top: 50%;
              left: 35%;
              font-size: 60px;
              color: #aaa;
              opacity: 0.20;
              pointer-events: none;
              z-index: 9999;
              transform: rotate(-30deg);
            }
          </style>
          </head>
          <body>
            <div class="watermark">Server IT Studio</div>
            <div id="pdf-container">Loading...</div>
            <script>
            document.addEventListener('contextmenu', e => e.preventDefault());
            document.addEventListener('keydown', e => {
              if ((e.ctrlKey && ['u', 'p', 's'].includes(e.key.toLowerCase())) || e.key === 'F12') {
                e.preventDefault();
              }
              if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(e.key.toLowerCase())) {
                e.preventDefault();
              }
            });

            // Set PDF.js worker
              pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';
              const container = document.getElementById('pdf-container');
              pdfjsLib.getDocument('fetch-pdf.php?file=${pdfName}').promise.then(pdf => {
                container.innerHTML = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                  pdf.getPage(i).then(page => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const viewport = page.getViewport({ scale: 1.5 });
      
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    container.appendChild(canvas);
      
                    page.render({ canvasContext: context, viewport: viewport });
                  });
                }
              });
            <\/script>
          </body>
          </html>
        `);
    
          // Attempt to force fullscreen (optional)
          viewerWindow.onload = () => {
            viewerWindow.document.documentElement.requestFullscreen?.().catch(() => {});
          };
        }

    