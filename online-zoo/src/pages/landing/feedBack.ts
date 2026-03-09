import type { FeedBack, FeedBackResponseDTO } from "../../types/feedback";
import { getAll } from "../../api/http";
import { handlerPopUp } from "../../utils/popup";
import { initSlider } from "../../utils/slider";

const ourSection = document.querySelector<HTMLElement>(".our-users");
const contextIssue = `<div class="wrapper-issue">
                        <p id="issue">Something went wrong. Please,
                        <a href="" id="refresh-page-link">refresh</a>
                          the page.</p>
                      </div>`;

export async function initFeedBackSlider() {
  const loader = document.querySelector<HTMLElement>(".loader.our-users");

  if (!loader) return;
  loader.classList.add("active");

  try {
    const feedBackData = await getAll<FeedBackResponseDTO>("feedback");
    await renderCards(feedBackData.data);
    initSlider(ourSection);
  } catch (error) {
    loader.classList.remove("active");
    if (error instanceof Error) console.error(error.message);
    handlerPopUp("error");
    if (ourSection) {
      ourSection.insertAdjacentHTML("afterbegin", contextIssue);
    }
  }
}

async function renderCards(feedBacksData: FeedBack[]) {
  const track = document.querySelector<HTMLElement>(
    ".slider-inner.slider__track",
  );

  if (!track) return;

  const slides = feedBacksData
    .map((feedBackData) => {
      return `
        <div class="our-users-card">
            <p class="note">&ldquo;</p>
            <h3>${feedBackData.city}, ${feedBackData.month} ${feedBackData.year}</h3>
            <p>${feedBackData.text}</p>
            <p class="author">${feedBackData.name}</p>
        </div>
      `;
    })
    .join("");

  track.innerHTML = slides;
}
