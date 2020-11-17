import headline from "./headline.vue";
import { action } from "@storybook/addon-actions";

const methods = {
    onAction: action('onAction')
}

export default {
    title: "headline",
    components: { headline }
}

export const defaultView = () => ({
    components: {headline},
    template: `
        <headline @action="onAction" title="Панель управления">
          <h3>Привет всем</h3>
        </headline>
    `,
    methods
});

defaultView.story = {
    name: "Стандартный вид"
}
