<template>
  <div class="grid grid-cols-1 gap-10 lg:grid-cols-[300px,minmax(0,1fr)]">
    <!-- Sidebar -->
    <aside class="sticky top-0 z-20 hidden h-dvh border-r lg:block">
      <UiScrollArea class="px-4 py-8">
        <NuxtLink
          class="flex items-center justify-between rounded-lg p-2 px-2.5 text-lg font-bold hover:bg-muted"
          to="#"
        >
          <span>UI Thing</span>
          <Icon name="cui:chevron-selector-vertical" class="size-5 text-muted-foreground" />
        </NuxtLink>

        <nav class="mt-8 flex flex-col gap-2">
          <template v-for="(m, i) in menu" :key="i">
            <UiDivider v-if="m.divider" class="my-2" />
            <template v-else-if="!m.items">
              <NuxtLink
                :to="m.to"
                class="group flex items-center gap-3 rounded-lg p-2 px-3 font-medium hover:bg-muted"
              >
                <Icon v-if="m.icon" :name="m.icon" class="size-6 text-muted-foreground" />
                <span class="opacity-70 group-hover:opacity-100">{{ m.name }}</span>
              </NuxtLink>
            </template>
            <template v-else-if="m.items">
              <UiCollapsible v-slot="{ open }">
                <UiCollapsibleTrigger
                  class="group flex w-full items-center gap-3 rounded-lg p-2 px-3 font-medium hover:bg-muted"
                >
                  <Icon
                    v-if="m.icon"
                    :name="m.icon"
                    class="size-6 shrink-0 text-muted-foreground"
                  />
                  <span class="opacity-70 group-hover:opacity-100">{{ m.name }}</span>
                  <Icon
                    name="cui:chevron-down"
                    class="ml-auto size-5 shrink-0 text-muted-foreground transition"
                    :class="[open ? '-rotate-180' : '']"
                  />
                </UiCollapsibleTrigger>
                <UiCollapsibleContent class="pl-9">
                  <template v-for="(c, k) in m.items">
                    <NuxtLink
                      :to="c.to"
                      class="group mb-1 flex items-center gap-3 rounded-lg p-2 px-3 font-medium first:mt-2 hover:bg-muted"
                    >
                      <span class="opacity-70 group-hover:opacity-100">{{ c.name }}</span>
                      <Icon
                        v-if="c.icon"
                        :name="c.icon"
                        class="ml-auto size-5 shrink-0 text-muted-foreground/70"
                      />
                    </NuxtLink>
                  </template>
                </UiCollapsibleContent>
              </UiCollapsible>
            </template>
          </template>
          <button
            @click="$colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'"
            class="group flex items-center gap-3 rounded-lg p-2 px-3 font-medium hover:bg-muted"
          >
            <Icon name="cui:sun" class="size-6 text-muted-foreground" />
            <span class="opacity-70 group-hover:opacity-100"
              >{{ $colorMode.value == "dark" ? "Light" : "Dark" }} mode</span
            >
          </button>
        </nav>
      </UiScrollArea>
    </aside>
    <!-- Main app -->
    <main class="container py-5 md:py-10">
      <!-- Mobile header -->
      <div class="mb-10 flex items-center justify-between md:hidden">
        <h1 class="text-xl font-bold">UI Thing</h1>
        <UiButton v-wave class="shrink-0" size="icon-sm" variant="ghost">
          <Icon class="size-5" name="cui:menu-05" />
        </UiButton>
      </div>

      <!-- Greeting & actions -->
      <div class="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
        <!-- Greeting -->
        <div class="flex items-center gap-4">
          <UiAvatar
            src="https://behonbaker.com/icon.png"
            class="size-12 shrink-0 ring-1 ring-muted md:size-14"
          />
          <div class="flex flex-col">
            <p class="flex items-center text-xl font-bold">
              Welcome back, Behon
              <Icon name="cui:chevron-down" class="ml-2 size-4 text-muted-foreground" />
            </p>
            <p class="text-sm text-muted-foreground">
              {{ useDateFormat(new Date(), "D MMMM YYYY").value }}
            </p>
          </div>
        </div>
        <!-- Top actions -->
        <div class="hidden items-center gap-3 md:flex">
          <UiTabs default-value="30d">
            <UiTabsList class="rounded-lg p-1">
              <UiTabsTrigger v-for="t in tabs" :key="t.value" :value="t.value" class="rounded-md">{{
                t.name
              }}</UiTabsTrigger>
            </UiTabsList>
          </UiTabs>
          <UiButton v-wave variant="outline" class="rounded-lg px-3">
            <Icon name="cui:filter-lines" class="size-4 text-muted-foreground" />
            <span class="whitespace-nowrap">1 Jan 2024 - 31 Dec 2025</span>
          </UiButton>
        </div>
      </div>

      <!-- Stats -->
      <div class="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <template v-for="(s, i) in stats" :key="i">
          <div class="rounded-xl bg-muted/50">
            <div class="flex items-center justify-between p-3">
              <p class="text-sm font-semibold">{{ s.title }}</p>
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiButton v-wave variant="ghost" size="icon-sm" class="size-5">
                    <Icon name="cui:dots-vertical" class="size-4 text-muted-foreground" />
                  </UiButton>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent class="w-44 rounded-lg p-1" align="start" side="left">
                  <UiDropdownMenuItem class="py-2.5">
                    <Icon name="cui:line-chart-up-04" class="size-4 text-muted-foreground" />
                    <span>Generate report</span>
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem class="py-2.5">
                    <Icon name="cui:download-cloud-02" class="size-4 text-muted-foreground" />
                    <span>Export</span>
                  </UiDropdownMenuItem>
                  <UiDropdownMenuItem class="py-2.5">
                    <Icon name="cui:trash-03" class="size-4 text-muted-foreground" />
                    <span>Delete</span>
                  </UiDropdownMenuItem>
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </div>
            <div class="rounded-xl border bg-background p-5">
              <h2 class="mb-2 text-2xl font-semibold">{{ s.value }}</h2>
              <p class="flex items-center text-sm text-muted-foreground">
                <Icon name="cui:trend-up-01" class="mr-1 size-4 shrink-0 text-emerald-500" />
                <span class="mr-1 text-emerald-500">{{ s.percentage }}%</span> vs. last month
              </p>
              <!-- Chart -->
              <!-- Chart -->
              <ClientOnly>
                <template #fallback>
                  <div class="mt-10 h-[40px] animate-pulse rounded-lg bg-muted"></div>
                </template>
                <div class="mt-10 h-[40px] w-full">
                  <apexchart
                    width="100%"
                    height="100%"
                    type="area"
                    :options="statOptions"
                    :series="statSeries"
                  />
                </div>
              </ClientOnly>
            </div>
          </div>
        </template>
      </div>

      <!-- Sales chart -->
      <div class="mt-10 rounded-xl bg-muted/50">
        <div class="flex items-center justify-between p-3">
          <p class="text-sm font-semibold">Sales</p>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton v-wave variant="ghost" size="icon-sm" class="size-5">
                <Icon name="cui:dots-vertical" class="size-4 text-muted-foreground" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="w-44 rounded-lg p-1" align="start" side="left">
              <UiDropdownMenuItem class="py-2.5">
                <Icon name="cui:line-chart-up-04" class="size-4 text-muted-foreground" />
                <span>Generate report</span>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem class="py-2.5">
                <Icon name="cui:download-cloud-02" class="size-4 text-muted-foreground" />
                <span>Export</span>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem class="py-2.5">
                <Icon name="cui:trash-03" class="size-4 text-muted-foreground" />
                <span>Delete</span>
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
        <div class="rounded-xl border bg-background p-5">
          <h2 class="mb-2 text-2xl font-semibold">
            {{ salesAmount }}
          </h2>
          <p class="flex items-center text-sm text-muted-foreground">
            <Icon name="cui:trend-up-01" class="mr-1 size-4 shrink-0 text-emerald-500" />
            <span class="mr-1 text-emerald-500">{{ salesTrend }}%</span>
            vs. last month
          </p>
          <!-- Chart -->
          <ClientOnly>
            <template #fallback>
              <div class="mt-5 h-[250px] animate-pulse rounded-lg bg-muted md:h-[350px]"></div>
            </template>
            <div class="mt-5 h-[250px] w-full md:h-[350px]">
              <apexchart
                width="100%"
                height="100%"
                type="area"
                :options="salesOptions"
                :series="salesSeries"
              />
            </div>
          </ClientOnly>
        </div>
      </div>

      <!-- Orders table -->
      <div class="mt-10 rounded-xl bg-muted/50">
        <div class="flex items-center justify-between p-3">
          <p class="text-sm font-semibold">Orders</p>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton v-wave variant="ghost" size="icon-sm" class="size-5">
                <Icon name="cui:dots-vertical" class="size-4 text-muted-foreground" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="w-44 rounded-lg p-1" side="left" align="start">
              <UiDropdownMenuItem class="py-2.5">
                <Icon name="cui:line-chart-up-04" class="size-4 text-muted-foreground" />
                <span>Generate report</span>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem class="py-2.5">
                <Icon name="cui:download-cloud-02" class="size-4 text-muted-foreground" />
                <span>Export</span>
              </UiDropdownMenuItem>
              <UiDropdownMenuItem class="py-2.5">
                <Icon name="cui:trash-03" class="size-4 text-muted-foreground" />
                <span>Delete</span>
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
        <div class="rounded-xl border bg-background p-5">
          <h2 class="mb-2 text-2xl font-semibold">
            {{ orderAmount }}
          </h2>
          <p class="flex items-center text-sm text-muted-foreground">
            <Icon name="cui:trend-up-01" class="mr-1 size-4 shrink-0 text-emerald-500" />
            <span class="mr-1 text-emerald-500">{{ orderTrend }}%</span>
            vs. last month
          </p>
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
                  <UiTableHead class="whitespace-nowrap">Order number</UiTableHead>
                  <UiTableHead class="hidden whitespace-nowrap md:table-cell">Date</UiTableHead>
                  <UiTableHead class="group hidden md:table-cell"> Status </UiTableHead>
                  <UiTableHead class="hidden whitespace-nowrap md:table-cell"
                    >Order amount</UiTableHead
                  >
                  <UiTableHead class="rounded-e-lg">Customer</UiTableHead>
                </UiTableRow>
              </UiTableHeader>

              <UiTableBody class="[&_tr:last-child]:border-b">
                <UiTableRow v-for="r in rows" :key="r.id" class="hover:bg-transparent">
                  <UiTableCell class="w-10 rounded-s-lg">
                    <div class="flex items-center">
                      <UiCheckbox class="size-5" />
                    </div>
                  </UiTableCell>
                  <UiTableCell class="font-medium">
                    {{ r.orderNumber }}
                  </UiTableCell>
                  <UiTableCell class="hidden md:table-cell">
                    <span class="text-muted-foreground">{{ r.date }}</span>
                  </UiTableCell>
                  <UiTableCell class="hidden md:table-cell">
                    <UiBadge variant="outline" class="rounded-md py-1 font-medium">{{
                      r.status
                    }}</UiBadge>
                  </UiTableCell>
                  <UiTableCell class="hidden md:table-cell">
                    <span class="text-muted-foreground">{{ r.amount }}</span>
                  </UiTableCell>
                  <UiTableCell>
                    <div class="flex items-center gap-2">
                      <UiAvatar :src="r.customer.avatar" class="size-8 shrink-0" />
                      <div class="ml-3 flex flex-col">
                        <p class="font-medium">{{ r.customer.name }}</p>
                        <p class="text-sm text-muted-foreground">{{ r.customer.email }}</p>
                      </div>
                    </div>
                  </UiTableCell>
                </UiTableRow>
              </UiTableBody>
            </UiTable>

            <!-- Pagination for table -->
            <div class="mx-auto my-5 hidden justify-center md:flex">
              <UiPagination :total="100" :sibling-count="1" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import { _border, _gray, _muted, _violet } from "#tailwind-config/theme/colors";
  import type { ApexOptions } from "apexcharts";

  const salesAmount = useState(() =>
    faker.finance.amount({ min: 50_000, max: 100_000, symbol: "$", autoFormat: true })
  );
  const salesTrend = useState(() => faker.number.float({ min: 1, max: 5, fractionDigits: 2 }));
  const orderAmount = useState(() => faker.number.int({ min: 100, max: 500 }));
  const orderTrend = useState(() => faker.number.float({ min: 1, max: 5, fractionDigits: 2 }));
  const menu = [
    { name: "Home", to: "#", icon: "cui:home-04" },
    { name: "All Products", to: "#", icon: "cui:grid-01" },
    {
      name: "Projects",
      icon: "cui:folder",
      items: [
        { name: "New project", to: "#", icon: "cui:plus" },
        { name: "New document", to: "#", icon: "cui:plus" },
        { name: "New spreadsheet", to: "#", icon: "cui:plus" },
      ],
    },
    { divider: true },
    { name: "Template", to: "#", icon: "cui:browser" },
    { name: "Reporting", to: "#", icon: "cui:line-chart-up-04" },
    { name: "Analysis", to: "#", icon: "cui:target-04" },
    { name: "Team", to: "#", icon: "cui:users-check" },
    { name: "Design", to: "#", icon: "cui:contrast-01" },
    { divider: true },
  ];

  const tabs = [
    { name: "12 months", value: "12m" },
    { name: "30 days", value: "30d" },
    { name: "7 days", value: "7d" },
    { name: "24 hours", value: "24h" },
  ];

  const { data: stats } = await useAsyncData(async () => {
    return [
      {
        title: "Sales",
        value: faker.finance.amount({ min: 50_000, max: 100_000, symbol: "$", autoFormat: true }),
        percentage: faker.number.float({ min: 1, max: 5, fractionDigits: 2 }),
      },
      {
        title: "Orders",
        value: faker.number.int({ min: 100, max: 500 }),
        percentage: faker.number.float({ min: 1, max: 5, fractionDigits: 2 }),
      },
      {
        title: "Average Order Value",
        value: faker.finance.amount({ min: 40, max: 110, symbol: "$", autoFormat: true }),
        percentage: faker.number.float({ min: 1, max: 5, fractionDigits: 2 }),
      },
    ];
  });

  const { data: rows } = await useAsyncData(async () => {
    const rows = Array.from({ length: 10 }, (_, i) => ({
      id: faker.string.uuid(),
      orderNumber: faker.string.alphanumeric(7).toUpperCase(),
      date: useDateFormat(faker.date.recent({ days: 30 }), "D MMMM, YYYY").value,
      status: faker.helpers.arrayElement(["Pending", "Processing", "Delivered", "Canceled"]),
      amount: faker.finance.amount({ min: 10, max: 100, symbol: "$", autoFormat: true }),
      customer: {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
        avatar: faker.image.avatar(),
      },
    }));
    return rows;
  });

  const generateSeries = (length: number, min = 300, max = 600) => {
    return Array.from({ length }, () => faker.number.int({ min, max }));
  };

  const statSeries: ApexOptions["series"] = [
    {
      name: "Value",
      data: generateSeries(12),
      color: _violet["700"],
    },
  ];
  const salesSeries: ApexOptions["series"] = [
    {
      name: "Value",
      data: generateSeries(12),
      color: _violet["700"],
    },
  ];

  const statOptions: ApexOptions = {
    stroke: {
      width: 2,
      curve: "smooth",
      lineCap: "round",
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
      sparkline: { enabled: true },
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
  const salesOptions: ApexOptions = {
    stroke: {
      width: 2,
      curve: "smooth",
      lineCap: "round",
    },
    dataLabels: { enabled: false },
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

  const image = "/social/sales-dashboard.png";
  const title = "Sales Dashboard";
  const description =
    "This design is a sales dashboard that shows the sales, orders, and average order value of a business.";

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
