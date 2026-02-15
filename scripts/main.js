// Sharing interactions removed on request.
function simpleApi() {
  return {
    data: null,
    loading: true,
    error: null,

    // S'exécute automatiquement au montage du composant
    async init() {
      await this.fetchData();
    },

    async fetchData() {
      this.loading = true;
      this.error = null;

      try {
        const response = await fetch("https://integral-desk-40dd752ba3.strapiapp.com/api/links?populate=*");

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }

        this.data = await response.json();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  };
}
