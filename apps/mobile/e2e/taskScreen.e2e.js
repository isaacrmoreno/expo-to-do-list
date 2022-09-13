describe('Task screen', () => {
	beforeAll(async () => {
		await device.launchApp()
	})

	beforeEach(async () => {
		await device.reloadReactNative()
	})

	it('input field should be visible', async () => {
		await expect(element(by.id('main-text-input'))).toBeVisible()
	})
})
