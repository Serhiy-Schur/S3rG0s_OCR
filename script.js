var fileInput = document.getElementById('file-input');
var langSelect = document.getElementById('lang-select');
var recognizeBtn = document.getElementById('recognize-btn');
var imagePreview = document.getElementById('image-preview');
var resultDiv = document.getElementById('result');
var progressAnimation = document.getElementById('progress-animation')
var selectedFile, selectedLang;

fileInput.addEventListener('change', function(e) {
    selectedFile = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        var img = document.createElement('img');
        img.src = event.target.result;
        imagePreview.innerHTML = '';
        imagePreview.appendChild(img);
    };
    reader.readAsDataURL(selectedFile);
});

langSelect.addEventListener('change', function(e) {
    selectedLang = e.target.value;
});

recognizeBtn.addEventListener('click', function () {
    if (!selectedFile) {
        alert('Будь ласка, виберіть зображення');
        return;
    }
    if (!selectedLang) {
        alert('Будь ласка, виберіть мову');
        return;
    }

    var progressBar = document.querySelector('progress');
    progressBar.setAttribute('max', '1');
    progressBar.setAttribute('value', '0');
    progressAnimation.appendChild(progressBar);


    Tesseract.recognize(selectedFile, {lang: selectedLang})
        .progress(function (message) {
            progressBar.setAttribute('value', message.progress);
            console.log(message);
        })
        .catch(function (error) {
            console.error(error);
        })
        .then(function (result) {
            resultDiv.textContent = result.text;
            resultDiv.removeAttribute("readonly");
        });
});

function copyTextFunction() {
    var copyText = document.getElementById("result");
    copyText.select();
    document.execCommand("copy");
    alert("Скопійований текст: " + copyText.value);
}



