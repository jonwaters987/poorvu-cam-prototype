(function () {
  const host = document.currentScript.parentElement;

  const principles = {
    Aligned:
      "Assessment goals are clearly defined, and the evidence collected connects directly to those goals.",

    Actionable:
      "The evidence helps explain what is working and where meaningful improvements can be made.",

    Contextual:
      "The assessment respects the program, its participants, and the perspectives of learners.",

    Sustainable:
      "The assessment is designed so that it can realistically continue or be repeated in the future."
  };

  host.innerHTML = `
    <section class="cam-prototype">
      <h2>Collaborative Assessment Model</h2>

      <p>Select a principle to learn more.</p>

      <div class="cam-buttons">
        ${Object.keys(principles)
          .map(
            principle => `
              <button type="button" data-principle="${principle}">
                ${principle}
              </button>
            `
          )
          .join("")}
      </div>

      <div class="cam-detail" aria-live="polite">
        <h3>Aligned</h3>
        <p>${principles.Aligned}</p>
      </div>
    </section>
  `;

  const title = host.querySelector(".cam-detail h3");
  const description = host.querySelector(".cam-detail p");

  host.querySelectorAll(".cam-buttons button").forEach(button => {
    button.addEventListener("click", function () {
      const principle = button.dataset.principle;

      title.textContent = principle;
      description.textContent = principles[principle];
    });
  });
})();
