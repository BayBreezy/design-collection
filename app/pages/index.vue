<template>
  <div class="container py-10">
    <div>
      <h1 class="text-4xl font-semibold">{{ SITE_NAME }}</h1>
      <p class="mt-5 max-w-screen-md text-muted-foreground md:text-lg">{{ SITE_DESCRIPTION }}</p>
      <UiDivider class="my-10" />

      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        <template v-for="d in designs" :key="d.name">
          <NuxtLink :to="d.to" class="rounded-2xl transition hover:bg-muted md:p-3">
            <div class="flex flex-col">
              <img
                :src="d.image"
                :alt="d.name"
                class="h-[200px] w-full rounded-xl object-cover object-top ring-1 ring-muted"
              />
              <p class="mt-4 font-semibold lg:text-sm lg:font-medium">{{ d.name }}</p>
              <p class="mt-1 line-clamp-2 text-sm text-muted-foreground">{{ d.description }}</p>
            </div>
          </NuxtLink>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const designs = [
    {
      name: "Site Usage",
      description:
        "This design is a site usage dashboard that shows the site bandwidth and assets.",
      image: "/social/site-usage.png",
      to: "/site-usage",
    },
    {
      name: "Default Apps Settings",
      description:
        "This design is displays a table of default apps settings. It allows users to select the default apps that file types open with.",
      image: "/social/default-apps-settings.png",
      to: "/default-apps-setting",
    },
  ];

  const image = "/social/site-usage.png";
  const title = SITE_TITLE;
  const description = SITE_DESCRIPTION;

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
