import VueApexCharts from "vue3-apexcharts";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueApexCharts);
});

declare module "vue" {
  interface ComponentCustomProperties {
    $apexcharts: typeof ApexCharts;
  }
  interface GlobalComponents {
    apexchart: typeof VueApexCharts;
  }
}
