(function () {
  const script = document.currentScript;
  const host = script && script.parentElement ? script.parentElement : document.body;

  const principles = {
    aligned: {
      label: "Aligned",
      short:
        "Assessment activities reflect goals and outcomes of program activities",
      definition:
        "ALIGNED: This means that the assessment goals are well-articulated and all data collected tie back to these goals in specific ways without missing any key outcomes."
    },
    actionable: {
      label: "Actionable",
      short:
        "Data collection provides concrete next steps and long-term vision for the program",
      definition:
        "ACTIONABLE: This means that the data collected help explain the reasons behind why a program is functioning well or where it may need improvement."
    },
    sustainable: {
      label: "Sustainable",
      short:
        "Findings are translated into programmatic improvements and capacity for future assessment is included in planning",
      definition:
        "SUSTAINABLE: This means that the process of rerunning assessments, where needed, are planned for in advance to allow program leaders to carry on data collection."
    },
    contextual: {
      label: "Contextual",
      short:
        "Assessment approaches are accessible to and respectful of varied needs and values of the community",
      definition:
        "CONTEXT: This means considering the tone of a program, its relationship with participants, and the perspective of learners."
    }
  };

  host.innerHTML = `
    <section class="cam-interactive" aria-labelledby="cam-interactive-title">
      <div class="cam-inner">
        <div class="cam-visual-column">
          <h2 id="cam-interactive-title" class="cam-visually-hidden">
            Collaborative Assessment Principles
          </h2>

          <div class="cam-flower" role="group" aria-label="Select a Collaborative Assessment principle">
            <button class="cam-petal cam-petal--aligned" type="button" data-principle="aligned" aria-pressed="false">
              <span class="cam-petal-title">${principles.aligned.label}</span>
              <span class="cam-petal-copy">${principles.aligned.short}</span>
            </button>

            <button class="cam-petal cam-petal--actionable" type="button" data-principle="actionable" aria-pressed="false">
              <span class="cam-petal-title">${principles.actionable.label}</span>
              <span class="cam-petal-copy">${principles.actionable.short}</span>
            </button>

            <button class="cam-petal cam-petal--sustainable" type="button" data-principle="sustainable" aria-pressed="false">
              <span class="cam-petal-title">${principles.sustainable.label}</span>
              <span class="cam-petal-copy">${principles.sustainable.short}</span>
            </button>

            <button class="cam-petal cam-petal--contextual" type="button" data-principle="contextual" aria-pressed="false">
              <span class="cam-petal-title">${principles.contextual.label}</span>
              <span class="cam-petal-copy">${principles.contextual.short}</span>
            </button>

            <button class="cam-center" type="button" data-action="show-all" aria-label="Show all Collaborative Assessment principles">
              <span>Collaborative<br>Assessment<br>Principles</span>
            </button>
          </div>
        </div>

        <div class="cam-detail-column">
          <div class="cam-detail-heading-row">
            <p class="cam-detail-eyebrow">Collaborative Assessment Model</p>
            <button class="cam-show-all" type="button" data-action="show-all">
              View all principles
            </button>
          </div>

          <div class="cam-details" aria-live="polite">
            ${Object.entries(principles)
              .map(
                ([id, item]) => `
                  <article class="cam-detail-item" data-detail="${id}">
                    <p>${item.definition}</p>
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      </div>
    </section>
  `;

  const petalButtons = Array.from(host.querySelectorAll(".cam-petal"));
  const detailItems = Array.from(host.querySelectorAll(".cam-detail-item"));
  const showAllButtons = Array.from(host.querySelectorAll('[data-action="show-all"]'));
  const flower = host.querySelector(".cam-flower");

  function selectPrinciple(id) {
    flower.dataset.selected = id;

    petalButtons.forEach((button) => {
      const selected = button.dataset.principle === id;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", selected ? "true" : "false");
    });

    detailItems.forEach((item) => {
      const selected = item.dataset.detail === id;
      item.classList.toggle("is-selected", selected);
      item.hidden = !selected;
    });
  }

  function showAll() {
    delete flower.dataset.selected;

    petalButtons.forEach((button) => {
      button.classList.remove("is-selected");
      button.setAttribute("aria-pressed", "false");
    });

    detailItems.forEach((item) => {
      item.classList.remove("is-selected");
      item.hidden = false;
    });
  }

  petalButtons.forEach((button) => {
    button.addEventListener("click", () => selectPrinciple(button.dataset.principle));
  });

  showAllButtons.forEach((button) => {
    button.addEventListener("click", showAll);
  });

  showAll();
})();
