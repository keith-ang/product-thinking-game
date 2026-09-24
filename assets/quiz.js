/* Reusable quiz + reveal components.
 *
 * Quiz markup:
 *   <div class="quiz" data-answer="Solution">
 *     <p class="q">Question text</p>
 *     <div class="choices"><button>Problem</button><button>Solution</button></div>
 *     <p class="feedback" data-right="Why it's right" data-wrong="Hint when wrong"></p>
 *   </div>
 *   Optional: <p class="score" data-quiz-score></p> anywhere shows a running tally.
 *
 * Reveal markup (write, then compare with a model answer):
 *   <div class="reveal"><textarea></textarea><button data-reveal>Compare</button>
 *     <div class="answer">...</div></div>
 */
(function () {
  const quizzes = [...document.querySelectorAll(".quiz")];
  const scoreEls = document.querySelectorAll("[data-quiz-score]");
  let answered = 0, correct = 0;
  const renderScore = () => scoreEls.forEach(el => {
    el.textContent = answered ? `${correct} / ${quizzes.length} correct on first try` : "";
  });

  quizzes.forEach(quiz => {
    const answer = quiz.dataset.answer;
    const fb = quiz.querySelector(".feedback");
    let first = true;
    quiz.querySelectorAll(".choices button").forEach(btn => {
      btn.addEventListener("click", () => {
        const right = btn.textContent.trim() === answer;
        btn.classList.add(right ? "correct" : "wrong");
        if (fb) fb.textContent = right ? (fb.dataset.right || "Correct.") : (fb.dataset.wrong || "Not quite — try again.");
        if (first) { answered++; if (right) correct++; first = false; renderScore(); }
        if (right) quiz.querySelectorAll(".choices button").forEach(b => (b.disabled = true));
      });
    });
  });

  document.querySelectorAll(".reveal [data-reveal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const box = btn.closest(".reveal");
      const ta = box.querySelector("textarea");
      if (ta && !ta.value.trim()) { ta.placeholder = "Write your attempt first — the effort is what makes it stick."; ta.focus(); return; }
      box.classList.add("open");
      btn.disabled = true;
    });
  });
})();
