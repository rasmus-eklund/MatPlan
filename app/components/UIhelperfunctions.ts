const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function randomizeLetters(target: HTMLHeadingElement, intervalTime: number = 40): void {
  let interval: NodeJS.Timeout | null = null;
  let iteration = 0;

  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    target.innerText = target.innerText
      .split("")
      .map((letter, index) => {
        if (index < iteration) {
          return target.dataset.value?.[index] ?? letter;
        }

        return letters[Math.floor(Math.random() * 26)];
      })
      .join("");

    if (iteration >= (target.dataset.value?.length ?? 0)) {
      if (interval) {
        clearInterval(interval);
      }
    }

    iteration += 1 / 3;
  }, intervalTime);
}
