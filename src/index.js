import _ from 'lodash';
import './style.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6yGyCE8yLcC1cWJCko2qiI4oBRW5l264",
  authDomain: "image-uploader-e8b12.firebaseapp.com",
  projectId: "image-uploader-e8b12",
  storageBucket: "image-uploader-e8b12.appspot.com",
  messagingSenderId: "151591109889",
  appId: "1:151591109889:web:0dad9954f577e6086fc700",
  measurementId: "G-4KEX7076GM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadFile = (file) => {
  if (!file) return;
  const storageRef = ref(storage, file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on("state_changed",
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      document.getElementById('progress').innerHTML = progress;
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        document.getElementById('url').innerHTML = downloadURL;
      });
    }
  );
}

const handleUploadButton = (e) => {
  e.preventDefault()
  uploadFile(e.target.files[0]);
};
document.getElementById('upload').onchange = handleUploadButton;

const handleDrop = (e) => {
  e.preventDefault();
  const files = e.dataTransfer.items;

  if (files) {
    for (let file of files) {
      if (file.kind === 'file') {
        uploadFile(file.getAsFile());
      }
    }
  }
};
document.getElementById('drop_zone').ondrop = handleDrop;

const handleDragover = (e) => {
  e.preventDefault();
}
document.getElementById('drop_zone').ondragover = handleDragover;