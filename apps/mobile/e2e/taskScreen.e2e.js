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

	it('hamburger menu should be visible', async () => {
		await expect(element(by.id('hamburger-menu'))).toBeVisible()
	})

	it('should add a task', async () => {
		await element(by.id('main-text-input')).typeText('Add task test')
		await element(by.id('add-task-button')).tap()
		await expect(element(by.text('Add task test'))).toBeVisible()
	})

	it('should edit a task', async () => {
		await element(by.id('main-text-input')).typeText('Edit task test')
		await element(by.id('add-task-button')).tap()
		await element(by.text('Edit task test')).tap()
		await element(by.id('main-text-input')).typeText(' edited')
		await element(by.id('edit-task-button')).tap()
		await expect(element(by.text('Edit task test edited'))).toBeVisible()
	})

	it('should delete both task', async () => {
		await element(by.id('delete-task-button')).atIndex(0).tap()
		await element(by.id('delete-task-button')).atIndex(0).tap()
		await expect(element(by.text('Add task test'))).toBeNotVisible()
		await expect(element(by.text('Edit task test edited'))).toBeNotVisible()
	})

	it('should open and close share dialog', async () => {
		await element(by.id('hamburger-menu')).tap()
		await element(by.id('share-button')).tap()
		await expect(element(by.text("Download Quail | A minimalist's to do list"))).toBeVisible()
		await element(by.id('share-button')).tap()
		await expect(element(by.text("Download Quail | A minimalist's to do list"))).toBeNotVisible()
	})

	it('should enable stylize and muted switch', async () => {
		await element(by.id('hamburger-menu')).tap()
		await element(by.id('stylize-switch')).tap()
		await element(by.id('mute-switch')).tap()
		await expect(element(by.id('stylize-switch'))).toHaveValue('1')
		await expect(element(by.id('mute-switch'))).toHaveValue('1')
	})

	it('should add stylized and muted task', async () => {
		await element(by.id('main-text-input')).typeText('Add stylized & muted test')
		await element(by.id('add-task-button')).tap()
		await expect(element(by.text('Add stylized & muted test'))).toBeVisible()
	})

	it('should delete stylized and muted task', async () => {
		await element(by.id('delete-task-button-stylized')).atIndex(0).tap()
		await expect(element(by.text('Add stylized & muted test'))).toBeNotVisible()
	})

	it('should disable stylize and muted switch', async () => {
		await element(by.id('hamburger-menu')).tap()
		await element(by.id('stylize-switch')).tap()
		await element(by.id('mute-switch')).tap()
		await expect(element(by.id('stylize-switch'))).toHaveValue('0')
		await expect(element(by.id('mute-switch'))).toHaveValue('0')
	})

	it('should open privacy policy', async () => {
		await element(by.id('hamburger-menu')).tap()
		await element(by.id('privacy-policy-button')).tap()
	})
})
