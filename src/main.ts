import "./pages/weekly-learning";
import { note } from "./pages/note";
import "./style.scss";

const splited = location.pathname.split("/");
if (splited[splited.length - 1] === "71") {
  const content = document.querySelector("#content");
  const head = document.querySelector("head");
  const body = document.querySelector("body");

  if (content) {
    content.innerHTML = "";
  }

  if (head) {
    head.innerHTML =
      `<script>
        function log(){console.log(12345)}
      </script>` + head.innerHTML;
  }

  if (body) {
    body.innerHTML =
      `<a href="#" id="floating-button" onclick="(function (){
        body.innerHTML =  ${note} + body.innerHTML;
        const value = window.localStorage.getItem('ssuvas-note') === undefined ? '' : window.localStorage.getItem('ssuvas-note');
        const textarea = document.getElementById('t-area');
        document.getElementById('t-area').value = value;
        textarea.addEventListener('keydown', function (event) {
          let value = window.localStorage.getItem('ssuvas-note') ?? '';
          value = event.target.value;
          window.localStorage.setItem('ssuvas-note', value);
        });
      })()">
        <div id="floating-icon"></div>
      </a>` + body.innerHTML;
  }
}
