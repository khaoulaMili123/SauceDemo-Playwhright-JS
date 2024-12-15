/*Scenario 4: Checkout Workflow Validation with Problem User and Performance Glitch User

Description:
This scenario tests the checkout workflow by engaging two user roles: Problem User and Performance Glitch User. The goal is to validate the application's handling of user interactions, data retention, error messages, and checkout functionality across sessions.
-The Problem User adds a product to the shopping cart but cannot complete the checkout due to a missing required field ("Last Name is required"). The Problem User logs out after encountering the error.
-The Performance Glitch User logs into the application, confirms that the product added by the Problem User remains in the cart, and successfully completes the checkout workflow.

Test Steps:

Part 1: Actions with Problem User
1.Open the application and log in as a Problem User.
2.Verify navigation to the Products page by validating the page title and URL.
3.Add an item (e.g., Backpack) to the shopping cart and verify that the cart icon updates to show "1" item.
4.Navigate to the Your Cart page and validate the following:
 -Quantity (QTY) and description (DESCRIPTION) of the added item.
 -The correct price and name of the product are displayed.
5.Proceed to the Checkout: Your Information page and validate that:
 -The page URL are correct.
6.Attempt to fill in the checkout form by entering:
 -First Name.
 -Postal Code (leaving Last Name empty).
7.Click the Continue button and verify that an error message is displayed for "Error: Last Name is required".
8.Open the Burger Menu and click on Logout to exit the application.
9.Validate redirection to the Login Page and ensure all login elements (Username, Password, and Login button) are visible.

Part 2: Actions with Performance Glitch User
10. Log in as a Performance Glitch User.
11. Verify navigation to the Products page by validating the page title and URL.
12. Confirm that the shopping cart icon still displays "1" item, as added by the Problem User.
13. Navigate to the Your Cart page and validate that:
- The previously added item is present.
- QTY and DESCRIPTION are correctly displayed.
14. Proceed to the Checkout: Your Information page and successfully fill in the required fields:
- First Name, Last Name, and Postal Code.
15. Click Continue and navigate to the Checkout: Overview page.
16. On the Overview page, validate the following:
- Product details (name, price, quantity).
- Payment and shipping information.
17. Complete the checkout process by clicking on the Finish button and verify redirection to the Checkout: Complete page.
18. On the Complete page, validate the page title, URL, and success message.
19. Click on the Back to Home button and confirm redirection to the Products page.
20. Log out from the application using the Burger Menu and validate redirection to the Login Page.*/
import {test, expect } from "@playwright/test"
import fs from "fs"
import HomePage from "../pages/homePage"
import ShopPage from "../pages/shopPage"
import ShoppingCartPage from "../pages/shoppingCartPage"
import CheckoutInformationPage from "../pages/checkoutInformationPage"
import OverViewpage from "../pages/overViewPage"
import CompletePage from "../pages/completePage"
import ItemDetailsPage from "../pages/itemDetailsPage"
import MethodRepository from "../pages/MethodRepository"
import { baseURL, completePageUrl, InformationPageUrl, LandingpageURL, OverviewPageUrl, yourCartUrl } from "../ConfigUtil"

const testdata = JSON.parse(fs.readFileSync('./data/dataUsers.json' , 'utf-8'))

test.describe('Login as a PU to select a product item and then complete the checkout workflow with PGU', ()=>{
    test('Problem User and Performance Glitch User Checkout Process',async({page})=>{    
        const homePage = new HomePage (page)
        const shopPage = new ShopPage (page)
        const shoppingCartPage = new ShoppingCartPage (page)
        const checkoutInformationPage = new CheckoutInformationPage (page)
        const overviewPage = new OverViewpage (page)
        const completePage = new CompletePage (page)
        const itemDetailsPage = new ItemDetailsPage (page)
        const methods = new MethodRepository (page)
      await test.step('Open the APP and Authenticate using "problem_user" credentials and validate successful navigation to the Products page', async()=>{
         await homePage.openUrl()
         await homePage.PageLogo()
         expect(await methods.getURl()).toBe(baseURL)
         await homePage.loginAs_PB_user()
         expect(await methods.getURl()).toBe(LandingpageURL)
      })
      await test.step('Add an item to cart and verify cart is updated to 1',async()=>{
         await shopPage.addToCartBackPackItem()
         await shopPage.verifyshoppCartCount()

      })
      await test.step('Validate ShoppingCart Navigation And Item Details',async()=>{
         await shopPage.shoppingcartClick()
         expect(await methods.getURl()).toBe(yourCartUrl)
         await shoppingCartPage.verifyQttCartitemAndDescLabelVisible()
         await shoppingCartPage.itemNameAndPriceVisible()
      })
      await test.step('Navigate to checkout information page',async()=>{
         await shoppingCartPage.clickCheckoutBtn()
         expect(await methods.getURl()).toBe(InformationPageUrl)
         
      })
      await test.step('Validate lastName required error during checkout`',async()=>{
         await checkoutInformationPage.typeFName()
         await checkoutInformationPage.typeLName()
         await checkoutInformationPage.typePostalCode()
         await checkoutInformationPage.clickContinueBtn()
         await checkoutInformationPage.verifyErrorMsg()
         await checkoutInformationPage.verifyErrorMsgLN()
      })
      await test.step('Verify logout navigation to Login Page`',async()=>{
         await checkoutInformationPage.logout()
         expect(await methods.getURl()).toBe(baseURL)
      })
      await test.step('Login as performance_glitch_user',async()=>{
         await homePage.loginAs_PG_user()
         expect (await methods.getURl()).toBe(LandingpageURL)
      })
      await test.step('Verify Shopping Cart Retains Item Added by Problem User and Navigate to Your Cart Page',async()=>{
         await shopPage.verifyshoppCartCount()
         await shopPage.shoppingcartClick()
         expect (await methods.getURl()).toBe(yourCartUrl)
      })
      await test.step('Perform Checkout and Complete Customer Information Form',async()=>{
         await shoppingCartPage.clickCheckoutBtn()
         expect (await methods.getURl()).toBe(InformationPageUrl)
         await checkoutInformationPage.typeFName()
         await checkoutInformationPage.typeLName()
         await checkoutInformationPage.typePostalCode()
         await checkoutInformationPage.clickContinueBtn()
      })
      await test.step('Complete Checkout from Overview Page',async()=>{
         expect(await methods.getURl()).toBe(OverviewPageUrl)
         await overviewPage.clickFinishBtn()
         expect (await methods.getURl()).toBe(completePageUrl)
      })
      await test.step('Navigate Back to Products Page from Checkout: Complete Page',async()=>{
         await completePage.backHomeClick()
         expect(await methods.getURl()).toBe(LandingpageURL)
      })
      await test.step('Verify User Logout and Redirection to the Login Page',async()=>{
         await shopPage.burgermenuBtnClick()
            await shopPage.LogoutClick()
            expect(await methods.getURl()).toBe(baseURL)
      })
      
    })
})