import { log } from "../conditional-visibility.js";
import { ConditionalVisibility } from "./ConditionalVisibility.js";
export const CONDITIONAL_VISIBILITY_MODULE_NAME = 'conditional-visibility';
export const CONDITIONAL_VISIBILITY_DEFAULT_STEALTH = 10;
export var StatusEffectSightFlags;
(function (StatusEffectSightFlags) {
    StatusEffectSightFlags["SEE_INVISIBLE"] = "seeinvisible";
    StatusEffectSightFlags["BLIND_SIGHT"] = "blindsight";
    StatusEffectSightFlags["TREMOR_SENSE"] = "tremorsense";
    StatusEffectSightFlags["TRUE_SIGHT"] = "truesight";
    StatusEffectSightFlags["DEVILS_SIGHT"] = "devilssight";
    StatusEffectSightFlags["PASSIVE_STEALTH"] = "_ste";
})(StatusEffectSightFlags || (StatusEffectSightFlags = {}));
// TODO PUT THESE IN LOCALIZATION FOR OTHER LANGUAGE
export var StatusEffectStatusFlags;
(function (StatusEffectStatusFlags) {
    StatusEffectStatusFlags["INVISIBLE"] = "invisible";
    StatusEffectStatusFlags["OBSCURED"] = "obscured";
    StatusEffectStatusFlags["IN_DARKNESS"] = "indarkness";
    StatusEffectStatusFlags["HIDDEN"] = "hidden";
})(StatusEffectStatusFlags || (StatusEffectStatusFlags = {}));
/**
 * Because typescript doesn't know when in the lifecycle of foundry your code runs, we have to assume that the
 * canvas is potentially not yet initialized, so it's typed as declare let canvas: Canvas | {ready: false}.
 * That's why you get errors when you try to access properties on canvas other than ready.
 * In order to get around that, you need to type guard canvas.
 * Also be aware that this will become even more important in 0.8.x because no canvas mode is being introduced there.
 * So you will need to deal with the fact that there might not be an initialized canvas at any point in time.
 * @returns
 */
export function getCanvas() {
    if (!(canvas instanceof Canvas) || !canvas.ready) {
        throw new Error('Canvas Is Not Initialized');
    }
    return canvas;
}
/**
 * Because typescript doesn't know when in the lifecycle of foundry your code runs, we have to assume that the
 * canvas is potentially not yet initialized, so it's typed as declare let canvas: Canvas | {ready: false}.
 * That's why you get errors when you try to access properties on canvas other than ready.
 * In order to get around that, you need to type guard canvas.
 * Also be aware that this will become even more important in 0.8.x because no canvas mode is being introduced there.
 * So you will need to deal with the fact that there might not be an initialized canvas at any point in time.
 * @returns
 */
export function getGame() {
    if (!(game instanceof Game)) {
        throw new Error('Game Is Not Initialized');
    }
    return game;
}
export const registerSettings = function () {
    getGame().settings.register(CONDITIONAL_VISIBILITY_MODULE_NAME, 'autoStealth', {
        name: getGame().i18n.localize('conditional-visibility.settings.autoStealth.name'),
        hint: getGame().i18n.localize('conditional-visibility.settings.autoStealth.hint'),
        scope: 'world',
        config: true,
        type: Boolean,
        default: false,
        onChange: (value) => log(' autoStealth set to ' + value),
    });
    getGame().settings.register(CONDITIONAL_VISIBILITY_MODULE_NAME, 'popup-version', {
        scope: 'world',
        config: false,
        type: String,
        default: '0.0.9',
    });
    // Register any custom module settings here
    ConditionalVisibility.onInit();
};
