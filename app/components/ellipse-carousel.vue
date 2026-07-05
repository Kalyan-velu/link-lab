<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";
import {generators} from "~/generators";

const router = useRouter();

const brandStyles: Record<
    string,
    { bg: string; text: string; border: string; shadow: string; glow: string }
> = {
  whatsapp: {
    bg: "bg-[#25D366]",
    text: "text-white",
    border: "border-[#25D366]",
    shadow: "shadow-[#25D366]/30",
    glow: "from-[#25D366]/20 to-transparent",
  },
  telegram: {
    bg: "bg-[#24A1DE]",
    text: "text-white",
    border: "border-[#24A1DE]",
    shadow: "shadow-[#24A1DE]/30",
    glow: "from-[#24A1DE]/20 to-transparent",
  },
  signal: {
    bg: "bg-[#3A76F0]",
    text: "text-white",
    border: "border-[#3A76F0]",
    shadow: "shadow-[#3A76F0]/30",
    glow: "from-[#3A76F0]/20 to-transparent",
  },
  facebook: {
    bg: "bg-[#0084FF]",
    text: "text-white",
    border: "border-[#0084FF]",
    shadow: "shadow-[#0084FF]/30",
    glow: "from-[#0084FF]/20 to-transparent",
  },
  instagram: {
    bg: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
    text: "text-white",
    border: "border-[#ee2a7b]",
    shadow: "shadow-[#ee2a7b]/30",
    glow: "from-[#ee2a7b]/20 to-transparent",
  },
  sms: {
    bg: "bg-[#0b84ff]",
    text: "text-white",
    border: "border-[#0b84ff]",
    shadow: "shadow-[#0b84ff]/30",
    glow: "from-[#0b84ff]/20 to-transparent",
  },
  phone: {
    bg: "bg-[#34C759]",
    text: "text-white",
    border: "border-[#34C759]",
    shadow: "shadow-[#34C759]/30",
    glow: "from-[#34C759]/20 to-transparent",
  },
  email: {
    bg: "bg-[#EA4335]",
    text: "text-white",
    border: "border-[#EA4335]",
    shadow: "shadow-[#EA4335]/30",
    glow: "from-[#EA4335]/20 to-transparent",
  },
  snapchat: {
    bg: "bg-[#FFFC00]",
    text: "text-black",
    border: "border-[#FFFC00]",
    shadow: "shadow-[#FFFC00]/30",
    glow: "from-[#FFFC00]/20 to-transparent",
  },
  skype: {
    bg: "bg-[#00AFF0]",
    text: "text-white",
    border: "border-[#00AFF0]",
    shadow: "shadow-[#00AFF0]/30",
    glow: "from-[#00AFF0]/20 to-transparent",
  },
  linkedin: {
    bg: "bg-[#0A66C2]",
    text: "text-white",
    border: "border-[#0A66C2]",
    shadow: "shadow-[#0A66C2]/30",
    glow: "from-[#0A66C2]/20 to-transparent",
  },
  x: {
    bg: "bg-black",
    text: "text-white",
    border: "border-neutral-800",
    shadow: "shadow-black/25",
    glow: "from-black/10 to-transparent",
  },
  "google-maps": {
    bg: "bg-[#4285F4]",
    text: "text-white",
    border: "border-[#4285F4]",
    shadow: "shadow-[#4285F4]/30",
    glow: "from-[#4285F4]/20 to-transparent",
  },
};

const n = generators.length;

// Ellipse radius configurations
const rx = ref(350);
const ry = ref(100);
const containerWidth = ref(800);
const containerHeight = ref(380);

// Easing simulation variables
const manualRotation = ref(0);
const scrollRotation = ref(0);
const currentRotation = ref(0);
const targetRotation = ref(0);

const isDragging = ref(false);
let startX = 0;
let startRotation = 0;
let lastX = 0;
let velocity = 0;
let animationFrameId: number | null = null;
let autoRotateActive = ref(true);
let idleTimer: ReturnType<typeof setTimeout> | null = null;

// Responsive dimensions
function updateSizes() {
  if (typeof window === "undefined") return;
  const width = Math.min(window.innerWidth - 32, 1000);
  containerWidth.value = width;

  if (window.innerWidth < 640) {
    rx.value = width * 0.4;
    ry.value = 40;
    containerHeight.value = 240;
  } else if (window.innerWidth < 768) {
    rx.value = width * 0.42;
    ry.value = 65;
    containerHeight.value = 320;
  } else {
    rx.value = Math.min(width * 0.42, 380);
    ry.value = 95;
    containerHeight.value = 360;
  }
}

// Reset idle state and autorotation
function resetIdleTimer() {
  autoRotateActive.value = false;
  if (idleTimer) clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    autoRotateActive.value = true;
  }, 4000);
}

// Calculate angle for each index
function getAngle(index: number) {
  // Equally spaced angles + rotation offset
  const baseAngle = (index * 2 * Math.PI) / n;
  // Target rotation brings everything together
  return baseAngle + currentRotation.value + scrollRotation.value;
}

// Position layout for each generator
const positionedItems = computed(() => {
  const cx = containerWidth.value / 2;
  const cy = containerHeight.value / 2 - 15;

  return generators.map((generator, index) => {
    const angle = getAngle(index);
    // Standard ellipse parametric equations
    const x = cx + rx.value * Math.cos(angle);
    const y = cy + ry.value * Math.sin(angle);

    // Depth effect mapping: items at the bottom (sin > 0) are in the front
    const sinAngle = Math.sin(angle);
    const normalizedDepth = (sinAngle + 1) / 2; // 0 to 1

    const scale = 0.65 + 0.35 * normalizedDepth;
    const opacity = 0.35 + 0.65 * normalizedDepth;
    const zIndex = Math.round(normalizedDepth * 20) + 10;

    return {
      generator,
      index,
      x,
      y,
      scale,
      opacity,
      zIndex,
      angle,
      sinAngle,
    };
  });
});

const activeItem = computed(() => {
  let bestItem = positionedItems.value[0];
  let maxSin = -2;

  for (const item of positionedItems.value) {
    // Frontmost has the highest sinAngle (closest to y coordinate maximum / bottom of ellipse)
    if (item.sinAngle > maxSin) {
      maxSin = item.sinAngle;
      bestItem = item;
    }
  }
  return bestItem;
});
const activeGeneratorId = computed(() => activeItem.value?.generator.id);
// Animate rotational easing loop
function animationLoop() {
  // If auto-rotating and not interacting, drift slowly
  if (autoRotateActive.value && !isDragging.value) {
    targetRotation.value += 0.001;
  }

  // Smooth easing transition
  const diff = targetRotation.value - currentRotation.value;
  currentRotation.value += diff * 0.12;

  // Drag physics decay
  if (!isDragging.value && Math.abs(velocity) > 0.001) {
    targetRotation.value += velocity;
    velocity *= 0.92;
  }

  animationFrameId = requestAnimationFrame(animationLoop);
}

// Wheel rotation handler
function handleWheel(event: WheelEvent) {
  resetIdleTimer();
  // Disable natural page scroll only when wheeling directly inside carousel to avoid jarring jumps
  event.preventDefault();

  const factor = 0.0015;
  targetRotation.value += event.deltaY * factor;
}

// Drag / Swipe listeners
function handleDragStart(clientX: number) {
  resetIdleTimer();
  isDragging.value = true;
  startX = clientX;
  lastX = clientX;
  startRotation = targetRotation.value;
  velocity = 0;
}

function handleDragMove(clientX: number) {
  if (!isDragging.value) return;
  const dx = clientX - startX;
  // Map horizontal pixels to rotation angle
  const dragSensitivity = 0.003;
  targetRotation.value = startRotation + dx * dragSensitivity;

  // Estimate momentum velocity
  velocity = (clientX - lastX) * dragSensitivity * 0.5;
  lastX = clientX;
}

// Interaction ends
function onMouseDown(e: MouseEvent) {
  handleDragStart(e.clientX);
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);
}

function onMouseMove(e: MouseEvent) {
  handleDragMove(e.clientX);
}

function onMouseUp() {
  isDragging.value = false;
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
}

function onTouchStart(e: TouchEvent) {
  if (e.touches.length > 0 && e.touches[0]) {
    handleDragStart(e.touches[0].clientX);
  }
}

function onTouchMove(e: TouchEvent) {
  if (e.touches.length > 0) {
    handleDragMove(e.touches[0].clientX);
  }
}

function onTouchEnd() {
  isDragging.value = false;
}

// Global scroll mapping
function handleScroll() {
  // Spin the carousel dynamically as the user scrolls the page
  const scrollSensitivity = 0.002;
  scrollRotation.value = window.scrollY * scrollSensitivity;
}

// Spin clicked item to the front
function handleItemClick(index: number, e: MouseEvent) {
  resetIdleTimer();

  // Angle currently corresponding to clicked index:
  const itemAngle = getAngle(index);
  // Calculate relative angle to the front-center (which is Math.PI / 2)
  // We want: itemAngle + delta = Math.PI / 2
  let angleDiff = Math.PI / 2 - (itemAngle % (2 * Math.PI));

  // Wrap diff to range [-PI, PI] to rotate in the shortest direction
  while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;
  while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;

  targetRotation.value += angleDiff;

  // If clicked item is already at the front (or close to it), navigate
  const activeDistance = Math.abs((itemAngle % (2 * Math.PI)) - Math.PI / 2);
  const isCloseToFront =
      activeDistance < 0.25 || activeDistance > 2 * Math.PI - 0.25;

  if (isCloseToFront) {
    const generator = generators[index];
    if (generator) {
      router.push(`/generators/${generator.id}`);
    }
  }
}

onMounted(() => {
  updateSizes();
  window.addEventListener("resize", updateSizes);
  window.addEventListener("scroll", handleScroll);

  animationFrameId = requestAnimationFrame(animationLoop);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSizes);
  window.removeEventListener("scroll", handleScroll);
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (idleTimer) clearTimeout(idleTimer);
});
</script>

<template>
  <div
      class="flex w-full flex-col items-center select-none overflow-hidden pb-10"
  >
    <div
        class="relative cursor-grab active:cursor-grabbing touch-none"
        :style="{ width: `${containerWidth}px`, height: `${containerHeight}px` }"
        @wheel="handleWheel"
        @mousedown="onMouseDown"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
    >
      <div
          v-if="activeItem"
          class="absolute inset-0 m-auto rounded-full blur-[100px] opacity-25 transition-all duration-700 pointer-events-none w-1/2 h-1/2"
          :class="[brandStyles[activeItem.generator.id]?.bg]"
      />

      <svg
          class="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
            :cx="containerWidth / 2"
            :cy="containerHeight / 2 - 15"
            :rx="rx"
            :ry="ry"
            fill="none"
            stroke="var(--color-primary)"
            stroke-width="1.5"
            stroke-dasharray="6 4"
        />
      </svg>

      <div
          v-for="item in positionedItems"
          :key="item.generator.id"
          class="absolute left-0 top-0 transition-transform duration-75 ease-out"
          :style="{
          transform: `translate(${item.x}px, ${item.y}px) translate(-50%, -50%) scale(${item.scale})`,
          opacity: item.opacity,
          zIndex: item.zIndex,
        }"
      >
        <button
            type="button"
            class="group relative flex flex-col items-center gap-2 outline-none focus:outline-none"
            @click="handleItemClick(item.index, $event)"
        >
          <div
              class="flex size-14 items-center justify-center rounded-full border border-white/20 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              :class="[
              brandStyles[item.generator.id]?.bg,
              brandStyles[item.generator.id]?.shadow,
              item.generator.id === activeGeneratorId.value
                ? 'ring-4 ring-offset-2 ring-primary scale-110'
                : '',
            ]"
          >
            <UIcon
                :name="item.generator.icon"
                class="size-6 transition-transform duration-300 group-hover:rotate-12"
                :class="brandStyles[item.generator.id]?.text || 'text-white'"
            />
          </div>

          <span
              class="rounded-full bg-white/95 px-2 py-0.5 text-[10px] font-semibold text-text-secondary border border-border shadow-xs transition-opacity"
              :class="
              item.generator.id === activeGeneratorId.value
                ? 'text-primary border-primary/30 font-bold bg-white'
                : ''
            "
          >
            {{ item.generator.name }}
          </span>
        </button>
      </div>
    </div>

    <Transition name="fade-up" mode="out-in">
      <div
          :key="activeGeneratorId.value"
          class="mt-4 flex max-w-sm flex-col items-center text-center px-4"
      >
        <span
            class="text-xs uppercase tracking-widest font-semibold text-primary mb-1"
        >
          Active Platform
        </span>
        <h2
            class="text-2xl font-bold text-text-primary flex items-center gap-2 justify-center"
        >
          <UIcon
              :name="activeItem.generator.icon"
              class="size-6 text-primary"
          />
          {{ activeItem.generator.name }}
        </h2>

        <!-- Description -->
        <p class="mt-2 text-sm text-text-secondary leading-relaxed">
          {{ activeItem.generator.description }}
        </p>

        <!-- Dynamic Action Button -->
        <NuxtLink
            :to="`/generators/${activeGeneratorId.value}`"
            class="mt-6 flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            :class="[
            brandStyles[activeGeneratorId.value]?.bg,
            brandStyles[activeGeneratorId.value]?.shadow,
          ]"
        >
          Create {{ activeItem.generator.name }} Link
          <UIcon name="lucide:arrow-right" class="size-4" />
        </NuxtLink>

        <!-- Help hint -->
        <p class="mt-3 text-[11px] text-muted pointer-events-none">
          Drag, swipe or scroll page to spin
        </p>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-up-enter-active,
.fade-up-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
