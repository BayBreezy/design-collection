<template>
  <div class="min-h-dvh bg-muted pb-10">
    <div class="container">
      <!-- Header -->
      <header class="flex h-20 items-center justify-between">
        <div class="flex items-center">
          <NuxtLink class="text-xl font-bold" to="#">UI Thing</NuxtLink>
          <nav class="ml-10 hidden items-center gap-1 lg:flex">
            <NuxtLink class="p-2 font-medium" v-for="t in topNavLinks" :key="t.name" to="#">{{
              t.name
            }}</NuxtLink>
          </nav>
        </div>
        <div class="hidden items-center gap-2 md:flex">
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton v-wave size="icon-sm" variant="ghost">
                <Icon class="size-5 text-muted-foreground" name="cui:bell-01" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent align="end">Notifications</UiTooltipContent>
          </UiTooltip>
          <UiTooltip>
            <UiTooltipTrigger as-child>
              <UiButton v-wave size="icon-sm" variant="ghost">
                <Icon class="size-5 text-muted-foreground" name="cui:settings-01" />
              </UiButton>
            </UiTooltipTrigger>
            <UiTooltipContent align="end">Settings</UiTooltipContent>
          </UiTooltip>
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
      </header>

      <!-- Heading card -->
      <div class="rounded-2xl bg-background px-6 py-6 lg:rounded-3xl lg:px-8 lg:py-10">
        <h1 class="text-2xl font-bold md:text-3xl">Settings</h1>
        <p class="mt-1 text-muted-foreground md:text-lg">
          Manage your plan and billing history here.
        </p>
        <div class="mt-5 flex items-center gap-3 overflow-x-auto md:mt-8">
          <template v-for="t in tabs" :key="t.name">
            <UiButton
              :class="[
                t.name === 'Apps'
                  ? 'bg-foreground text-background hover:bg-foreground hover:text-background hover:opacity-80'
                  : '',
              ]"
              class="rounded-full"
              v-wave
              variant="outline"
              >{{ t.name }}</UiButton
            >
          </template>
        </div>
      </div>

      <!-- Table displaying apps -->
      <div class="mt-3 rounded-2xl bg-background px-6 py-6 lg:rounded-3xl lg:px-8 lg:py-8">
        <h2 class="text-xl font-semibold">Default apps</h2>
        <p class="mt-1 text-muted-foreground">Select the default apps that file types open with.</p>

        <!-- Table -->
        <div class="mt-5 hidden w-full overflow-x-auto lg:block">
          <UiTable class="w-full">
            <UiTableHeader>
              <UiTableRow class="border-none bg-muted hover:bg-muted">
                <UiTableHead class="rounded-s-lg">File type</UiTableHead>
                <UiTableHead>Extensions</UiTableHead>
                <UiTableHead>Open with</UiTableHead>
                <UiTableHead class="rounded-e-lg">View in</UiTableHead>
              </UiTableRow>
            </UiTableHeader>

            <UiTableBody class="[&_tr:last-child]:border-b">
              <UiTableRow v-for="r in rows" :key="r.id" class="hover:bg-transparent">
                <UiTableCell class="min-w-72 font-semibold capitalize">
                  <div class="flex items-center gap-3">
                    <Icon name="cui:file-04" class="size-6 text-muted-foreground" />
                    {{ r.fileType }}
                  </div>
                </UiTableCell>
                <UiTableCell>
                  <div class="flex items-center gap-1">
                    <UiBadge
                      v-for="e in r.extensions"
                      :key="e"
                      class="px-1.5 py-1 font-medium"
                      variant="outline"
                      >.{{ e }}</UiBadge
                    >
                  </div>
                </UiTableCell>
                <UiTableCell>
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-muted-foreground">Open with</span>
                    <div class="w-40">
                      <UiSelect>
                        <UiSelectTrigger class="h-9 px-2" placeholder="Select an option" />
                        <UiSelectContent>
                          <UiSelectItem
                            v-for="(o, i) in openWithOptions"
                            :key="i"
                            :value="o.value"
                            :text="o.name"
                          />
                        </UiSelectContent>
                      </UiSelect>
                    </div>
                  </div>
                </UiTableCell>
                <UiTableCell>
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-muted-foreground">View in</span>
                    <div class="w-40">
                      <UiSelect>
                        <UiSelectTrigger class="h-9 px-2" placeholder="Select an option" />
                        <UiSelectContent>
                          <UiSelectItem
                            v-for="(o, i) in viewInOptions"
                            :key="i"
                            :value="o.value"
                            :text="o.name"
                          />
                        </UiSelectContent>
                      </UiSelect>
                    </div>
                  </div>
                </UiTableCell>
              </UiTableRow>
            </UiTableBody>
          </UiTable>
        </div>
        <!-- Pagination for table -->
        <div class="mx-auto mt-8 hidden justify-center lg:flex">
          <UiPagination :total="100" :sibling-count="1" />
        </div>

        <!-- Mobile table -->
        <div class="mt-5 lg:hidden">
          <UiAccordion>
            <template v-for="(i, k) in rows" :key="k">
              <UiAccordionItem v-slot="{ open }" class="border-b-0" :value="i.id">
                <UiAccordionHeader>
                  <UiAccordionTrigger class="border-b px-1 py-5 hover:no-underline">
                    <div class="flex items-center gap-4">
                      <Icon name="cui:file-04" class="size-6 text-muted-foreground" />
                      <span class="font-semibold capitalize">{{ i.fileType }}</span>
                    </div>
                  </UiAccordionTrigger>
                </UiAccordionHeader>
                <UiAccordionContent class="bg-muted [&>div]:pb-0">
                  <div class="flex flex-col pl-4 md:pl-10">
                    <div
                      class="grid grid-cols-[80px,minmax(0,1fr)] items-center gap-3 border-b px-3 py-4"
                    >
                      <span class="text-sm text-muted-foreground">Open with</span>
                      <div class="w-48">
                        <UiSelect>
                          <UiSelectTrigger class="h-9 px-2" placeholder="Select an option" />
                          <UiSelectContent>
                            <UiSelectItem
                              v-for="(o, i) in openWithOptions"
                              :key="i"
                              :value="o.value"
                              :text="o.name"
                            />
                          </UiSelectContent>
                        </UiSelect>
                      </div>
                    </div>
                    <div class="grid grid-cols-[80px,minmax(0,1fr)] items-center gap-3 px-3 py-4">
                      <span class="text-sm text-muted-foreground">View in</span>
                      <div class="w-48">
                        <UiSelect>
                          <UiSelectTrigger class="h-9 px-2" placeholder="Select an option" />
                          <UiSelectContent>
                            <UiSelectItem
                              v-for="(o, i) in viewInOptions"
                              :key="i"
                              :value="o.value"
                              :text="o.name"
                            />
                          </UiSelectContent>
                        </UiSelect>
                      </div>
                    </div>
                  </div>
                </UiAccordionContent>
              </UiAccordionItem>
            </template>
          </UiAccordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";

  const topNavLinks = [
    { name: "Overview", to: "#" },
    { name: "Projects", to: "#" },
    { name: "Analytics", to: "#" },
    { name: "Reports", to: "#" },
    { name: "Users", to: "#" },
    { name: "Publishing", to: "#" },
  ];
  const openWithOptions = [
    { name: "Google Docs", value: "google-docs" },
    { name: "Microsoft Word", value: "microsoft-word" },
    { name: "Notepad", value: "notepad" },
    { name: "Sublime Text", value: "sublime-text" },
    { name: "VS Code", value: "visual-studio-code" },
    { name: "Preview", value: "preview" },
  ];
  const viewInOptions = [
    { name: "Desktop App", value: "desktop-app" },
    { name: "Web App", value: "web-app" },
  ];

  const tabs = [
    { name: "General", to: "#" },
    { name: "Users", to: "#" },
    { name: "Analytics", to: "#" },
    { name: "Apps", to: "#" },
    { name: "Security", to: "#" },
    { name: "Billing", to: "#" },
    { name: "API", to: "#" },
  ];

  const { data: rows } = await useAsyncData(async () => {
    const rows = Array.from({ length: 10 }, (_, i) => ({
      id: faker.string.uuid(),
      fileType: faker.system.fileType(),
      extensions: [faker.system.commonFileExt(), faker.system.commonFileExt()],
    }));
    return rows;
  });

  const image = "/social/default-apps-settings.png";
  const title = "Default Apps Settings";
  const description =
    "This design is displays a table of default apps settings. It allows users to select the default apps that file types open with.";

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
