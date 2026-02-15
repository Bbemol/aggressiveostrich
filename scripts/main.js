const shareButtons = document.querySelectorAll('.link-card__share');

shareButtons.forEach((button) => {
  button.addEventListener('click', async () => {
    const card = button.closest('.link-card');
    const title = card?.dataset.title ?? document.title;
    const url = card?.dataset.url;

    if (!url) {
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }

      await navigator.clipboard.writeText(url);
      button.setAttribute('aria-label', 'Lien copié !');
      setTimeout(() => button.setAttribute('aria-label', 'Partager ce lien'), 1500);
    } catch (error) {
      console.error('Partage impossible', error);
    }
  });
});
