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
      <h2 id="cam-interactive-title" class="cam-visually-hidden">
        Collaborative Assessment Principles
      </h2>

      <p class="cam-section-intro">
        Our work is guided by this model, which emphasizes assessments that are:
      </p>

      <div class="cam-inner">
        <div class="cam-visual-column">
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

            <button class="cam-center" type="button" data-action="reset" aria-label="Clear the selected principle">
              <span>Collaborative<br>Assessment<br>Principles</span>
            </button>
          </div>
        </div>

        <div class="cam-detail-column" aria-live="polite">
          <div class="cam-details">
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

  const flower = host.querySelector(".cam-flower");
  const petalButtons = Array.from(host.querySelectorAll(".cam-petal"));
  const detailItems = Array.from(host.querySelectorAll(".cam-detail-item"));
  const resetButton = host.querySelector('[data-action="reset"]');

  let lockedId = null;

  function paint(id) {
    if (id) {
      flower.dataset.selected = id;
    } else {
      delete flower.dataset.selected;
    }

    petalButtons.forEach((button) => {
      const active = button.dataset.principle === id;
      button.classList.toggle("is-active", active);
      button.classList.toggle("is-selected", lockedId === button.dataset.principle);
      button.setAttribute(
        "aria-pressed",
        lockedId === button.dataset.principle ? "true" : "false"
      );
    });

    detailItems.forEach((item) => {
      item.classList.toggle("is-active", item.dataset.detail === id);
      item.classList.toggle("is-selected", item.dataset.detail === lockedId);
    });
  }

  function previewPrinciple(id) {
    paint(id);
  }

  function restoreLockedState() {
    paint(lockedId);
  }

  function togglePrinciple(id) {
    lockedId = lockedId === id ? null : id;
    paint(lockedId);
  }

  function resetView() {
    lockedId = null;
    paint(null);
  }

  petalButtons.forEach((button) => {
    const id = button.dataset.principle;

    button.addEventListener("mouseenter", () => previewPrinciple(id));
    button.addEventListener("mouseleave", restoreLockedState);
    button.addEventListener("focus", () => previewPrinciple(id));
    button.addEventListener("blur", restoreLockedState);
    button.addEventListener("click", () => togglePrinciple(id));
  });

  resetButton.addEventListener("click", resetView);

  resetView();
})();
