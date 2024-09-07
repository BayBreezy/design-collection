<template>
  <div style="--radius: 10px" class="grid grid-cols-1 lg:grid-cols-[300px_minmax(0,1fr)] lg:p-5">
    <aside
      class="sticky top-5 hidden h-[calc(100dvh-40px)] overflow-hidden rounded-2xl border bg-foreground text-background dark:bg-background dark:text-foreground lg:block"
    >
      <UiScrollArea>
        <div class="flex h-[calc(100dvh-40px)] flex-col px-6 pt-8">
          <div class="flex items-center justify-between gap-3">
            <p class="text-xl font-semibold">UI Thing</p>
            <UiButton class="shrink-0" title="Collapse menu" v-wave size="icon-sm" variant="ghost">
              <Icon name="cui:arrow-left" class="size-5" />
            </UiButton>
          </div>
          <div class="relative mt-6 h-10 overflow-hidden rounded-md bg-muted/20 dark:bg-muted">
            <span class="absolute left-3 top-1/2 flex -translate-y-1/2 items-center justify-center">
              <Icon name="cui:search-lg" class="size-5" />
            </span>
            <input
              placeholder="Search"
              type="search"
              class="size-full bg-transparent px-3 pl-10 focus:outline-none"
            />
          </div>
          <nav class="my-6 flex flex-col gap-1">
            <template v-for="n in nav" :key="n.name">
              <UiCollapsible v-slot="{ open }">
                <UiCollapsibleTrigger
                  v-wave
                  class="group flex w-full items-center gap-4 rounded-md p-2.5 hover:bg-muted/20 dark:hover:bg-muted"
                >
                  <Icon
                    :name="n.icon"
                    :class="{ 'opacity-100': open }"
                    class="size-6 opacity-60 transition group-hover:opacity-100"
                  />
                  <span>{{ n.name }}</span>
                  <Icon
                    name="cui:chevron-down"
                    class="ml-auto size-6 text-muted-foreground transition"
                    :class="{ 'rotate-180': open }"
                  />
                </UiCollapsibleTrigger>
                <UiCollapsibleContent>
                  <div class="flex flex-col gap-0.5">
                    <button
                      v-for="i in ['Overview', 'Reporting', 'Sources', 'Users']"
                      :key="i"
                      v-wave
                      class="group flex w-full items-center gap-4 rounded-md p-2.5 py-2 pl-6 hover:bg-muted/20 dark:hover:bg-muted"
                    >
                      <span
                        class="size-2 scale-0 rounded-full bg-white transition group-hover:scale-100"
                      />
                      <span>{{ i }}</span>
                    </button>
                  </div>
                </UiCollapsibleContent>
              </UiCollapsible>
            </template>
          </nav>
          <div class="mt-auto flex flex-col gap-1 pb-8">
            <button
              @click="colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'"
              v-wave
              class="group flex items-center gap-3 rounded-md p-2.5 hover:bg-muted/20 dark:hover:bg-muted"
            >
              <Icon name="cui:sun" class="size-6 opacity-60 transition group-hover:opacity-100" />
              <span>Color Mode</span>
            </button>
            <button
              v-wave
              class="group flex items-center gap-3 rounded-md p-2.5 hover:bg-muted/20 dark:hover:bg-muted"
            >
              <Icon
                name="cui:message-chat-circle"
                class="size-6 opacity-60 transition group-hover:opacity-100"
              />
              <span>Support</span>
            </button>
            <button
              v-wave
              class="group flex items-center gap-3 rounded-md p-2.5 hover:bg-muted/20 dark:hover:bg-muted"
            >
              <Icon
                name="cui:settings-01"
                class="size-6 opacity-60 transition group-hover:opacity-100"
              />
              <span>Settings</span>
            </button>
            <div class="mt-4 flex items-center gap-3 rounded-xl bg-muted/20 p-4 dark:bg-muted">
              <UiAvatar src="https://behonbaker.com/icon.png" />
              <div class="flex flex-col gap-0.5 text-sm leading-none">
                <p class="font-semibold">Behon Baker</p>
                <p class="opacity-65">behon.baker@yahoo.com</p>
              </div>
            </div>
          </div>
        </div>
      </UiScrollArea>
    </aside>
    <main class="container">
      <UiNavbar class="border-b-0 lg:hidden" sticky>
        <div class="flex h-16 items-center justify-between">
          <p class="text-xl font-semibold">UI Thing</p>
          <div class="flex items-center gap-2">
            <UiAvatar src="https://behonbaker.com/icon.png" class="size-9 ring-1 ring-muted" />
            <UiButton v-wave class="shrink-0" size="icon-sm" variant="ghost">
              <Icon class="size-5" name="cui:menu-05" />
            </UiButton>
          </div>
        </div>
      </UiNavbar>
      <div class="flex flex-col justify-between gap-5 py-6 md:flex-row md:items-center">
        <h1 class="text-3xl font-semibold">Project Sources</h1>
        <div class="flex items-center gap-3">
          <UiButton v-wave class="" variant="outline">Import</UiButton>
          <UiButton v-wave>Share</UiButton>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <UiTabs default-value="ov">
          <UiTabsList loop class="h-11">
            <UiTabsTrigger class="py-2" value="ov">Overview</UiTabsTrigger>
            <UiTabsTrigger class="py-2" value="vt">Visual tagger</UiTabsTrigger>
            <UiTabsTrigger class="py-2" value="db">Debugger</UiTabsTrigger>
          </UiTabsList>
        </UiTabs>
        <UiButton v-wave class="shrink-0 md:pl-2" variant="ghost">
          <Icon name="cui:plus" class="size-5" />
          <span class="hidden md:inline-block"> Add custom </span>
        </UiButton>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 lg:divide-x">
        <!-- top/ left side -->
        <div class="py-10 lg:pr-10">
          <div class="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <p class="text-xl font-semibold">Sources</p>
            <div class="md:w-[350px] lg:w-[300px]">
              <UiVeeInput icon="cui:search-lg" placeholder="Search sources" />
            </div>
          </div>

          <UiTabs default-value="ls" class="mt-6">
            <UiTabsList loop class="h-11">
              <UiTabsTrigger class="py-2" value="ls">Live sources</UiTabsTrigger>
              <UiTabsTrigger class="py-2" value="ps">Paused sources</UiTabsTrigger>
            </UiTabsList>
          </UiTabs>

          <div class="mt-6 overflow-x-auto">
            <UiTable>
              <UiTableHeader>
                <UiTableRow>
                  <UiTableHead>Action</UiTableHead>
                  <UiTableHead>Status</UiTableHead>
                  <UiTableHead>Date</UiTableHead>
                </UiTableRow>
              </UiTableHeader>
              <UiTableBody class="[&_tr:last-child]:border-b">
                <UiTableRow v-for="item in data" :key="item.id">
                  <UiTableCell class="capitalize">{{ item.name }}</UiTableCell>
                  <UiTableCell>
                    <UiBadge class="font-medium" variant="outline">{{ item.status }}</UiBadge>
                  </UiTableCell>
                  <UiTableCell>
                    <p>{{ item.date }}</p>
                  </UiTableCell>
                </UiTableRow>
              </UiTableBody>
              <UiTableFooter class="bg-background text-foreground">
                <UiTableRow>
                  <UiTableCell colspan="3">
                    <div class="flex items-center justify-between gap-5">
                      <p class="text-muted-foreground">Page 1 of 10</p>
                      <div class="flex items-center gap-2">
                        <UiButton size="sm" v-wave variant="outline">Prev</UiButton>
                        <UiButton size="sm" variant="outline" v-wave>Next</UiButton>
                      </div>
                    </div>
                  </UiTableCell>
                </UiTableRow>
              </UiTableFooter>
            </UiTable>
          </div>
        </div>
        <!-- bottom/ right side -->
        <div class="py-10 lg:pl-10">
          <div class="flex items-center justify-between gap-5">
            <p class="text-xl font-semibold">Source deleted</p>
            <UiButton v-wave variant="outline">View in schema</UiButton>
          </div>

          <div class="mt-6 flex items-center justify-between gap-3">
            <UiTabs default-value="pr" class="">
              <UiTabsList loop class="h-11">
                <UiTabsTrigger class="py-2" value="pr">Pretty</UiTabsTrigger>
                <UiTabsTrigger class="py-2" value="rw">Raw</UiTabsTrigger>
                <UiTabsTrigger class="py-2" value="vi">Violations</UiTabsTrigger>
              </UiTabsList>
            </UiTabs>
            <UiButton class="shrink-0" v-wave variant="outline">
              <Icon name="cui:copy-01" class="size-5" />
              Copy</UiButton
            >
          </div>

          <div class="mt-6 overflow-hidden rounded-xl border">
            <ClientOnly>
              <Codemirror
                class="!text-sm !leading-6"
                original-style
                v-model:value="code"
                :options="cmOptions"
                ref="cmRef"
              >
              </Codemirror>
            </ClientOnly>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import Codemirror from "codemirror-editor-vue3";
  import type { Editor, EditorConfiguration } from "codemirror";
  import type { CmComponentRef } from "codemirror-editor-vue3";

  const { data } = await useAsyncData(async () => {
    const res = [];
    for (let i = 0; i < 10; i++) {
      res.push({
        id: faker.string.uuid(),
        name: faker.lorem.words({ min: 2, max: 3 }),
        status: faker.helpers.arrayElement(["Track", "Pause"]),
        date: useDateFormat(faker.date.recent({ days: 20 }), "MMM DD, YYYY").value,
      });
    }
    return res;
  });

  const nav = [
    { name: "Home", icon: "cui:home-line" },
    { name: "Dashboard", icon: "cui:speedometer-01" },
    { name: "Projects", icon: "cui:folder" },
    { name: "Tasks", icon: "cui:check-done-01" },
    { name: "Reporting", icon: "cui:pie-chart-02" },
  ];

  const code = ref(
    `// Imports
import mongoose, { Schema } from 'mongoose';

// Collection name
export const collectionName = 'Design';

// Schema
const schema = new Schema({
  name: { type: String, required: true },
  description: String,
  tags: [String],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

// Model
export default mongoose.model(collectionName, schema);
`
  );

  const colorMode = useColorMode();
  const cmRef = ref<CmComponentRef>();
  let cmOptions: EditorConfiguration = {
    mode: "text/javascript",
    theme: "eclipse",
  };

  onUnmounted(() => {
    cmRef.value?.destroy();
  });

  const image = "/social/project-sources.png";
  const title = "Project Sources";
  const description =
    "This design is a project sources page that shows a list of sources and their status. It also shows a source deleted page with a view in schema button.";

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
