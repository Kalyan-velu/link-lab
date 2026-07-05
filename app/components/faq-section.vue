<script setup lang="ts">
const faqs = [
  {
    question: 'Is anything I type sent to a server?',
    answer: 'No. Every link is generated entirely in your browser. Nothing is stored — not on a server, not even in local storage — so it disappears as soon as you leave the page.',
  },
  // {
  //   question: 'Why do some fields carry over when I switch platforms?',
  //   answer: 'Fields like phone number or username are shared across generators that use them for the current session, so you don\'t have to retype the same information twice.',
  // },
  // {
  //   question: 'What does Reset clear?',
  //   answer: 'Reset clears message-style content for the current platform (like a message or subject) but keeps identity fields such as phone number or username.',
  // },
  // {
  //   question: 'Can I add more platforms?',
  //   answer: 'Yes — the generator system is configuration-driven, so new platforms are added as a small config file rather than app changes.',
  // },
]
</script>

<template>
  <AppSection id="faq" title="Frequently asked questions">
    <div class="mx-auto flex max-w-md flex-col divide-y divide-border">
      <details v-for="faq in faqs" :key="faq.question" class="group py-4">
        <summary class="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-text-primary">
          {{ faq.question }}
          <UIcon name="lucide:chevron-down" class="size-4 text-muted transition-transform group-open:rotate-180" />
        </summary>
        <p class="mt-2 text-sm text-text-secondary">{{ faq.answer }}</p>
      </details>
    </div>
  </AppSection>
</template>
