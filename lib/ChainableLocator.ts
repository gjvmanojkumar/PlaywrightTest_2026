import { Locator, Page } from "@playwright/test";
import { Utils } from "./Utils";

export class ChainableLocator {
    constructor(private locatorElement: Locator, private utils: Utils) { }

    locator(selector: string): ChainableLocator {
        this.locatorElement = this.locatorElement.locator(selector);
        return this; // Returns 'this' to allow further chaining
    }

    /**
     * Filters the active locator to only those containing a specific text.
     */
    filter(text: string): ChainableLocator {
        this.locatorElement = this.locatorElement.filter({ hasText: text });
        return this; // Returns 'this' to allow further chaining
    }

    /**
     * Targets an element by its role within the active locator.
     */
    role(role: 'button' | 'link' | 'heading' | 'checkbox', name: string): ChainableLocator {
        this.locatorElement = this.locatorElement.getByRole(role, { name });
        return this;
    }

    /**
     * Shortcut specifically for buttons (very common)
     */
    btn(name: string): ChainableLocator {
        return this.role('button', name);
    }

    /**
     * Performs a click action on the fully resolved locator.
     * This is a terminal action (returns void, cannot be chained further).
     */
    async click(): Promise<void> {
        await this.utils.clickEle(this.locatorElement)
    }

    /**
     * Performs a fill action on the resolved locator.
     */
    async fill(text: string): Promise<void> {
        await this.utils.enterEleText(this.locatorElement, text);
    }

    async innerText(): Promise<string> {
        return await this.utils.getInnerText(this.locatorElement)
    }

}