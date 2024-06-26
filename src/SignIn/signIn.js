document.addEventListener("DOMContentLoaded", function () {
  const app = document.getElementById("app");

  function createSignupForm() {
    const formTemplate = `
            <div class="signup-container">
                <h1>회원가입</h1>
                <form id="signup-form">
                    <div class="form-group">
                        <label for="username">아이디</label>
                        <input type="text" id="username" name="username" required>
                        <button type="button" id="check-username">중복 확인</button>
                    </div>

                    <div class="form-group">
                        <label for="email">이메일</label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <div class="form-group">
                        <label for="password">비밀번호</label>
                        <input type="password" id="password" name="password" required>
                    </div>

                    <div class="form-group">
                        <label for="confirm-password">비밀번호 확인</label>
                        <input type="password" id="confirm-password" name="confirm-password" required>
                    </div>

                    <button type="submit">가입하기</button>
                </form>
                <div id="error-message"></div>
            </div>
        `;
    return formTemplate;
  }

  app.innerHTML = createSignupForm();

  document
    .getElementById("signup-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const username = document.getElementById("username").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const errorMessage = document.getElementById("error-message");

      if (password !== confirmPassword) {
        errorMessage.textContent = "비밀번호가 일치하지 않습니다.";
        return;
      }

      if (
        username === "" ||
        email === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        errorMessage.textContent = "모든 필드를 작성해 주세요.";
        return;
      }

      errorMessage.textContent = "가입이 성공적으로 완료되었습니다!";
    });

  document
    .getElementById("check-username")
    .addEventListener("click", function () {
      const username = document.getElementById("username").value;
      const errorMessage = document.getElementById("error-message");

      if (username === "") {
        errorMessage.textContent = "아이디를 입력해 주세요.";
        return;
      }

      fetch("%SERVER_URL%", {
        // 여기를 실제 백엔드 URL로 변경
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            // 중복되지 않은 경우 true
            errorMessage.textContent = "사용 가능한 아이디입니다.";
          } else {
            // 중복된 경우 false
            errorMessage.textContent = "이미 사용 중인 아이디입니다.";
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          errorMessage.textContent = "아이디 중복 확인 중 오류가 발생했습니다.";
        });
    });
});
