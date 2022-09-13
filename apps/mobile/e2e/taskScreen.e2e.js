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
})
