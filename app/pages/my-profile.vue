<template>
  <div class="grid grid-cols-1 gap-10 lg:grid-cols-[300px,minmax(0,1fr)]">
    <!-- Sidebar -->
    <aside class="sticky top-0 z-20 hidden h-dvh border-r bg-muted/50 lg:block">
      <UiScrollArea class="">
        <div class="flex h-screen flex-col gap-5 px-5 py-8">
          <div>
            <NuxtLink
              class="flex items-center justify-between rounded-lg text-lg font-semibold"
              to="#"
            >
              <span>UI Thing</span>
              <Icon name="cui:chevron-down" class="size-5 shrink-0 text-muted-foreground/70" />
            </NuxtLink>
            <p class="mt-1 text-muted-foreground">hello@uithing.com</p>
          </div>
          <nav class="mt-10 flex grow flex-col gap-2">
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
                      :name="open ? 'cui:minus' : 'cui:plus'"
                      class="ml-auto size-5 shrink-0 text-muted-foreground transition"
                    />
                  </UiCollapsibleTrigger>
                  <UiCollapsibleContent class="pl-9">
                    <template v-for="(c, k) in m.items">
                      <NuxtLink
                        :to="c.to"
                        class="group mb-1 flex items-center gap-3 rounded-lg p-2 px-3 font-medium first:mt-2 hover:bg-muted"
                      >
                        <span class="opacity-70 group-hover:opacity-100">{{ c.name }}</span>
                        <UiBadge
                          class="ml-auto rounded-lg text-sm text-muted-foreground"
                          variant="secondary"
                          v-if="c.badge"
                          >{{ c.badge }}</UiBadge
                        >
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
              <ClientOnly>
                <span class="opacity-70 group-hover:opacity-100"
                  >{{ $colorMode.value == "dark" ? "Light" : "Dark" }} mode</span
                >
              </ClientOnly>
            </button>
          </nav>
          <div class="mt-auto flex shrink-0 flex-col gap-2 pb-5">
            <NuxtLink
              to="#"
              class="group flex items-center gap-3 rounded-lg p-2 px-3 font-medium hover:bg-muted"
            >
              <Icon name="cui:help-circle" class="size-6 text-muted-foreground" />
              <span class="opacity-70 group-hover:opacity-100">Support</span>
            </NuxtLink>
            <NuxtLink
              to="#"
              class="group flex items-center gap-3 rounded-lg bg-muted p-2 px-3 font-medium"
            >
              <Icon name="cui:settings-01" class="size-6 text-muted-foreground" />
              <span>Settings</span>
            </NuxtLink>
          </div>
        </div>
      </UiScrollArea>
    </aside>
    <!-- Main app -->
    <main class="container py-5 md:py-10">
      <!-- Mobile header -->
      <div class="mb-10 flex items-center justify-between md:hidden">
        <h1 class="text-xl font-bold">UI Thing</h1>
        <div class="flex items-center gap-2">
          <UiAvatar src="https://behonbaker.com/icon.png" class="size-9 ring-1 ring-muted" />
          <UiButton v-wave class="shrink-0" size="icon-sm" variant="ghost">
            <Icon class="size-5" name="cui:menu-05" />
          </UiButton>
        </div>
      </div>

      <!-- Header -->
      <div class="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <h1 class="text-3xl font-semibold">Settings</h1>
          <p class="mt-1 text-muted-foreground">
            Manage your details and personal preferences here.
          </p>
        </div>
        <div class="hidden items-center gap-3 lg:flex">
          <div>
            <UiVeeInput class="rounded-lg" placeholder="Search" icon="cui:search-lg" />
          </div>
          <UiButton class="shrink-0 rounded-lg" variant="outline">
            <Icon name="cui:plus" class="size-5 text-muted-foreground" />
            Invite
          </UiButton>
          <UiButton class="shrink-0 rounded-lg" variant="outline"> Upgrade </UiButton>
          <UiAvatar src="https://behonbaker.com/icon.png" class="ring-1 ring-muted" />
        </div>
      </div>

      <!-- Tabs -->
      <div class="mt-10 overflow-x-auto">
        <UiTabs default-value="my-profile">
          <UiTabsList class="overflow-x-auto rounded-lg p-1">
            <UiTabsTrigger v-for="t in tabs" :key="t.value" :value="t.value" class="rounded-md">{{
              t.name
            }}</UiTabsTrigger>
          </UiTabsList>
        </UiTabs>
      </div>

      <!-- Verify alert -->
      <div
        class="mt-8 flex flex-col gap-y-3 rounded-xl border bg-muted p-4 py-5 dark:bg-muted/60 lg:items-start xl:flex-row"
      >
        <Icon name="cui:info-circle" class="mr-3 size-5 shrink-0 text-muted-foreground" />
        <div class="flex flex-col gap-1">
          <p class="font-semibold">Please confirm your email to publish your profile</p>
          <p class="text-sm text-muted-foreground">
            We sent a 6-digit verification code to hi@hellonewuser.com.
            <button class="underline">Didn't get the email?</button>
          </p>
        </div>
        <div class="flex flex-col gap-2 lg:flex-row lg:items-center xl:ml-auto">
          <UiVeePinInput
            placeholder="•"
            class="bg-transparent"
            :input-count="6"
            :model-value="['2', '6', '6', '2']"
          />
          <div>
            <UiButton class="shrink-0 whitespace-nowrap text-primary" variant="link"
              >Verify email</UiButton
            >
          </div>
        </div>
      </div>

      <!-- Profile details -->
      <div class="mt-10">
        <h2 class="mb-4 text-lg font-semibold">My profile</h2>

        <div
          class="grid grid-cols-1 items-center gap-4 border-y py-6 md:grid-cols-[400px,minmax(0,1fr)]"
        >
          <p class="font-semibold">Profile <span class="text-primary">*</span></p>
          <div class="flex items-center">
            <p class="text-muted-foreground">uithing.com/janedoe</p>
            <UiButton class="ml-3 shrink-0 text-base" variant="link">Edit</UiButton>
          </div>
        </div>
        <div
          class="grid grid-cols-1 items-center gap-4 border-b py-6 md:grid-cols-[400px,minmax(0,1fr)]"
        >
          <div>
            <p class="font-semibold">Photo</p>
            <p class="text-muted-foreground">
              This is the photo that will be displayed on your profile.
            </p>
          </div>
          <div class="flex items-center gap-3">
            <UiAvatar src="https://behonbaker.com/icon.png" class="size-14 ring-1 ring-muted" />
            <UiButton class="ml-3 shrink-0 p-1 text-base text-muted-foreground" variant="link"
              >Delete</UiButton
            >
            <UiButton class="shrink-0 p-1 text-base" variant="link">Upload</UiButton>
          </div>
        </div>
        <div
          class="grid grid-cols-1 items-center gap-4 border-b py-6 md:grid-cols-[400px,minmax(0,1fr)]"
        >
          <div>
            <p class="font-semibold">Full name <span class="text-primary">*</span></p>
            <p class="text-muted-foreground">This will be displayed on your profile.</p>
          </div>
          <div class="flex items-center gap-3">
            <p class="text-muted-foreground">Jane Doe</p>

            <UiButton class="shrink-0 p-1 text-base" variant="link">Edit</UiButton>
          </div>
        </div>
        <div
          class="grid grid-cols-1 items-center gap-4 border-b py-6 md:grid-cols-[400px,minmax(0,1fr)]"
        >
          <div>
            <p class="font-semibold">Contact email <span class="text-primary">*</span></p>
            <p class="text-muted-foreground">TAdd at least one email.</p>
          </div>
          <div class="flex items-center gap-3">
            <p class="text-muted-foreground">janedoe@example.com</p>
            <UiButton class="shrink-0 p-1 text-base" variant="link">Edit</UiButton>
          </div>
        </div>

        <div
          class="grid grid-cols-1 items-center gap-4 border-y py-6 md:grid-cols-[400px,minmax(0,1fr)]"
        >
          <p class="font-semibold">Business tax ID <span class="text-primary">*</span></p>
          <div class="flex items-center">
            <p class="text-muted-foreground">67 435 549 632</p>
            <UiButton class="ml-3 shrink-0 text-base" variant="link">Edit</UiButton>
          </div>
        </div>

        <div
          class="grid grid-cols-1 items-center gap-4 border-y py-6 md:grid-cols-[400px,minmax(0,1fr)]"
        >
          <p class="font-semibold">Business address <span class="text-primary">*</span></p>
          <div class="flex items-start">
            <p class="text-muted-foreground">100 Street Lane <br />City Love <br />Jamaica</p>
            <UiButton class="ml-3 shrink-0 text-base" variant="link">Edit</UiButton>
          </div>
        </div>
        <div
          class="grid grid-cols-1 items-center gap-4 border-y py-6 md:grid-cols-[400px,minmax(0,1fr)]"
        >
          <p class="font-semibold">Instagram integration <span class="text-primary">*</span></p>
          <div class="flex items-center">
            <p class="text-muted-foreground">https://instagram.com/janedoe</p>
            <UiButton class="ml-3 shrink-0 text-base" variant="link">Manage</UiButton>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
  const menu = [
    { name: "Overview", to: "#", icon: "cui:home-line" },
    { name: "My Profile", to: "#", icon: "cui:user-01" },
    { name: "My Projects", to: "#", icon: "cui:cube-03" },
    { name: "Scheduled", to: "#", icon: "cui:clock-fast-forward" },
    { divider: true },
    {
      name: "Folders",
      icon: "cui:folder",
      items: [
        { name: "View all", to: "#", badge: 48 },
        { name: "Recent", to: "#", badge: 6 },
        { name: "Favorites", to: "#", badge: 4 },
        { name: "Shared", to: "#", badge: 22 },
        { name: "Archived", to: "#", badge: 14 },
      ],
    },
    { divider: true },
    { name: "All Files", to: "#", icon: "cui:file-04" },
    { name: "Team Members", to: "#", icon: "cui:users-01" },
    { name: "Appearance", to: "#", icon: "cui:contrast-01" },
  ];

  const tabs = [
    { name: "My profile", value: "my-profile" },
    { name: "Settings", value: "settings" },
    { name: "Billing", value: "billing" },
    { name: "Security", value: "security" },
    { name: "Notifications", value: "notifications" },
    { name: "Integrations", value: "integrations" },
    { name: "API", value: "api" },
  ];

  const image = "/social/my-profile.png";
  const title = "My Profile";
  const description =
    "This design is a profile page for a user to manage their details and personal preferences.";

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
