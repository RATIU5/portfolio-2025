import { c as convertToSafeString } from './safeString_DaScySBP.mjs';

const augments = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

const pluginAugments = [];

						const renderAugments = pluginAugments.map((entry) => {
							const { id, safeId, type, components } = entry;
							if (type === 'component') {
								return {
									id,
									type,
									components: Object.entries(components).reduce((acc, [key, value]) => ({
										...acc,
										[key]: augments[convertToSafeString(safeId + key)],
									}), {}),
								};
							}
							return {
								id,
								type,
								html: entry.html,
								components: Object.entries(components).reduce((acc, [key, value]) => ({
									...acc,
									[key]: augments[convertToSafeString(safeId + key)],
								}), {}),
							};
						});

export { renderAugments as r };
