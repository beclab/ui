<template>
	<div class="bt-menu-container q-pa-md">
		<Theme :show-theme-toggle="props.showThemeToggle" :follow-system="props.followSystem"></Theme>
		<div class="q-pb-lg" v-if="$slots.header">
			<slot name="header"></slot>
		</div>
		<template v-for="(item, index) in items" :key="item">
			<q-item-label
				header
				class="q-py-none q-px-sm"
				lines="1"
				:class="[index !== 0 ? 'q-pt-lg' : 0]"
				:style="{
					marginTop: item.label ? '0px' : '-4px'
				}"
			>
				<div class="row items-center">
					<div style="flex: 1" class="text-subtitle2 text-ink-3">
						{{ item.label }}
					</div>
					<div>
						<slot :name="`extra-${item.key}`"></slot>
					</div>
				</div>
			</q-item-label>
			<template v-for="child in item.children" :key="child">
				<q-expansion-item
					:hide-expand-icon="hideExpandIcon"
					v-if="child.children"
					:disable="child.disable"
					:default-opened="
						child.defaultClose
							? child.defaultClose
							: defaultClose
							? false
							: true
					"
					expand-icon-class="expand-icon-wrapper"
					:header-class="['q-pa-sm', 'expand-header-wrapper']"
					:header-style="{
						borderRadius: '8px'
					}"
					class="q-mt-xs"
					@update:model-value="
						(value) => {
							return toggleVaule(value, child);
						}
					"
				>
					<template #header>
						<q-item-section
							avatar
							:style="{ paddingLeft: `calc(${unit})` }"
							style="min-width: 0"
							class="q-pr-sm"
							v-if="child.icon || child.img"
						>
							<slot
								v-if="$slots[`icon-${child.key}`]"
								:name="`icon-${child.key}`"
							></slot>
							<AvatarIcon v-else :data="child" :active="link === child.key">
							</AvatarIcon>
						</q-item-section>
						<ItemLabel
							:activeClass="activeClassConputed"
							:data="child"
							:active="link === child.key"
						></ItemLabel>
						<q-item-section side @click.stop style="padding: 0" class="q-ml-sm">
							<slot :name="`extra-${child.key}`" :item="child"></slot>
						</q-item-section>
					</template>
					<SubMenu
						:activeClass="activeClassConputed"
						:data="child.children"
						@select="selectHandler"
						v-model="link"
					>
						<template v-for="(value, key) in $slots" v-slot:[key]="scope">
							<slot :name="key" :item="scope.item"></slot>
						</template>
					</SubMenu>
				</q-expansion-item>
				<MenuItem
					v-else
					:activeClass="activeClassConputed"
					:same-activeable="sameActiveable"
					:data="child"
					@select="selectHandler"
					v-model="link"
				>
					<template v-slot:[`extra-${child.key}`]>
						<slot :name="`extra-${child.key}`" :item="child"></slot>
					</template>
					<template
						v-if="$slots[`icon-${child.key}`]"
						v-slot:[`icon-${child.key}`]
					>
						<slot :name="`icon-${child.key}`"></slot>
					</template>
				</MenuItem>
			</template>
		</template>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import MenuItem from "./MenuItem.vue";
import SubMenu from "./SubMenu.vue";
import { Item } from "./Menu";
import ItemLabel from "./ItemLabel.vue";
import AvatarIcon from "./AvatarIcon.vue";
import Theme from "../../theme/src/IndexPage.vue";

interface Props {
	/**
	 * The Menu data
	 */
	items: Array<Item>;
	/**
	 * defaultSelected: string
	 */
	defaultActive: string;
	/**
	 * hightlight class style
	 */
	activeClass: string;
	/**
	 *  v-model
	 */
	modelValue: string;
	/**
	 * defaultClose: boolean
	 */
	defaultClose: boolean;

	/**
	 * hideExpandIcon: boolean
	 */
	hideExpandIcon: boolean;

	sameActiveable: boolean;
	showThemeToggle: boolean;
	followSystem?:boolean;
}
const props = withDefaults(defineProps<Props>(), {
	sameActiveable: false,
	showThemeToggle: false,
	followSystem: true
});

const link = ref(props.defaultActive || props.modelValue);
const activeClassConputed = computed(
	() => props.activeClass || "bt-menu-active-link"
);

watch(
	() => props.modelValue,
	() => {
		link.value = props.modelValue;
	}
);

const emit = defineEmits<
	{
		/**
		 * Menu item selected event
		 */
		(
			e: "select",
			data: { item: Item[]; key: string; selectedKeys: string }
		): void;
	},
	{
		/**
		 * Menu item toogle event
		 */
		(e: "toggleVaule", data: { value: boolean; item: Item[] }): void;
	}
>();
const selectHandler = (data: {
	item: Item[];
	key: string;
	selectedKeys: string;
}) => {
	if (props.modelValue && !data.item.muted) {
		emit("update:modelValue", data.key);
	}
	emit("select", data);
};

const toggleVaule = (value, item) => {
	emit("toggleVaule", { value, item });
};
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
	name: "BtMenu"
});
</script>

<style lang="scss" scoped>
.bt-menu-container {
	width: 240px;
	color: $grey-8;
	::v-deep(.bt-menu-active-link) {
		color: $blue-6;
		background-color: $blue-1;
	}
	::v-deep(.expand-icon-wrapper) {
		padding-left: 0;
	}
	::v-deep(.expand-header-wrapper) {
		min-height: auto;
	}
	::v-deep(.q-hoverable:hover > .q-focus-helper) {
		opacity: 0.08;
	}
	::v-deep(.q-item__section--side > .q-icon) {
		font-size: 20px;
	}
	::v-deep(.q-ripple) {
		opacity: 0.25;
	}
}
::v-deep(.q-item) {
	color: $ink-2;
}
</style>
