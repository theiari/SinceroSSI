export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path === '/dashboard') {
    try {
      const { data } = await useFetch('/api/login');
      console.log("Data:", data.value);
      const isAuthenticated = data?.value !== null;
      console.log("User is authenticated authGlobal:", isAuthenticated);

      if (!isAuthenticated) {
        return navigateTo('/login');
      }
    } catch (err) {
      console.error("Authentication error:", err);
      return navigateTo('/login');
    }
  }
});
