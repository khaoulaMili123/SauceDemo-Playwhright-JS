/*Scenario 1:
Log in as a standard user to verify the products page and log out of the application.

Scenario Description:
The user logs into the website, verifies the essential elements of the products page, and logs out of the application. This test serves as a "smoke" test to ensure that the main features are available and function correctly.

Test Steps:
1/User is on the login page
  -Opens the application by accessing the base URL.
  -Verifies that the login page logo is visible.
  -Checks the page title and URL to confirm they are on the expected login page.

2/Verification of login form elements
  -Verifies that the "Username" and "Password" fields are visible on the login page.
  -Ensures the login button is enabled.
  -Confirms that the username and password credentials are visible to the user.

3/Log in as a standard user

4/Verification of the landing/products page
  -Verifies that the products page logo is visible to confirm the page has loaded correctly.
  -Checks that the page title and URL match the products page.

5/Verification of elements at the top of the products page
  -Ensures the shopping cart icon is visible in the top right corner of the page.
  -Verifies that the product sort container is visible and accessible.

6/Verification of the navigation menu options (burger menu)

7/Verification of the inventory product list
  -Ensures that the inventory container is visible.
  -Confirms that all items are displayed in the product list.

8/Verification of the footer and social media links
  -Ensures that the footer text is visible.
  -Confirms that the social media icons for Twitter, Facebook, and LinkedIn are visible and accessible in the footer.

9/Logout
  -Reopens the navigation menu (burger menu) and clicks "Logout".
  -Verifies that the redirection to the login page is completed and the login page logo is visible again.
  -Checks the page title and URL to confirm that the user has returned to the login page.
*/
import { test , expect } from "@playwright/test";
import fs from 'fs'
import HomePage from "../pages/homePage";
import ShopPage from "../pages/shopPage";
import { baseURL, LandingpageURL, title } from "../ConfigUtil";
import MethodRepository from "../pages/MethodRepository";

const testdata = JSON.parse(fs.readFileSync('./data/dataUsers.json' , 'utf-8'))
test.describe.parallel('@smoke: Login as a standard user, verify the products page and logout', ()=> {
        test ('Login as a Standard user', async({page}) => {
            const homePage = new HomePage (page)
            const shopPage = new ShopPage (page)
            const methods = new MethodRepository (page)
             
            await test.step('Open URL and check logo, title and url', async () => {
                await homePage.openUrl()
                await homePage.PageLogo()
                expect(await methods.getTitle()).toBe(title)
                expect(await methods.getURl()).toContain(baseURL)
            })

            await test.step('Verify username and password fields', async () => {
                await homePage.usernameFieldVisible()
                await homePage.passwordFieldVisible()
            })

            await test.step('Verify login button is enabled', async () => {
                await homePage.loginButtonEnabled()
            })

            await test.step('Verify Login and password credentials are visible', async () =>{
                await homePage.loginCredentVisible()
                await homePage.passwordCredentVisible()
            })
            
            await test.step ('Login as a standard user', async () => {
                await homePage.loginAs_SU()
            })

            await test.step('Verify the Landing page logo and URL', async() =>{
                await shopPage.verifyLandingPageLogo()
                expect(await methods.getTitle()).toBe(title)
                expect(await methods.getURl()).toContain(LandingpageURL)
            })

            await test.step('Verify the products page shopping cart icon and product sort container visible', async () => {
                await shopPage.shoppingcartLogo()
                await shopPage.productSortContainerVisible()

            })

            await test.step('Verify the products page sidebar links visible and click on About link to check user is navigated to saucelabs page', async() =>{
                await shopPage.verifyBurgerBtn()
                await shopPage.burgermenuBtnClick()
                await shopPage.verifyAllItemsLink()
                await shopPage.verifyAboutLink()
                await shopPage.verifyResetAppLink()
                await shopPage.verifyLogoutLink()
                await shopPage.crossBtnClick()
            })

            await test.step ('Verify Inventory container and the inventory list is visible', async() =>{
                await shopPage.inventoryContainerVisible()
                await shopPage.backpackItem()
                await shopPage.BoltTShirtItem()
                await shopPage.FleeceJacketItem()
                await shopPage.OnesieItem()
                await shopPage.BikeLightItem()
                await shopPage.TShirtRedItem()
            })

            await test.step ('Verify the footer text and social channel links are visible', async() =>{
                await shopPage.footerTextVisible()
                await shopPage.socialLinksVisible()
            })

            await test.step ('User logout from the application and verify the login page', async() => {
                await shopPage.burgermenuBtnClick()
                await shopPage.LogoutClick()
                await homePage.PageLogo()
                expect(await methods.getTitle()).toBe(title)
                expect(await methods.getURl()).toContain(baseURL)

            })
        })
    }

)