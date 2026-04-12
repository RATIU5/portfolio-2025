const endpoints = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

const pluginEndpoints = [];

						const pluginSettingsEndpoints = [];

						const apiEndpoints = pluginEndpoints.map(({ identifier, safeIdentifier }) => ({
							identifier,
							onCreate: endpoints[safeIdentifier + '_onCreate'] || null,
							onEdit: endpoints[safeIdentifier + '_onEdit'] || null,
							onDelete: endpoints[safeIdentifier + '_onDelete'] || null,
						}));

						const settingsEndpoints = pluginSettingsEndpoints.map(({ identifier, safeIdentifier }) => ({
							identifier,
							onSave: endpoints[safeIdentifier + '_onSave'] || null,
						}));

export { apiEndpoints as a, settingsEndpoints as s };
