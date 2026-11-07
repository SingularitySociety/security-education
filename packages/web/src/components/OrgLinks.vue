<script setup lang="ts">
import { orgLinks } from "../lib/orgLinks.ts";
</script>

<template>
  <ul class="flex flex-wrap gap-x-3 gap-y-1">
    <li v-for="link in orgLinks" :key="link.href">
      <a :href="link.href" target="_blank" rel="noopener noreferrer" class="hover:text-sky-700 hover:underline">
        {{ link.label }}
      </a>
    </li>
  </ul>
</template>
