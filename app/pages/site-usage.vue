<template>
  <div class="container flex flex-col">
    <header class="sticky top-0 z-30 shrink-0 bg-background">
      <div class="flex h-20 items-center justify-between md:px-4">
        <div class="flex items-center gap-3">
          <h1 class="text-lg font-bold">UI Thing</h1>
          <p class="hidden text-muted-foreground md:inline-block">uithing.com</p>
        </div>
        <div class="hidden items-center gap-3 md:flex">
          <UiChip inset text="1" class="bg-sky-500 text-white" size="lg">
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton v-wave size="icon-sm" variant="ghost">
                  <Icon class="size-5 text-muted-foreground" name="cui:bell-01" />
                </UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent align="end">Notifications</UiTooltipContent>
            </UiTooltip>
          </UiChip>
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton
                v-wave
                @click="$colorMode.preference = $colorMode.value == 'dark' ? 'light' : 'dark'"
                size="icon-sm"
                variant="ghost"
              >
                <Icon class="size-5 text-muted-foreground" name="cui:sun" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent align="end">Toggle light/dark mode</UiTooltipContent>
          </UiTooltip>
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiAvatar
                class="size-9 ring-1 ring-muted"
                src="https://behonbaker.com/icon.png"
                alt="Logo"
              />
            </UiTooltipTrigger>
            <UiTooltipContent align="end">View your account</UiTooltipContent>
          </UiTooltip>
        </div>
        <UiButton v-wave class="shrink-0 md:hidden" size="icon-sm" variant="ghost">
          <Icon class="size-5" name="cui:menu-05" />
        </UiButton>
      </div>
    </header>
    <main class="grid grid-cols-1 md:container lg:grid-cols-[280px,minmax(0,1fr)]">
      <aside class="sticky top-20 z-20 hidden h-[calc(100dvh-80px)] bg-background lg:block">
        <UiScrollArea class="h-[calc(100dvh-80px)] px-4 py-10">
          <NuxtLink class="group flex items-center gap-2 font-semibold" to="#">
            <Icon name="cui:arrow-left" class="z-30 size-5 transition group-hover:-translate-x-1" />
            <span>All sites</span>
          </NuxtLink>
          <nav class="mt-20 flex flex-col gap-1">
            <NuxtLink
              v-wave
              :class="[l.name === 'Site usage' ? 'bg-muted' : '']"
              class="w-fit rounded-lg px-3 py-2 font-medium text-muted-foreground transition hover:bg-muted"
              v-for="l in links"
              :key="l.name"
              :to="l.to"
              >{{ l.name }}</NuxtLink
            >
          </nav>
        </UiScrollArea>
      </aside>
      <div class="py-10 md:container">
        <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div class="shrink-0">
            <h1 class="text-2xl font-bold">Site usage</h1>
            <p class="mt-1 whitespace-nowrap text-muted-foreground">
              Manage your site bandwidth and assets here
            </p>
          </div>
          <div class="flex items-center gap-3">
            <UiButton v-wave variant="outline" class="rounded-lg px-3">
              <Icon name="cui:stars-01" class="size-4 text-muted-foreground" />
              <span>Designer</span>
            </UiButton>
            <UiButton v-wave variant="outline" class="rounded-lg px-3">
              <Icon name="cui:edit-03" class="size-4 text-muted-foreground" />
              <span>Editor</span>
            </UiButton>
            <UiButton
              v-wave
              variant="secondary"
              class="rounded-lg border px-3 dark:bg-secondary/50"
            >
              <span>Publish</span>
              <Icon name="cui:chevron-down" class="size-4 text-muted-foreground" />
            </UiButton>
          </div>
        </div>

        <div class="mt-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div class="flex shrink-0 flex-col gap-3">
            <div class="flex items-center gap-1">
              <p class="font-medium text-muted-foreground">All pages</p>
              <Icon name="cui:chevron-down" class="size-4 shrink-0 text-muted-foreground" />
            </div>
            <div class="flex items-end gap-2">
              <span class="text-2xl font-bold leading-none">486 GB</span>
              <span
                class="mb-0.5 inline-flex items-center gap-1 text-xs font-medium leading-none text-emerald-500"
                ><Icon class="size-3.5" name="cui:trend-up-01" />14%</span
              >
            </div>
          </div>
          <div class="flex flex-col gap-3 gap-y-5 md:flex-row md:items-center">
            <div class="flex items-center gap-3">
              <button
                class="shrink-0 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                30 days
              </button>
              <button
                class="shrink-0 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                7 days
              </button>
              <button
                class="shrink-0 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                24 hours
              </button>
            </div>
            <div class="flex items-center gap-3">
              <UiButton
                v-wave
                variant="secondary"
                class="w-full rounded-lg border px-3 dark:bg-secondary/50 md:w-auto"
              >
                Custom
              </UiButton>
              <UiButton
                v-wave
                variant="secondary"
                class="w-full rounded-lg border px-3 dark:bg-secondary/50 md:w-auto"
              >
                <Icon name="cui:filter-lines" class="size-4 text-muted-foreground" />
                <span class="whitespace-nowrap">1 Jan 2024 - 31 Dec 2025</span>
              </UiButton>
            </div>
          </div>
        </div>

        <!-- Chart -->
        <ClientOnly>
          <template #fallback>
            <div class="mt-10 h-[350px] animate-pulse bg-muted"></div>
          </template>
          <div class="mt-10 h-[350px] w-full">
            <apexchart width="100%" height="100%" type="line" :options="options" :series="series" />
          </div>
        </ClientOnly>

        <!-- Table filter and export controls -->
        <div class="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div class="flex shrink-0 items-center gap-1">
            <p class="font-medium text-muted-foreground">All assets</p>
            <Icon name="cui:chevron-down" class="size-4 shrink-0 text-muted-foreground" />
          </div>
          <div class="flex items-center gap-3">
            <div class="w-full md:w-[300px]">
              <UiVeeInput class="rounded-lg" icon="cui:search-lg" placeholder="Search" />
            </div>
            <UiButton v-wave variant="outline" class="shrink-0 rounded-lg px-3">
              <Icon name="cui:download-cloud-02" class="size-4 text-muted-foreground" />
              <span>Export</span>
            </UiButton>
          </div>
        </div>

        <!-- Table -->
        <div class="mt-5 w-full overflow-x-auto">
          <UiTable class="w-full">
            <UiTableHeader>
              <UiTableRow class="border-none bg-muted hover:bg-muted">
                <UiTableHead class="w-10 rounded-s-lg">
                  <div class="flex items-center">
                    <UiCheckbox class="size-5" />
                  </div>
                </UiTableHead>
                <UiTableHead>File</UiTableHead>
                <UiTableHead class="hidden md:table-cell">File size</UiTableHead>
                <UiTableHead class="group hidden md:table-cell"
                  ><div class="flex items-center gap-1">
                    <span>Bandwidth</span>
                    <Icon
                      name="cui:arrow-down"
                      class="size-4 text-muted-foreground group-hover:text-foreground"
                    /></div
                ></UiTableHead>
                <UiTableHead class="hidden md:table-cell">Total bandwidth</UiTableHead>
                <UiTableHead class="rounded-e-lg"><span class="sr-only">Actions</span></UiTableHead>
              </UiTableRow>
            </UiTableHeader>

            <UiTableBody class="[&_tr:last-child]:border-b">
              <UiTableRow v-for="r in rows" :key="r.id" class="hover:bg-transparent">
                <UiTableCell class="w-10 rounded-s-lg">
                  <div class="flex items-center">
                    <UiCheckbox class="size-5" />
                  </div>
                </UiTableCell>
                <UiTableCell>
                  <div class="flex items-center gap-2">
                    <Icon name="bi:filetype-mp4" class="size-5 text-muted-foreground" />
                    <span>{{ r.name }}</span>
                  </div>
                </UiTableCell>
                <UiTableCell class="hidden md:table-cell">
                  <span class="text-muted-foreground">{{ r.size }}</span>
                </UiTableCell>
                <UiTableCell class="hidden md:table-cell">
                  <span class="text-muted-foreground">{{ r.bandwidth }}</span>
                </UiTableCell>
                <UiTableCell class="hidden md:table-cell">
                  <div>
                    <UiProgress :model-value="r.totalBandwidth" class="h-2" />
                  </div>
                </UiTableCell>
                <UiTableCell class="w-10 rounded-e-lg">
                  <ClientOnly>
                    <UiDropdownMenu>
                      <UiDropdownMenuTrigger as-child>
                        <UiButton v-wave variant="ghost" size="icon-sm">
                          <Icon name="cui:dots-vertical" class="size-4 text-muted-foreground" />
                        </UiButton>
                      </UiDropdownMenuTrigger>
                      <UiDropdownMenuContent class="w-44 rounded-lg p-1" side="left">
                        <UiDropdownMenuItem class="py-2.5">
                          <Icon name="cui:info-circle" class="size-4 text-muted-foreground" />
                          <span>View info</span>
                        </UiDropdownMenuItem>
                        <UiDropdownMenuItem class="py-2.5">
                          <Icon name="cui:target-01" class="size-4 text-muted-foreground" />
                          <span>Show in assets</span>
                        </UiDropdownMenuItem>
                        <UiDropdownMenuItem class="py-2.5">
                          <Icon name="cui:download-cloud-02" class="size-4 text-muted-foreground" />
                          <span>Download file</span>
                        </UiDropdownMenuItem>
                      </UiDropdownMenuContent>
                    </UiDropdownMenu>
                  </ClientOnly>
                </UiTableCell>
              </UiTableRow>
            </UiTableBody>
          </UiTable>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import { _border, _gray, _muted, _violet } from "#tailwind-config/theme/colors";
  import type { ApexOptions } from "apexcharts";

  const series: ApexOptions["series"] = [
    {
      name: "This period",
      data: [300, 400, 450, 400, 320, 340, 380, 390, 410, 450, 510, 600],
      color: _violet["700"],
    },
    {
      name: "Previous period",
      data: [200, 300, 350, 300, 220, 240, 280, 290, 310, 350, 410, 500],
      color: _violet["400"],
    },
  ];

  const options: ApexOptions = {
    stroke: {
      width: 2,
      curve: "smooth",
      lineCap: "round",
      dashArray: [0, 8],
    },
    legend: {
      fontFamily: "inherit",
      fontWeight: 500,
      offsetY: 5,
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: _muted.foreground,
      },
    },
    grid: { borderColor: _border },
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    yaxis: { show: false },
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: _muted.foreground,
          fontFamily: "inherit",
        },
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  };
  const links = [
    { name: "General", to: "#" },
    { name: "Site access", to: "#" },
    { name: "Publishing", to: "#" },
    { name: "Billing", to: "#" },
    { name: "Plans", to: "#" },
    { name: "Site usage", to: "#" },
    { name: "SEO", to: "#" },
    { name: "Forms", to: "#" },
    { name: "Libraries", to: "#" },
    { name: "Fonts", to: "#" },
    { name: "Backups", to: "#" },
    { name: "Integrations", to: "#" },
    { name: "Custom code", to: "#" },
  ];

  const { data: rows } = await useAsyncData(async () => {
    const rows = Array.from({ length: 10 }, (_, i) => ({
      id: faker.string.uuid(),
      name: faker.system.fileName().toLowerCase().split(".")[0] + ".mp4",
      size: faker.number.float({ min: 10, max: 200, fractionDigits: 2 }) + " MB",
      bandwidth: faker.number.float({ min: 10, max: 100, fractionDigits: 2 }) + " GB",
      totalBandwidth: faker.number.float({ min: 10, max: 100, fractionDigits: 2 }),
    }));
    return rows;
  });

  const image = "/social/site-usage.png";
  const title = "Site usage";
  const description =
    "This design is a site usage dashboard that shows the site bandwidth and assets.";

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterCard: "summary_large_image",
  });

  defineOgImage({ url: image });

  useHead({
    link: [{ rel: "icon", type: "image/png", href: image }],
  });
</script>

<style>
  .apexcharts-menu {
    @apply border-border bg-background text-foreground;
    .apexcharts-menu-item {
      @apply hover:!bg-primary hover:!text-primary-foreground;
    }
  }

  .apexcharts-tooltip {
    background: theme("colors.background") !important;
    color: theme("colors.foreground") !important;
    border: 1px solid theme("colors.border") !important;
    box-shadow: theme("boxShadow.DEFAULT") !important;

    .apexcharts-tooltip-title {
      color: theme("colors.foreground") !important;
      background-color: theme("colors.muted.DEFAULT") !important;
      font-family: theme("fontFamily.sans") !important;
      border-bottom: 1px solid theme("colors.border") !important;
    }
  }
</style>
