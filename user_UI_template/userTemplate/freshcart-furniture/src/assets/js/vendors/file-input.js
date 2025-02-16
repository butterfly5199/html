// File Input js

document.getElementById("fileInput").addEventListener("change", handleFileUpload);

function handleFileUpload(event) {
   const files = event.target.files;
   const maxFileSize = 2 * 1024 * 1024 * 1024; // 2 GB
   const maxImages = 10;
   const maxVideos = 3;
   let imageCount = 0;
   let videoCount = 0;

   const previewContainer = document.getElementById("previewContainer");
   previewContainer.innerHTML = ""; // Clear previous preview

   const uploadStatus = document.getElementById("uploadStatus");
   uploadStatus.innerHTML = ""; // Clear previous status

   for (let file of files) {
      if (file.size > maxFileSize) {
         uploadStatus.innerHTML = `<p style="color: red;">Error: ${file.name} exceeds the 2GB limit.</p>`;
         continue;
      }

      if (file.type.startsWith("image/")) {
         if (imageCount >= maxImages) {
            uploadStatus.innerHTML = `<p style="color: red;">Error: You can only upload up to 10 images.</p>`;
            break;
         }
         imageCount++;
         displayFilePreview(file);
      } else if (file.type.startsWith("video/")) {
         if (videoCount >= maxVideos) {
            uploadStatus.innerHTML = `<p style="color: red;">Error: You can only upload up to 3 videos.</p>`;
            break;
         }
         videoCount++;
         displayFilePreview(file);
      } else {
         uploadStatus.innerHTML = `<p style="color: red;">Error: ${file.name} is not a valid file type.</p>`;
      }
   }

   if (imageCount > maxImages || videoCount > maxVideos) {
      uploadStatus.innerHTML = `<p style="color: red;">You have exceeded the upload limit.</p>`;
   } else {
      uploadStatus.innerHTML = `<p style="color: green;">Files uploaded successfully!</p>`;

      // Automatically remove the success message after 3 seconds
      setTimeout(() => {
         uploadStatus.innerHTML = "";
      }, 3000); // 3000 milliseconds = 3 seconds
   }
}

function displayFilePreview(file) {
   const reader = new FileReader();
   reader.onload = function (event) {
      const previewContainer = document.getElementById("previewContainer");
      const fileURL = event.target.result;

      // Create a container for the file preview and the delete button
      const previewWrapper = document.createElement("div");
      previewWrapper.style.position = "relative";
      previewWrapper.style.display = "inline-block";
      previewWrapper.style.margin = "10px";

      // Display the file preview (image or video)
      if (file.type.startsWith("image/")) {
         const imgElement = document.createElement("img");
         imgElement.src = fileURL;
         imgElement.style.width = "100px";
         previewWrapper.appendChild(imgElement);
      } else if (file.type.startsWith("video/")) {
         const videoElement = document.createElement("video");
         videoElement.src = fileURL;
         videoElement.controls = true;
         videoElement.style.width = "200px";
         previewWrapper.appendChild(videoElement);
      }

      // Create and append the delete button
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";
      deleteButton.style.display = "block";
      deleteButton.className = "btn btn-primary btn-sm";
      deleteButton.style.marginTop = "5px";
      deleteButton.addEventListener("click", function () {
         previewContainer.removeChild(previewWrapper);
      });

      // Add the delete button below the preview
      previewWrapper.appendChild(deleteButton);

      // Append the preview wrapper to the preview container
      previewContainer.appendChild(previewWrapper);
   };
   reader.readAsDataURL(file);
}
